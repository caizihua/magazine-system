<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        router
        @open="handleOpen"
        :default-openeds="[hanleOpeneds]"
        unique-opened
        :default-active="$route.path"
      >
        <el-menu-item-group>
          <template slot="title">杂志主信息</template>
          <!-- 设置index，当点击时跳转到相应的index中去 -->
          <el-menu-item index="/magazines/create">新建杂志主信息</el-menu-item>
          <el-menu-item index="/magazines/list">杂志列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">杂志分期</template>
          <el-menu-item index="/periods/create">新建一期杂志</el-menu-item>
          <el-menu-item index="/periods/list">分期列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">轮播图</template>
          <el-menu-item index="/swiper/create">新建轮播图</el-menu-item>
          <el-menu-item index="/swiper/list">轮播图列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <!-- 设置路由容器，子路由在此显示 -->
        <!-- 默认是通过组件来区分页面的，但是新建和编辑是一个组件，所以通过path区分 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      hanleOpeneds: "1"
    };
  },
  methods: {
    handleOpen(key) {
      this.hanleOpeneds = key;
    }
  }
};
</script>
