<template>
  <div>
    <h1>分期列表</h1>
    <el-card>
      <el-form :inline="true" style="display:flex;justify-content:space-around">
        <el-form-item label="名称">
          <el-select
            v-model="form.name"
            filterable
            placeholder="名称"
            clearable
          >
            <el-option
              v-for="item in magazines"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份">
          <el-select
            v-model="form.year"
            filterable
            placeholder="年份"
            clearable
          >
            <el-option
              v-for="item in items"
              :key="item.name"
              :label="item.year"
              :value="item.year"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数">
          <el-select
            v-model="form.number"
            filterable
            placeholder="期数"
            clearable
          >
            <el-option
              v-for="item in items"
              :key="item.name"
              :label="item.number"
              :value="item.number"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-select
            v-model="form.price"
            filterable
            placeholder="价格"
            clearable
          >
            <el-option
              v-for="item in items"
              :key="item.name"
              :label="item.price"
              :value="item.price"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="form = {}">重置</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
    <!--:data提供数据 -->
    <el-table :data="items">
      <el-table-column prop="name" label="名称" width="170"> </el-table-column>
      <el-table-column prop="year" label="年份" width="100"> </el-table-column>
      <el-table-column prop="number" label="期数" width="100">
      </el-table-column>
      <el-table-column prop="cover" label="封面链接"> </el-table-column>
      <el-table-column prop="price" label="价格" width="100"> </el-table-column>
      <el-table-column label="目录" width="100">
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
    changeName(items, magazines) {
      items.forEach(item => {
        magazines.forEach(mag => {
          if (mag._id === item.name) {
            item.name = mag.name;
          }
        });
      });
    },
    async fetch() {
      let items = [],
        magazines = [];
      const res = await this.$http.get("rest/periods");
      items = res.data;
      const resMag = await this.$http.get(`rest/main`);
      magazines = resMag.data;
      //将列表中的id改为名字
      this.changeName(items, magazines);
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
    async onSubmit() {
      let form = {};
      if (this.form.name !== "") {
        form.name = this.form.name;
      }
      if (this.form.year !== null) {
        form.year = this.form.year;
      }
      if (this.form.number !== "") {
        form.number = this.form.number;
      }
      if (this.form.price !== null) {
        form.price = this.form.price;
      }
      const res = await this.$http.post("rest/periods/search", form);
      let items = res.data;
      this.changeName(items, this.magazines);
      this.items = items;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
