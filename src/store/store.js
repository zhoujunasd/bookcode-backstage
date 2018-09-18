import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userinfo:{
            username:"",
            nickname:"",
            email:"",
            avatar:"",
            desc:"",
        },
        password:"",
        token:{},
    },
    mutations:{
        CHANGE_USERINFO(state,userinfo){
            state.userinfo = userinfo
        },
        STORE_PASSWORD(state,password){
            state.password = password
        },
        GET_TOKEN(state,token){
            state.token.token = token
        }
    },
    actions:{},
    plugins: [createPersistedState({
        storage: {
          getItem: key => sessionStorage.getItem (key),
          setItem: (key, value) =>
          sessionStorage.setItem(key, value,),
          removeItem: key => sessionStorage.removeItem(key),
        },
      })],
})

export default store