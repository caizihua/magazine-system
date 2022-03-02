<template>
  <el-row>
    <el-col :span="24">
      <h1>杂志列表</h1>
      <!--:data提供数据 -->
      <el-table :data="magazines">
        <el-table-column prop="name" label="杂志名称"> </el-table-column>
        <!-- <el-table-column prop="cover" label="杂志封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover" style="height: 2.5rem" />
          </template>
        </el-table-column> -->
        <el-table-column prop="host" label="主办方"> </el-table-column>
        <el-table-column prop="cycle" label="出版周期"> </el-table-column>
        <el-table-column prop="language" label="语种"> </el-table-column>
        <el-table-column prop="ISSN" label="ISSN"> </el-table-column>
        <el-table-column prop="CN" label="CN"> </el-table-column>
        <el-table-column prop="initiateDate" label="创刊时间">
        </el-table-column>
        <el-table-column label="目录">
          <template slot-scope="scope">
            <!-- scope.row表示当前这一行的数据 -->
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/magazines/directory/${scope.row.directory}`)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="190">
          <template slot-scope="scope">
            <!-- scope.row表示当前这一行的数据 -->
            <el-button
              type="primary"
              size="small"
              @click="$router.push(`/magazines/edit/${scope.row._id}`)"
              >编辑</el-button
            >
            <!-- 将整行的数据传给remove方法 -->
            <el-button type="primary" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      magazines: []
    };
  },
  methods: {
    async fetch() {
      //使用get方法获取服务端的接口
      const res = await this.$http.get("rest/magazines");
      this.magazines = res.data;
    },
    async fetchCategories() {},
    remove(row) {
      this.$confirm(`是否确定删除："${row.name}"？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/magazines/${row._id}`);
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
