import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 定义一个函数用来从localStorage中获取globalVariable的值
function getGlobalVariableFromLocalStorage() {
  // 检查localStorage中是否有globalVariable
  if (localStorage.getItem('globalVariable')) {
      // 如果有，返回localStorage中的值
      return parseInt(localStorage.getItem('globalVariable'));
  } else {
      // 如果没有，返回默认值2
      return 0;
  }
}

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    globalVariable:getGlobalVariableFromLocalStorage()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_GLOBALVARIABLE: (state,someValue) => {
      state.globalVariable = someValue
      localStorage.setItem('globalVariable',someValue);
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      debugger
      const usernamess = 'admin'
      const passwordss = 'macro123'
      //username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(usernamess, passwordss).then(response => {
          let localtoken = require('@/public/logintoken.json')
          const data = localtoken.data
          const tokenStr = data.tokenHead+data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          let globalData = state.globalVariable
          debugger
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          debugger
          resolve(response)//then can get the response
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
