<template>
  <div>
    <el-row class="about" type="flex" justify="center">
      <el-col :span="10">
        <el-card>
          <template slot="header">
            <h1>管理员列表</h1>
          </template>
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/admin_users/create`)"
            >新增</el-button
          >
          <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="190">
            </el-table-column>
            <el-table-column label="操作" width="210">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
                  >编辑</el-button
                >
                <!-- 将整行的数据传给remove方法 -->
                <el-button
                  type="primary"
                  size="small"
                  @click="remove(scope.row)"
                  >删除</el-button
                >
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
      items: []
    };
  },
  methods: {
    async fetch() {
      //使用get方法获取服务端的接口
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定删除："${row.username}"？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/admin_users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
