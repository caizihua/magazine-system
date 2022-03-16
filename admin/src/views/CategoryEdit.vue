<template>
  <div class="about">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-card>
          <template slot="header">
            <strong>{{ id ? "编辑" : "新建" }}分类 </strong>
          </template>
          <el-form label-width="80px" ref="model" :model="model">
            <el-form-item label="上级分类">
              <el-select v-model="model.parent">
                <el-option
                  v-for="item in parents"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="名称"
              :rules="[{ required: true, message: '请输入名称' }]"
              prop="name"
            >
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item style="display:flex;justify-content:flex-end">
              <el-button type="primary" @click="save('model')">
                <!-- native-type="submit" -->
                提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: ""
      },
      parents: []
    };
  },
  methods: {
    save(model) {
      let that = this;
      this.$refs[model].validate(async function(valid) {
        if (valid) {
          if (that.id) {
            await that.$http.put(`rest/categories/${that.id}`, that.model);
            that.$router.push("/categories/list");
          } else {
            console.log(that.model);
            await that.$http.post("rest/categories", that.model);
            that.$router.push("/categories/list");
          }
          that.$message({ type: "success", message: "保存成功" });
        } else {
          return false;
        }
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    },

  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>
