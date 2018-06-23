import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import question from './modules/question'
import task from "./modules/task";
import bashboard from "./modules/bashboard";

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    question,
    task,
    bashboard
  },
  getters
});

export default store
