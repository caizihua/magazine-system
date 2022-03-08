<template>
  <el-row type="flex" justify="center">
    <el-col :span="8">
      <el-card>
        <template slot="header">
          <strong> {{ `${this.id ? "编辑" : "新增"}一期杂志` }} </strong>
        </template>
        <el-form style="margin: 0 1rem 1rem" label-width="80px">
          <el-form-item
            label="图片"
            style="margin-top: 0.5rem;"
            :rules="{ required: true }"
          >
            <el-col
              style="display:flex;justify-content:flex-start;align-items:flex-end;"
            >
              <el-upload
                ref="upload"
                :auto-upload="false"
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                list-type="picture"
                :on-change="picOnchange"
                :on-success="res => $set(model, 'cover', res.url)"
              >
                <img v-if="cover" :src="cover" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>
                <el-button
                  style="margin-left: 1rem;margin-bottom:1rem"
                  size="small"
                  type="success"
                  @click="submitUpload"
                  >上传</el-button
                >
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="model.name" style="width:100%"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      cover:"",
      model: {
        cover: "",
        name: "",
        period: ""
      },
      magazines: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/periods/${this.id}`);
      this.model = res.data;
    },
    async fetchMag() {
      const res = await this.$http.get(`rest/magazine`);
      this.magazines = res.data;
      console.log(res);
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.$message({ message: "上传成功", type: "success" });
    },
    picOnchange(file, fileList) {
      if (fileList.length !== 1) {
        fileList.splice(0, fileList.length - 1);
        console.log(fileList);
      }
      this.cover = file.url;
    },
    uploadSuccess(res) {
      this.$set(this.model, "cover", res.file);
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchMag();
  }
};
</script>
