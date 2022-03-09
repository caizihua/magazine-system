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
            <el-col style="display:flex;flex-direction: column;">
              <el-upload
                ref="upload"
                :auto-upload="false"
                class="avatar-uploader"
                :action="
                  $http.defaults.baseURL + '/upload/period' + `/${model.name}`
                "
                :headers="getAuthHeaders()"
                :show-file-list="false"
                list-type="picture"
                :on-change="picOnchange"
                :on-success="res => $set(model, 'cover', res.url)"
              >
                <img v-if="cover" :src="cover" class="mag" />
                <i v-else class="el-icon-plus mag-uploader-icon"></i>
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
          <el-form-item label="名称">
            <el-input v-model="model.name" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="第几期">
            <el-input v-model="model.period" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save"> 保存</el-button>
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
      cover: "",
      model: {
        cover: "",
        name: "",
        period: ""
      },
      magazines: []
    };
  },
  methods: {
    async save() {
      if (this.model.name === "") {
        this.$message({ message: "请输入名称", type: "warning" });
        return false;
      } else if (this.model.cover === "" || this.model.cover === undefined) {
        this.$message({ message: "请上传图片", type: "warning" });
        return false;
      } else {
        if (this.id) {
          this.$refs.upload.submit();
          await this.$http.put(`rest/periods/${this.id}`, this.model);
          this.$router.push("/periods/list");
        } else {
          this.$refs.upload.submit();
          await this.$http.post("rest/periods", this.model);
          this.$router.push("/periods/list");
        }
        this.$message({
          type: "success",
          message: "保存成功"
        });
      }
    },
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
