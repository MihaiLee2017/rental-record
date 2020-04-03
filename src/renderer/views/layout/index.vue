<template>
  <!-- <div class="layout">
    </div> -->
  <el-container class="layout">
    <aside-view />
    <el-container>
      <el-header class="layout-header">
        <breadcrumb-view />
      </el-header>
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AsideView from './subpage/aside/index.vue'
import BreadcrumbView from './subpage/breadcrumb'
export default {
  components: { AsideView, BreadcrumbView }
}
</script>

<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  .layout-header {
    border-bottom: 1px solid #ccc;
  }
  .layout-main {
    padding: 0;
    margin: 0;
    flex: 1;
  }
}
</style>
