<template>
  <el-row type="flex" justify="center">
    <el-col :span="8">
      <el-card>
        <template slot="header">
          <strong> {{ `${this.id ? "编辑" : "新增"}一期杂志` }} </strong>
        </template>
        <el-form
          style="margin: 0 1rem 1rem"
          label-width="80px"
          :model="model"
          ref="model"
        >
          <el-form-item
            label="图片"
            style="margin-top: 0.5rem;"
            :rules="[
              {
                required: true,
                message: '请上传'
              }
            ]"
            prop="number.cover"
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
                :on-success="res => $set(content, 'cover', res.url)"
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
          <el-form-item
            label="名称"
            :rules="[
              {
                required: true,
                message: '请输入名称'
              }
            ]"
            prop="name"
          >
            <el-select v-model="model.name" style="width:100%">
              <el-option
                v-for="item in magazines"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="年"
            :rules="[
              {
                required: true,
                message: '请输入年份'
              }
            ]"
            prop="period.year"
          >
            <el-input v-model="model.period.year" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item
            label="期数"
            :rules="[
              {
                required: true,
                message: '请输入期数'
              }
            ]"
            prop="content.number"
          >
            <el-input v-model="content.number" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">提交</el-button>
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
      cover: "",
      model: {
        name: "",
        period: {
          year: null, //年份
          content: [""] //年份中每期id
        }
      },
      content: {
        parent: "", //Period的objectID
        number: "", //期数
        cover: "" //封面
      },
      magazines: []
    };
  },
  methods: {
    //提交按钮
    save() {
      this.$refs.model.validate(async valid => {
        let postModel = null;
        if (valid) {
          if (this.id) {
            this.$refs.upload.submit();
            await this.$http.put(`rest/periods/${this.id}`, this.model);
            this.$router.push("/periods/list");
          } else {
            postModel.name = this.model.name;
            postModel.period
            this.$refs.upload.submit();
            await this.$http.put(`rest/periods`);
            this.$router.push("/periods/list");
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
    async fetch() {
      const res = await this.$http.get(`rest/periods/${this.id}`);
      this.model = res.data;
      this.cover = this.model.cover;
    },
    async fetchMag() {
      const res = await this.$http.get(`rest/main`);
      this.magazines = res.data;
    },
    //上传图片按钮
    submitUpload() {
      if (this.model.name === "") {
        this.$message({ message: "请输入名称", type: "warning" });
        return false;
      } else if (this.cover === "") {
        this.$message({ message: "请选择图片", type: "warning" });
        return false;
      }
      this.$refs.upload.submit();
      this.$message({ message: "上传成功", type: "success" });
    },
    //选择图片事件
    picOnchange(file, fileList) {
      if (fileList.length !== 1) {
        fileList.splice(0, fileList.length - 1);
      }
      this.cover = file.url;
    }
  },
  created() {
    // this.id && this.fetch();
     this.fetchMag();
  }
};
</script>
