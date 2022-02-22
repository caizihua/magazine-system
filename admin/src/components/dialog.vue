<template>
  <el-dialog :title="title" :visible.sync="open" width="30%">
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  props: {
    title: {
      type: String
    },
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
    send() {}
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
