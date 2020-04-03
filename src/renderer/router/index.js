import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/views/layout'
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'room-page',
    meta: { title: '租赁记录' },
    children: [
      // {
      //   path: 'room-page',
      //   name: 'Room-Page',
      //   component: () => import('@/views/room'),
      //   meta: {
      //     title: '房间列表'
      //   }
      // },
      // {
      //   path: 'tenant-page',
      //   name: 'Tenant-Page',
      //   component: () => import('@/views/tenant'),
      //   meta: {
      //     title: '租赁记录'
      //   }
      // },
      {
        path: 'all-page',
        name: 'All-Page',
        component: () => import('@/views/all'),
        meta: {
          title: '房间记录'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
export const MenuList = routes
export default new Router({
  routes
})
