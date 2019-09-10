import Vue from 'vue'
import vueBulmaComponents from 'vue-bulma-components'
import './fontAwesome'
import VueCompositionApi from '@vue/composition-api'
import { ThemeProvider } from 'vue-styled-components'

import App from './App'
import router from '@/router'
import store from '@/store'

import { GamepadManager } from '@/utils/gamepad/GamepadManager'
import { DefaultInputHandler } from '@/utils/gamepad/InputHandler'

export const gamepadManagerInstance = new GamepadManager(
  new DefaultInputHandler()
)
gamepadManagerInstance.start()

Vue.config.productionTip = false

Vue.use(VueCompositionApi)
Vue.use(vueBulmaComponents)

new Vue({
  router,
  store,
  components: {
    'theme-provider': ThemeProvider,
  },
  render: h => h(App),
}).$mount('#app')