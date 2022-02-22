<template>
  <div>
    <el-card>
      <template slot="header">
        <strong>新建杂志目录</strong>
      </template>
      <el-button type="primary">新增一级标题</el-button>
      <el-table :data="directory">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.secondary">
              <el-table-column width="30"></el-table-column>
              <el-table-column label="二级标题" prop="title"></el-table-column>
              <el-table-column label="作者" prop="author"></el-table-column>
              <el-table-column label="操作" fixed="right">
                <template>
                  <el-button size="small">新增</el-button>
                  <el-button size="small">编辑</el-button>
                  <el-button size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="一级标题" prop="name"></el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="createPrimary()"
              >新增</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="editPrimary(scope.row, scope.$index)"
              >编辑</el-button
            >
            <el-button type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dialog :title="diaTitle" v-model="dialogVisible">
      <el-form label-width="80px" :model="currentDir" ref="currentDir">
        <el-form-item label="标题">
          <el-input
            v-model="currentDir.name"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="send()">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../components/dialog.vue";
export default {
  components: { Dialog },
  data() {
    return {
      directory: [
        {
          name: "this is a primary",
          secondary: [{ author: "jack", title: "this is a secondary" }]
        },
        {
          name: "this is a primary2",
          secondary: [{ author: "jack2", title: "this is a secondary2" }]
        }
      ],
      diaTitle: "",
      edit: false,
      currentDir: {
        index: 0,
        name: ""
      },
      dialogVisible: false,
      model: {
        name: ""
      }
    };
  },
  methods: {
    createPrimary() {
      this.diaTitle = "新增一级标题";
      this.currentDir.name = "";
      this.dialogVisible = true;
    },
    editPrimary(element, index) {
      this.edit = true;
      this.diaTitle = "编辑一级标题";
      this.currentDir.index = index;
      this.currentDir.name = element.name;
      this.dialogVisible = true;
    },
    send() {
      if (!this.edit) {
        console.log(this.currentDir);
      } else {
        console.log(this.currentDir);
      }
      this.dialogVisible = false;
      this.edit = false;
    },
    async fetch() {
      const res = await this.$http.get(`rest/magazines/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    fetch();
  }
};
</script>

<style scoped></style>
