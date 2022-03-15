<template>
  <div>
    <h1>分期列表</h1>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-select v-model="form.name" filterable placeholder="名称">
            <el-option> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份">
          <el-select v-model="form.year" filterable placeholder="年份">
            <el-option> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数">
          <el-select v-model="form.number" filterable placeholder="期数">
            <el-option> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-select v-model="form.price" filterable placeholder="价格">
            <el-option> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--:data提供数据 -->
    <el-table :data="items">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="year" label="年份"> </el-table-column>
      <el-table-column prop="number" label="期数"> </el-table-column>
      <el-table-column prop="cover" label="封面链接"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
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
      form: {
        name: "",
        year: null,
        number: "",
        url: ""
      },
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
    },
    async onSubmit(){
      let form = {
        name: "",
        year: 2000,
        number: "",
        url: ""
      }
      const res = await this.$http.post("rest/periods/search",form);
      console.log(res.data)
    }
  },
  created() {
    this.fetch();
  }
};
</script>
