<template>
  <el-container class="table-container">
    <el-header class="table-header">
      <search-filter :loading="tableLoading" ref="searchFilter" @add="addHandle" @refresh="_filterHandle"></search-filter>
    </el-header>
    <el-main class="table-main">
      <el-table :data="tableData" v-loading="tableLoading" style="width: 100%" height="100%">
        <!-- <el-table-column v-for="item in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :fixed="item.fixed">
        </el-table-column> -->
        <el-table-column prop="name" label="房间号">
        </el-table-column>
        <el-table-column prop="model" label="规格">
        </el-table-column>
        <el-table-column prop="status" label="房间号">
          <template slot-scope="scope">
            <el-tag v-if=" scope.row.status" type="success">已出租</el-tag>
            <el-tag v-else type="warning">未出租</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="delHandle(scope.$index, tableData)" type="text" size="small">
              删除
            </el-button>
            <el-button @click.native.prevent="editHandle(scope.$index, tableData)" type="text" size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="table-footer">
      <el-pagination :disabled="tableLoading" @size-change="_pageSizeChange" @current-change="_pageCurrentChange" :current-page="pageObj.page" :page-sizes="pageSizeList" :page-size="pageObj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-footer>

    <el-dialog title="添加房间" :visible.sync="dialogVisible" width="50%">

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandle">提 交</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import { TABLE_MAXINS } from '@/assets/table-mixins/mixins/TableMixins'
import SearchFilter from './SearchFilter'
import { uuid } from 'uuidv4'
// import {} from ''
import MyStore from '@/api/dataApi.js'
export default {
  mixins: [TABLE_MAXINS],
  components: { SearchFilter },
  data() {
    return {
      totalData: [],
      tableData: [],
      dialogVisible: false,
      formParams: {
        name: '',
        model: '',
        status: false
      },
      modelList: [
        {
          label: '单间',
          value: '单间'
        },
        {
          label: '一房一厅',
          value: '一房一厅'
        },
        {
          label: '两房一厅',
          value: '两房一厅'
        }
      ]
      // myStore
    }
  },
  mounted() {
    console.log(' uuid()', uuid())
    // MyStore.set('room', [])
    console.log(MyStore.get('room'))
  },
  methods: {
    //  设置请求参数
    _setParamsAndAction() {
      // let params = this.$refs.travelFliter.getParams()
      this.params = {
        ...this.params,
        ...this.$refs.searchFilter._getParams()
      }
      this.getDataAction()
    },
    // 向后台请求数据
    getDataAction() {
      // console.log('向后台请求数据 参数 ', this.params)
      setTimeout(() => {
        this.totalData = MyStore.get('room')
        this.total = this.totalData.length
        this.getCurrentData()
        this.tableLoading = false
      }, 300)
    },
    getCurrentData() {
      let { page, pagesize } = this.pageObj
      let skip = (page - 1) * pagesize
      this.tableData = this.totalData.slice(skip, skip + pagesize)
    },
    // 表格操作列
    delHandle(index, data) {
      let { page, pagesize } = this.pageObj
      let skip = (page - 1) * pagesize
      this.totalData.splice(skip + index, 1)
      this.getCurrentData()
      const key = 'room'
      MyStore.set(key, this.totalData)
    },
    editHandle(index) {
      this.formParams = { ...this.tableData[index] }
      this.dialogVisible = true
    },
    addHandle() {
      this.formParams = {}
      this.dialogVisible = true
    },
    submitHandle() {
      // let list =this.
      const key = 'room'
      let list = []
      if (this.formParams.id) {
        list = this.totalData.map(item => {
          if (this.formParams.id == item.id) {
            return this.formParams
          } else {
            return item
          }
        })
      } else {
        list = [{ ...this.formParams, id: uuid() }, ...this.totalData]
      }
      MyStore.set(key, list)
      this.dialogVisible = false
      this._filterHandle()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/table-mixins/styles.scss';
.el-input,
.el-select {
  width: 100%;
}
</style>
