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

    <el-dialog title="添加租房记录" :visible.sync="dialogVisible" width="50%">
      <section>
        <el-form ref="form" :model="formParams" label-width="90px">
          <el-form-item label="姓名">
            <el-input v-model="formParams.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="formParams.idCard"></el-input>
          </el-form-item>
          <el-form-item label="房间号">
            <el-select v-model="formParams.room" placeholder="请选择">
              <el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="钥匙数量">
            <el-input-number v-model="formParams.keyNum" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="村门卡数量">
            <el-input-number v-model="formParams.villageNum" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="大门卡号">
            <el-input v-model="formParams.doorNum"></el-input>
          </el-form-item>
          <el-form-item label="签约时间">
            <el-date-picker v-model="formParams.contractTime" value-format="yyyy-MM-DD" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同时间">
            <el-date-picker v-model="formParams.termTime" value-format="yyyy-MM-DD" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="其他">
            <el-input v-model="formParams.other"></el-input>
          </el-form-item>
        </el-form>
      </section>
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
// import RoomList from '@/assets/js/room-list'
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
      ],
      key: 'tenant',
      roomList: [],
      roomData: []
      // myStore
    }
  },
  mounted() {
    this.roomData = MyStore.get('room')
    // console.log(MyStore.get(this.key))
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
        this.totalData = MyStore.get(this.key) || []
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
      const key = this.key
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
    // 合同表单提交
    submitHandle() {
      // let room = this.roomData.find(item => {
      //   return item.name == this.formParams.room
      // })
      // console.log(room)
      // return false
      // if (room.status) {
      //   this.$message.error('房间正在出租')
      //   return false
      // }
      const key = this.key
      this.submit(key, this.formParams, this.totalData)
    },
    submit(key, params, totalData) {
      let list = []
      if (params.id) {
        list = totalData.map(item => {
          if (params.id == item.id) {
            return params
          } else {
            return item
          }
        })
      } else {
        list = [{ ...params, id: uuid() }, ...totalData]
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
