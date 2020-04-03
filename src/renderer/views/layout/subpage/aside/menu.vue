<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :background-color="config.bg" :text-color='config.tc' :active-text-color='config.ac' :router="true">
        <menu-item v-for="item in MenuList" :key="item.path" :item='item'></menu-item>
    </el-menu>
</template>
<script>
import MenuItem from './menu-item'
import { MenuList } from '@/router/index.js'
export default {
  components: {
    MenuItem
  },
  data() {
    return {
      MenuList: MenuList,
      config: {
        bg: '#304156',
        tc: '#bfcbd9',
        ac: '#409EFF'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>

