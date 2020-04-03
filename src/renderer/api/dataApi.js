import Store from 'electron-store'
// const RoomStore = 'RoomRecord'
// key room==房间数据   tenant==合同信息  cost===费用信息
// class MyStore extends Store {
//   constructor(setting) {
//     super(setting)
// this.list = []
// }
// save(key) {
//   this.set(key, this.list)
//   return this
// }
// get(key) {
//   return this.get(key) || []
// }
// add(list, key) {
//   this.list = [...this.get(key), ...list]
//   return this.save()
// }
// delete(id, key) {
//   this.list = this.get(key).filter(item => {
//     return item.id != id
//   })
//   return this.save()
// }
// }
const myStore = new Store()
export default {
  get(key) {
    return myStore.get(key)
  },
  set(key, value) {
    myStore.set(key, value)
    return this.get(key)
  }
}
