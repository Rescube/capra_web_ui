import Vue from 'vue'
import Router from 'vue-router'
import Teleop from '@/components/Teleop'
import Victim from '@/components/Victim'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'teleop',
      component: Teleop
    },
    {
      path: '/teleop',
      name: 'teleop',
      component: Teleop
    },
    {
      path: '/victim',
      name: 'victim',
      component: Victim
    }
  ]
})