<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="8" class="about">
        <el-card>
          <div slot="header" class="header">
            <strong>{{ id ? "编辑" : "新建" }}杂志主信息</strong>
          </div>
          <el-form
            style="margin: 0 1rem 1rem"
            label-width="80px"
            :model="model"
            ref="model"
          >
            <el-form-item
              label="名称"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '请输入名称'
                }
              ]"
            >
              <el-input v-model="model.name" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item
              label="所属分类"
              :rules="{ required: true, message: '请选择所属分类' }"
            >
              <el-select v-model="model.categories" style="width:100%" multiple>
                <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="主办"
              prop="host"
              :rules="{ required: true, message: '请输入主办' }"
            >
              <el-input v-model="model.host" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item
              label="出版周期"
              prop="cycle"
              :rules="[{ required: true, message: '请输入出版周期' }]"
            >
              <el-input v-model="model.cycle" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item
              label="语种"
              prop="language"
              :rules="[{ required: true, message: '请输入语种' }]"
            >
              <el-input v-model="model.language" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item
              label="ISSN"
              prop="ISSN"
              :rules="[{ required: true, message: '请输入ISSN' }]"
            >
              <el-input v-model="model.ISSN" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item
              label="CN"
              prop="CN"
              :rules="[{ required: true, message: '请输入CN' }]"
            >
              <el-input v-model="model.CN" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item
              label="创刊时间"
              prop="initiateDate"
              :rules="{ required: true, message: '请输入创刊时间' }"
            >
              <el-input
                v-model="model.initiateDate"
                style="width:100%"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save('model')"> 提交</el-button>
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
        name: "",
        host: "",
        cycle: "",
        language: "",
        ISSN: "",
        CN: "",
        initiateDate: ""
      },
      categories: []
    };
  },
  methods: {
    save() {
      this.$refs.model.validate(async valid => {
        if (valid) {
          if (this.id) {
            await this.$http.put(`rest/main/${this.id}`, this.model);
            this.$router.push("/magazines/list");
          } else {
            await this.$http.post("rest/main", this.model);
            this.$router.push("/magazines/list");
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
      const res = await this.$http.get(`rest/main/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    afterUpload(res) {
      this.$set(this.model, "cover", res.url);
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  }
};
</script>

<style scoped>
.header {
  margin: 0;
  padding: 0;
}
</style>
