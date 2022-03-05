<template>
  <el-row class="about" type="flex" justify="center">
    <el-col :span="10">
      <el-card>
        <template slot="header">
          <h1>{{ id ? "编辑" : "新建" }}轮播图</h1>
        </template>
        <el-form label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="链接(URL)">
            <el-input v-model="model.url"></el-input>
          </el-form-item>
          <el-form-item label="图片" style="margin-top: 0.5rem">
            <el-upload
              :auto-upload="false"
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="res => $set(model, 'image', res.url)"
            >
              <img v-if="model.image" :src="model.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
              :auto-upload="false"
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              list-type="picture"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div
                slot="file"
                slot-scope="{ file }"
                style="width:16rem;height:9rem"
              >
                <el-image
                  class="avatar"
                  :src="file.url"
                  alt=""
                  style="width:auto;height:auto"
                >
                </el-image>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">
              <!-- native-type="submit" -->
              保存</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  //这样就能直接使用id，不用再写
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        url: ""
      }
    };
  },
  methods: {
    async save() {
      //对于新建和编辑，保存的方法不一样，一个是post，一个是put
      //async await将类似同步的写法写成异步
      // let res;
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model);
        this.$router.push("/ads/list");
      } else {
        if (this.model.name == "") {
          this.$message({ message: "请输入名称", type: "warning" });
          return false;
        } else {
          await this.$http.post("rest/ads", this.model);
          this.$router.push("/ads/list");
        }
      }
      //跳转到分类页面

      //提示保存成功
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //获取分类的详情
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    //前面的条件满足才执行后面的函数
    this.id && this.fetch();
  }
};
</script>
