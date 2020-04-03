<template>
    <el-container class="room-container">
        <el-aside width="300px" class="room-aside">
            <el-tree :data="data" node-key="id" default-expand-all :highlight-current="true" @node-click="nodeClick">
                <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="() => append(data)">
                            添加
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(data)">
                            删除
                        </el-button>
                    </span>
                </span> -->
            </el-tree>
        </el-aside>
        <el-container>
            <el-header class="room-main-header">
                <el-button type="primary" @click="editHandle">修改</el-button>
                <el-button type="primary" @click="addHandle">添加</el-button>
            </el-header>
            <el-main>
                <section v-if="type==1">
                    <el-form ref="form" :model="roomParams" label-width="80px" :disabled="!isEdit">
                        <!-- <el-form-item label="房间号">
                            <el-input v-model="roomParams.name"></el-input>
                        </el-form-item> -->
                        <el-form-item label="房间号">
                            <el-select v-model="roomParams.room" placeholder="请选择">
                                <el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="规格">
                            <el-select v-model="roomParams.model" placeholder="请选择">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="其他">
                            <el-input v-model="roomParams.other"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit(roomParams,roomParams.room)">提交</el-button>
                            <el-button @click="cancleHandle">取消</el-button>
                        </el-form-item>
                    </el-form>
                </section>
                <section v-if="type==2">
                    <el-form ref="form" :model="tenantParams" label-width="80px" :disabled="!isEdit">
                        <!-- <el-form-item label="房间号">
                            <el-input v-model="roomParams.name"></el-input>
                        </el-form-item> -->
                        <el-form-item label="姓名">
                            <el-input v-model="tenantParams.name"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证">
                            <el-input v-model="tenantParams.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="租金">
                            <el-input v-model="tenantParams.rent"></el-input>
                        </el-form-item>
                        <el-form-item label="押金金">
                            <el-input v-model="tenantParams.deposit"></el-input>
                        </el-form-item>
                        <el-form-item label="合同时间">
                            <el-date-picker v-model="tenantParams.contractTime" value-format="yyyy-MM-DD" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="合同时间">
                            <el-date-picker v-model="tenantParams.leaseTime" value-format="yyyy-MM-DD" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="其他">
                            <el-input v-model="tenantParams.other"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit(tenantParams,tenantLabel)">提交</el-button>
                            <el-button @click="cancleHandle">取消</el-button>
                        </el-form-item>
                    </el-form>
                </section>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import { uuid } from 'uuidv4'
import MyStore from '@/api/dataApi.js'
import { TypeList, RoomList } from '@/assets/js/room-list'
// 1 房间，2合同，3租金
export default {
  data() {
    return {
      data: [],
      type: 0,
      roomParams: {},
      tenantParams: {},
      typeList: TypeList,
      roomList: RoomList,
      key: 'room',
      isEdit: false,
      currentNode: {},
      currentData: {}
    }
  },
  computed: {
    tenantLabel() {
      return (
        this.tenantParams.name +
        '（' +
        this.tenantParams.leaseTime.join(' 至 ') +
        '）'
      )
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.data = MyStore.get('room')
      //   MyStore.set('room', [
      //     {
      //       label: '总房间',
      //       id: uuid(),
      //       children: [],
      //       type: ''
      //     }
      //   ])
    },
    nodeClick(data, node) {
      this.currentNode = node
      this.currentData = data
      this.checkParams(false)
      this.isEdit = false
    },
    addHandle() {
      if (!this.currentData.id) {
        return false
      }
      this.checkParams(true)
      this.isEdit = true
    },
    checkParams(isAdd = false) {
      this.roomParams = {}
      this.tenantParams = {}
      this.costParams = {}
      const type = this.currentData.type || 0
      this.type = isAdd ? type + 1 : type
      switch (this.type) {
        case 1:
          this.roomParams = isAdd ? {} : { ...this.currentData }
          break
        case 2:
          this.tenantParams = isAdd ? {} : { ...this.currentData }
          break
          break
        case 3:
          this.costParams = isAdd ? {} : { ...this.currentData }
          break
        default:
          this.type = 0
          break
      }
    },
    editHandle() {
      if (!this.currentData.id) {
        return false
      }
      this.isEdit = true
    },
    cancleHandle() {
      this.isEdit = false
    },
    submit(params, label) {
      let node = {
        ...params,
        type: this.type,
        id: params.id || uuid(),
        label,
        children: params.children || []
      }
      if (params.id) {
        const parent = this.currentNode.parent
        let index = parent.data.children.findIndex(item => {
          return item.id == node.id
        })
        parent.data.children.splice(index, 1, node)
      } else {
        this.currentData.children.push(node)
      }
      this.isEdit = false
      this.$nextTick(() => {
        MyStore.set(this.key, this.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.room-container {
  height: 100%;
  .room-aside {
    border-right: 1px solid #ccc;
  }
  .room-main-header {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }
}
</style>
