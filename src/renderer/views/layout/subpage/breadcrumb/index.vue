<template>
    <section class="layout-breadcrumb">
        <el-breadcrumb :separator="separator">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in routerList" :key="item.title">{{item.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </section>
</template>
<script>
export default {
  data() {
    return {
      separator: '/',
      routerList: []
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      console.log(this.$route)
      let matched = this.$route.matched.filter(item => {
        return item.path && item.meta && item.meta.title
      })
      this.routerList = matched.map(item => {
        return {
          path: item.path,
          title: item.meta.title
        }
      })
      console.log(this.routerList)
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-breadcrumb {
  .el-breadcrumb {
    line-height: 60px;
    height: 60px;
  }
}
</style>
