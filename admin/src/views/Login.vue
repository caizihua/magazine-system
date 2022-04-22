<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="model.code"></el-input>
          <el-row type="flex" align="bottom">
            <div v-html="code" @click="changeCode"></div>
            <span style="margin-bottom:0.5rem">看不清？请点击图片更换</span>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                this.$router.push('/register');
              }
            "
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
        code: ""
      },
      code: ""
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      //在前端中保存下来token
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功"
      });
    },
    changeCode() {
      let res = this.$http.get("getCode");
      res.then(v => {
        this.code = v.data;
      });
    }
  },
  created() {
    this.changeCode();
  }
};
</script>
