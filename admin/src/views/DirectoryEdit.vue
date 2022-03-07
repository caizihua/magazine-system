<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-card>
        <template slot="header">
          <strong> {{id ? '编辑' : '新增'}}杂志目录</strong>
        </template>
        <el-button type="primary" @click="create()">新增一级标题</el-button>
        <div style="overflow:scroll;height:40rem;margin-top:1rem;">
          <div v-for="(item, i1) in directory.primary" :key="i1">
            <el-row
              type="flex"
              align="middle"
              justify="space-between"
              style="margin:1rem 0"
            >
              <el-col :span="10">
                <strong> {{ item.name }} </strong>
              </el-col>
              <el-col
                :span="5"
                style="display:flex;justify-content:flex-end;margin-right:1rem"
              >
                <el-button size="small" type="primary" @click="createPri(i1)">
                  新增标题
                </el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="priCreateSec(i1)"
                >
                  新增内容
                </el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="editPri(item, i1)"
                >
                  编辑</el-button
                >
                <el-button size="small" type="primary" @click="delPri(i1)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
            <el-row
              v-for="(value, i2) in item.secondary"
              :key="i2"
              type="flex"
              align="middle"
              justify="space-between"
              style="margin:0.5rem 0"
            >
              <el-col :span="8" :offset="1">
                <span> {{ value.title }} </span>
              </el-col>
              <el-col :span="8" style="display:flex;justify-content:center">
                <span> {{ value.author }} </span>
              </el-col>
              <el-col
                :span="8"
                style="display:flex;justify-content:flex-end;margin-right:1rem"
              >
                <el-button size="small" @click="createSec(i1, i2)"
                  >新增内容</el-button
                >
                <el-button size="small" @click="editSec(item, i1, i2)"
                  >编辑</el-button
                >
                <el-button size="small" @click="delSec(i1, i2)">删除</el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </div>
      </el-card>
      <Dialog v-model="dialogVisible" ref="dialogData" @getChange="getChange">
      </Dialog>
      <el-dialog
        :title="delDialog.title"
        :visible.sync="delDialog.open"
        width="20%"
      >
        <el-row
          type="flex"
          justify="start"
          align="middle"
          style="margin-bottom:1rem"
        >
          <el-col :span="8">
            <i class="el-icon-warning" style="color:orange;font-size:5rem"></i>
          </el-col>
          <el-col :span="16">
            <h3>{{ delDialog.content }}</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="display:flex;justify-content:flex-end">
            <el-button type="primary" size="small" @click="delConfirm()">
              确定
            </el-button>
            <el-button size="small" @click="delDialog.open = false">
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import Dialog from "../components/dialog.vue";
export default {
  components: { Dialog },
  props: { id: {} },
  data() {
    return {
      directory: {
        magazine: "",
        primary: [
          {
            name: "",
            secondary: [{ author: "", title: "" }]
          }
        ]
      },
      edit: false,
      dialogVisible: false,
      delDialog: {
        open: false,
        title: "删除",
        content: "",
        i1: -1,
        i2: -1
      }
    };
  },
  methods: {
    create() {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 4,
        width: 30,
        title: "新增标题",
        form: [{ label: "标题", value: "" }]
      });
    },
    createPri(i1) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 0,
        i1: i1,
        width: 30,
        title: "新增标题",
        form: [{ label: "标题", value: "" }]
      });
    },
    priCreateSec(i1) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 5,
        i1: i1,
        width: 30,
        title: "新增内容",
        form: [
          { label: "标题", value: "" },
          { label: "作者", value: "" }
        ]
      });
    },
    editPri(item, i1) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 1,
        i1: i1,
        width: 30,
        title: "编辑标题",
        form: [{ label: "标题", value: item.name }]
      });
    },
    delPri(i1) {
      this.delDialog.i1 = i1;
      this.delDialog.open = true;
      this.delDialog.content = "您是否删除该标题及其内容?";
    },
    createSec(i1, i2) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 2,
        i1: i1,
        i2: i2,
        width: 30,
        title: "新增内容",
        form: [
          { label: "标题", value: "" },
          { label: "作者", value: "" }
        ]
      });
    },
    editSec(item, i1, i2) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 3,
        i1: i1,
        i2: i2,
        width: 30,
        title: "编辑内容",
        form: [
          { label: "标题", value: item.secondary[i2].title },
          { label: "作者", value: item.secondary[i2].author }
        ]
      });
    },
    delSec(i1, i2) {
      this.delDialog.i1 = i1;
      this.delDialog.i2 = i2;
      this.delDialog.open = true;
      this.delDialog.content = "您是否删除该内容?";
    },
    async delConfirm() {
      let [i1, i2] = [this.delDialog.i1, this.delDialog.i2];
      if (this.delDialog.i2 === -1) {
        this.directory.primary.splice(i1, 1);
      } else {
        this.directory.primary[i1].secondary.splice(i2, 1);
      }
      this.delDialog.i1 = -1;
      this.delDialog.i2 = -1;
      this.delDialog.open = false;
      await this.$http.put(`rest/directories/${this.id}`, this.directory);
      this.$message({ type: "success", message: "保存成功" });
    },
    async send() {
      let index = this.currentDir.index;
      if (!this.edit) {
        console.log(this.currentDir);
      } else {
        this.primary[index].name = this.currentDir.name;
        await this.$http.put(`rest/directories`, this.directory);
        this.$router.push("/magazines/list");
      }
      this.dialogVisible = false;
      this.edit = false;
    },
    async fetch() {
      const res = await this.$http.get(`rest/directories/${this.id}`);
      this.directory = res.data;
    },
    async getChange(status, i1, i2, data) {
      //新增标题
      if (status === 0) {
        this.directory.primary.splice(i1 + 1, 0, { name: data[0].value });
      } else if (status === 1) {
        //编辑标题
        this.directory.primary[i1].name = data[0].value;
      } else if (status === 2) {
        //新增内容
        this.directory.primary[i1].secondary.splice(i2 + 1, 0, {
          title: data[0].value,
          author: data[1].value
        });
      } else if (status === 3) {
        //编辑内容
        this.directory.primary[i1].secondary[i2].title = data[0].value;
        this.directory.primary[i1].secondary[i2].author = data[1].value;
      } else if (status === 4) {
        //数组末尾新增标题
        this.directory.primary.push({
          name: data[0].value
        });
      } else if (status === 5) {
        //标题处新增内容
        this.directory.primary[i1].secondary.push({
          title: data[0].value,
          author: data[1].value
        });
      }
      await this.$http.put(`rest/directories/${this.id}`, this.directory);
      this.$message({ type: "success", message: "保存成功" });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped></style>
