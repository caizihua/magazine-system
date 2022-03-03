<template>
  <el-dialog :title="title" :visible.sync="open" :width="`${width}%`">
    <el-form label-width="80px">
      <el-form-item
        v-for="(item, index) in form"
        :key="index"
        :label="item.label"
      >
        <el-input placeholder="请输入" v-model="item.value"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="send()">提交</el-button>
        <el-button @click="open = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      width: 30,
      title: "",
      form: [
        {
          label: "",
          value: ""
        }
      ],
      status: 0,
      i1: null,
      i2: null
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: "dialogVisible",
    event: "change"
  },
  methods: {
    beforeClose() {
      this.$emit("closeDialog", false);
    },
    send() {
      this.$emit("getChange", this.status, this.i1, this.i2, this.form);
      this.open = false;
    },
    showDialog(val) {
      this.status = val.status || 0;
      this.width = val.width || 30;
      this.title = val.title || "";
      this.form = val.form || [];
      this.i1 = val.i1;
      this.i2 = val.i2;
    }
  },
  watch: {
    dialogVisible(val) {
      this.open = val;
    },
    open(val) {
      if (!val) {
        this.$emit("change", val);
      }
    }
  }
};
</script>

<style scoped></style>
