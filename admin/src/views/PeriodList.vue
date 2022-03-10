<template>
  <div>
    <h1>分期列表</h1>
    <!--:data提供数据 -->
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="cover" label="链接"> </el-table-column>
      <el-table-column prop="period" label="期数"> </el-table-column>
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
            @click="$router.push(`/periods/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <!-- 将整行的数据传给remove方法 -->
          <el-button type="primary" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      magazines: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/periods");
      this.items = res.data;
    },
    async fetchMag() {
      const res = await this.$http.get(`rest/magazine`);
      this.magazines = res.data;
      //将列表中的id改为名字
      this.items.forEach(item => {
        this.magazines.forEach(mag => {
          if (mag._id === item.name) {
            item.name = mag.name;
          }
        });
      });
    },
    remove(row) {
      this.$confirm(`是否确定删除："${row.name}"？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/periods/${row._id}`);
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
    this.fetchMag();
  }
};
</script>
