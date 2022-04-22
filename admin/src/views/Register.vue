<template>
  <div>
    <el-card header="请先注册" class="register-card">
      <el-form @submit.native.prevent="register">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="再次确认密码">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="model.code"></el-input>
          <el-row type="flex" align="bottom">
            <div v-html="code" @click="changeCode"></div>
            <span style="margin-bottom:0.5rem">看不清？请点击图片更换</span>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">注册</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                this.$router.push('/login');
              }
            "
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.register-card {
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
      code: "",
      password: ""
    };
  },
  methods: {
    async register() {
      if (this.model.username == "") {
        this.$message({ message: "请输入名称", type: "warning" });
        return false;
      } else if (this.model.password == "") {
        this.$message({ message: "请输入密码", type: "warning" });
        return false;
      } else if (this.password == "") {
        this.$message({ message: "请再次输入密码", type: "warning" });
        return false;
      } else if (this.model.password !== this.password) {
        this.$message({ message: "两次密码不一致", type: "warning" });
        return false;
      } else {
        const res = await this.$http.post("register", this.model);
        //在前端中保存下来token
        localStorage.token = res.data.token;
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "注册成功"
        });
      }
      //跳转到分类页面

      //提示保存成功
      this.$message({
        type: "success",
        message: "注册成功"
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
