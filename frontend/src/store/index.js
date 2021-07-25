import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: '',
    password: ''
  },
  mutations: {
    setLoginParam(state, param) {
      state.isLogin = true;
      state.userId = param.userId;
      state.password = param.password;
    },
    setLogoutParam(state) {
      state.isLogin = false;
      state.userId = '';
      state.password = '';
    }
  },
  getters: {
    getIsLogin: (state) => state.isLogin
  },
  // 外部への通信(サーバサイド)はactionに集約させる
  actions: {
    login({ commit }, { userId, password }) {
      const param = {
        userId: userId,
        password: password
      }
        axios.post('http://localhost:3000/login', param).then(
          loginResult => {
            if (loginResult.data === 'OK') {
              // 認証に成功した場合
              console.log('login success');
              commit('setLoginParam', param);
            }
            else {
              alert('処理に失敗しました。')
            }
          })
          .catch( err => {
            alert('処理に失敗しました。')
            console.log(err)
          }
          )
      },
    logout({ commit }) {
      commit('setLogoutParam');
    }
  },
  plugins:[createPersistedState({
    key: "isLogin",

    paths: ["isLogin"],

    /*
    window.localStrage   -> 意図的に消さない限りずっと残る
    window.sessionStrage -> セッションが切れたらorタブやブラウザを閉じたらリセット
    Cookie               -> 期限を任意に設定できる&容量が小さい(4KB)& HTTP/HTTPSでサーバーに送信される
    */
    storage: window.sessionStorage,

  })]
})
