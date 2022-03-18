<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-card>
          <template slot="header">
            <strong>分类列表</strong>
          </template>
          <el-table :data="items" :height="wrapHight - 150" stripe>
            <el-table-column prop="_id" label="ID"> </el-table-column>
            <el-table-column
              prop="parent.name"
              label="上级分类"
            ></el-table-column>
            <el-table-column prop="name" label="分类名称"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="190">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="$router.push(`/categories/edit/${scope.row._id}`)"
                >
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="remove(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wrapHight: window.innerHeight,
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定删除分类："${row.name}"？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/categories/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    async init() {
      const res = await this.$http.get(`init/categories`);
      console.log(res.data);
    }
  },
  created() {
    this.fetch();
    //this.init();
  }
};
</script>
