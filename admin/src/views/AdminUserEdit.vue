<template>
  <el-row class="about" type="flex" justify="center">
    <el-col :span="8">
      <el-card>
        <template slot="header">
          <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
        </template>
        <el-form label-width="80px" ref="model" :model="model">
          <el-form-item
            label="用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
            prop="username"
          >
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :rules="{ required: true, message: '请输入密码' }"
            prop="password"
          >
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save('model')"> 提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    save(model) {
      this.$refs[model].validate(async valid => {
        if (valid) {
          if (this.id) {
            await this.$http.put(`rest/admin_users/${this.id}`, this.model);
            this.$router.push("/admin_users/list");
          } else {
            await this.$http.post("rest/admin_users", this.model);
            this.$router.push("/admin_users/list");
          }
          this.$message({
            type: "success",
            message: "保存成功"
          });
        } else {
          return false;
        }
      });
    },
    //获取分类的详情
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    //前面的条件满足才执行后面的函数
    this.id && this.fetch();
  }
};
</script>
