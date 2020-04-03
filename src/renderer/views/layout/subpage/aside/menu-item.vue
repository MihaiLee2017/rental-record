<template>
    <section>
        <template v-if="hasChildren">
            <el-submenu :index="currentIndex">
                <template slot="title">
                    <span slot="title">{{item.meta.title}}</span>
                </template>
                <menu-item v-for="children in item.children" :key="children.path" :item='children' :basePath="currentIndex"></menu-item>
            </el-submenu>
        </template>
        <template v-if="isItem">
            <div>
                <el-menu-item :index="currentIndex">
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </div>
        </template>
    </section>
</template>
<script>
// import MenuItem from './menu-item'

import path from 'path'
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object
    },
    basePath: {
      type: String
    }
  },
  components: {
    // MenuItem
  },
  computed: {
    hasChildren() {
      return this.item.children && this.item.children.length > 0
    },
    isItem() {
      return !this.hasChildren && this.item.meta && this.item.meta.title
    },
    currentIndex() {
      return this.basePath ? this.basePath + this.item.path : this.item.path
    }
  }
}
</script>
