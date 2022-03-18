<template>
  <el-row class="about" type="flex" justify="center">
    <el-col :span="11">
      <el-card>
        <template slot="header">
          <h1>{{ id ? "编辑" : "新建" }}轮播图</h1>
        </template>
        <el-form label-width="90px" ref="model" :model="model">
          <el-form-item
            label="名称"
            :rules="{ required: true, message: '请输入名称' }"
            prop="name"
          >
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item
            label="链接(URL)"
            :rules="{ required: true, message: '请输入链接' }"
            prop="url"
          >
            <el-input v-model="model.url"></el-input>
          </el-form-item>
          <el-form-item
            label="图片"
            style="margin-top: 0.5rem;"
            :rules="{ required: true, message: '请添加图片' }"
            prop="image"
          >
            <el-col style="display:flex;flex-direction: column;">
              <el-upload
                ref="upload"
                :auto-upload="false"
                class="avatar-uploader"
                :action="
                  $http.defaults.baseURL + '/upload/swiper' + `/${model.name}`
                "
                :headers="getAuthHeaders()"
                :show-file-list="false"
                list-type="picture"
                :on-change="picOnchange"
                :on-success="res => $set(model, 'image', res.url)"
              >
                <img v-if="image" :src="image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div style="display:flex;align-items: flex-end;">
                <div>
                  <el-button size="small" type="success" @click="submitUpload"
                    >上传</el-button
                  >
                </div>
                <div
                  style="width:12.5rem;height:1.5rem;color:orange;margin-bottom:0.5rem"
                >
                  <i class="el-icon-info" style="margin-left:1rem;"></i>
                  <span> 请在提交前先上传图片! </span>
                </div>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save('model')">
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
      },
      image: ""
    };
  },
  methods: {
    async save(model) {
      this.$refs[model].validate(async valid => {
        if (valid) {
          if (this.id) {
            this.$refs.upload.submit();
            await this.$http.put(`rest/swiper/${this.id}`, this.model);
            this.$router.push("/swiper/list");
          } else {
            this.$refs.upload.submit();
            await this.$http.post("rest/swiper", this.model);
            this.$router.push("/swiper/list");
          }
          this.$message({
            type: "success",
            message: "保存成功"
          });
        } else return false;
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/swiper/${this.id}`);
      this.model = res.data;
      this.image = this.model.image;
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.$message({ message: "上传成功", type: "success" });
    },
    picOnchange(file, fileList) {
      if (fileList.length !== 1) {
        fileList.splice(0, fileList.length - 1);
      }
      this.image = file.url;
    },
    uploadSuccess(res) {
      this.$set(this.model, "image", res.file);
    }
  },
  created() {
    //前面的条件满足才执行后面的函数
    this.id && this.fetch();
  }
};
</script>
