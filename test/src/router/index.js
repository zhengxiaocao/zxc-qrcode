import Vue from 'vue'
import Router from 'vue-router'
import qrcodeParse from '@/components/qrcodeParse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'qrcodeParse',
      component: qrcodeParse
    }
  ]
})
