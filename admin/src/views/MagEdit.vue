<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16" class="about">
        <el-card>
          <div slot="header" class="header">
            <strong>{{ id ? "编辑" : "新建" }}杂志</strong>
          </div>
          <el-form style="margin-bottom: 50px" label-width="80px">
            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="封面" style="margin-bottom: 0">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                  >
                    <img v-if="model.cover" :src="model.cover" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="所属分类">
                  <el-select
                    v-model="model.categories"
                    style="width:100%"
                    multiple
                  >
                    <el-option
                      v-for="item in categories"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="主办">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="出版周期">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="语种">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="ISSN">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="CN">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item label="创刊时间">
                  <el-input v-model="model.name" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="save"> 提交</el-button>
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
      categories: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
        this.$router.push("/items/list");
      } else {
        if (this.model.name == "") {
          this.$message({ message: "请输入名称", type: "warning" });
          return false;
        } else {
          await this.$http.post("rest/items", this.model);
          this.$router.push("/items/list");
        }
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    afterUpload(res) {
      //1.后端传来的对象res，其中就包括了地址
      //这里应注意，如果data的model里面没有定义icon，这样赋值将不会响应
      //因为可能是响应式问题，没有定义icon这样在对icon赋值是没有意义的，也不会显示的
      //可以显式地$set为对象添加不存在的属性。
      // this.model.icon = res.url;
      //2.使用$set时也应注意，如果对象已经添加了该属性，再这样添加也不会响应，应该是添加没有的属性
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
