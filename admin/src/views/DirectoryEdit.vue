<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-card>
        <template slot="header">
          <strong>新建杂志目录</strong>
        </template>
        <el-button type="primary" @click="create()">新增一级标题</el-button>
        <div style="overflow:scroll;height:40rem;margin-top:1rem">
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
              <el-col :span="5" style="display:flex;justify-content:flex-end">
                <el-button size="small" type="primary" @click="createPri(i1)"
                  >新增</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click="editPri(item, i1)"
                >
                  编辑</el-button
                >
                <el-button size="small" type="primary" @click="delPri(item)"
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
              <el-col :span="8" style="display:flex;justify-content:flex-end">
                <el-button size="small" @click="createSec(i1, i2)"
                  >新增</el-button
                >
                <el-button size="small" @click="editSec(item, i1, i2)"
                  >编辑</el-button
                >
                <el-button size="small" @click="delSec()">删除</el-button>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </div>
      </el-card>
      <Dialog v-model="dialogVisible" ref="dialogData" @getChange="getChange">
      </Dialog>
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
            name: "this is a primary",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary1",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary2",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary3",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary4",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary5",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary",
            secondary: [
              { author: "jack", title: "this is a secondary" },
              { author: "jack", title: "this is a secondary1" }
            ]
          },
          {
            name: "this is a primary2",
            secondary: [{ author: "jack2", title: "this is a secondary2" }]
          }
        ]
      },
      edit: false,
      dialogVisible: false
    };
  },
  methods: {
    create() {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 5,
        width: 30,
        title: "新增一级标题",
        form: [{ label: "标题", value: "" }]
      });
    },
    createPri(i1) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 0,
        i1: i1,
        width: 30,
        title: "新增一级标题",
        form: [{ label: "标题", value: "" }]
      });
    },
    editPri(item, i1) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 1,
        i1: i1,
        width: 30,
        title: "编辑一级标题",
        form: [{ label: "标题", value: item.name }]
      });
    },
    delPri() {},
    createSec(i1, i2) {
      this.dialogVisible = true;
      this.$refs.dialogData.showDialog({
        status: 2,
        i1: i1,
        i2: i2,
        width: 30,
        title: "新增二级标题",
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
        title: "编辑二级标题",
        form: [
          { label: "标题", value: item.secondary[i2].title },
          { label: "作者", value: item.secondary[i2].author }
        ]
      });
    },
    delSec() {},
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
      // const res = await this.$http.get(`rest/directories/${this.id}`);
      // this.directory = res.data;
    },
    getChange(status, i1, i2, data) {
      if (status === 0) {
        console.log(i1);
        this.directory.primary.splice(i1 + 1, 0, { name: data[0].value });
      } else if (status === 1) {
        this.directory.primary[i1].name = data[0].value;
      } else if (status === 2) {
        this.directory.primary[i1].secondary.splice(i2 + 1, 0, {
          title: data[0].value,
          author: data[1].value
        });
      } else if (status === 3) {
        this.directory.primary[i1].secondary[i2].title = data[0].value;
        this.directory.primary[i1].secondary[i2].author = data[1].value;
      } else if (status === 5) {
        this.directory.primary.push({
          name: data[0].value
        });
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped></style>
