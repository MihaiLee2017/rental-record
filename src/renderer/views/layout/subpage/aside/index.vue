<template>
  <el-aside width="200px" class="layout-aside">
    <el-scrollbar class="aside-scrollbar">
      <!-- <div style="height:1000px;">43434</div> -->
      <menu-view />
    </el-scrollbar>
  </el-aside>
</template>
<script>
import MenuView from './menu.vue'
export default {
  components: {
    MenuView
  }
}
</script>

<style lang="scss">
.layout-aside {
  background-color: #304156;
  //   overflow: hidden;
  .aside-scrollbar {
    height: 100%;
    width: 100%;
    .el-scrollbar__wrap {
      padding-right: 20px;
      overflow: hidden !important;
      overflow-y: auto !important;
    }
  }
}
</style>
