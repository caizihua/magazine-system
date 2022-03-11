<template>
  <div>
    <h1>分期列表</h1>
    <!--:data提供数据 -->
    <el-table :data="items">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="period" label="期数">
        <template>
          <el-select
            v-model="value"
            filterable
            placeholder="请选择"
            size="small"
            style="width:7rem"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span style="margin:0 1rem 0 0.5rem">年</span>
          <el-select
            v-model="value"
            filterable
            placeholder="请选择"
            size="small"
            style="width:7rem"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span style="margin-left:0.5rem">期</span>
        </template>
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
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/periods/edit/${scope.row._id}`)"
            >查看</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/periods/edit/${scope.row._id}`)"
            >编辑</el-button
          >
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
      let items = [],
        magazines = [];
      const res = await this.$http.get("rest/periods");
      items = res.data;
      const resMag = await this.$http.get(`rest/main`);
      magazines = resMag.data;
      //将列表中的id改为名字
      items.forEach(item => {
        magazines.forEach(mag => {
          if (mag._id === item.name) {
            item.name = mag.name;
          }
        });
      });
      this.items = items;
      this.magazines = magazines;
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
  }
};
</script>
