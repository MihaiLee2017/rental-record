<template>
  <div class="table-filter">
    <dl>
      <dt>参数一：</dt>
      <dd>
        <el-input placeholder="请输入参数一" size="mini" v-model="params.param1" clearable>
        </el-input>
      </dd>
    </dl>
    <dl>
      <dt>参数二：</dt>
      <dd>
        <el-input placeholder="请输入参数二" size="mini" v-model="params.param2" clearable>
        </el-input>
      </dd>
    </dl>
    <dl>
      <dt>参数三：</dt>
      <dd>
        <el-input placeholder="请输入参数三" size="mini" v-model="params.param3" clearable>
        </el-input>
      </dd>
    </dl>
    <div class="btnGroup">
      <div class="btnGroup-content">
        <!-- <el-button type="primary" :disabled="loading" size="mini" @click.native="search">查询</el-button> -->
        <el-button type="primary" :disabled="loading" size="mini" @click.native="refresh">刷新</el-button>
        <el-button type="primary" :disabled="loading" size="mini" @click.native="add">添加</el-button>
        <!-- <slot name="btnSlot"></slot> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      params: {
        param1: '',
        param2: '',
        param3: ''
      }
    }
  },
  methods: {
    search() {
      this.$emit('search')
    },
    refresh() {
      this.$emit('refresh')
    },
    add() {
      this.$emit('add')
    },
    _getParams() {
      return this.params
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

