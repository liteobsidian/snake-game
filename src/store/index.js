import Vue from 'vue'
import Vuex from 'vuex'
import gameStore from 'src/store/game/gameStore'

// import example from './module-example'

// eslint-disable-next-line no-undef
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = new Vuex.Store({
  modules: {
    gameStore
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

export default Store
