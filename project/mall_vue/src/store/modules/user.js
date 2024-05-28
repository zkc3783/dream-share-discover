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

function getNameFromLocalStorage() {
  // 检查localStorage中是否有name
  if (localStorage.getItem('name')) {
    // 如果有，返回localStorage中的值
    return localStorage.getItem('name');
  } else {
    // 如果没有，返回默认值
    return '';
  }
}

function geteditUserFromLocalStorage() {
  // 检查localStorage中是否有name
  if (localStorage.getItem('editUser')) {
    // 如果有，返回localStorage中的值
    return localStorage.getItem('editUser');
  } else {
    // 如果没有，返回默认值
    return '';
  }
}

const user = {
  state: {
    token: getToken(),
    name: getNameFromLocalStorage(),
    avatar: '',
    roles: [],
    globalVariable:getGlobalVariableFromLocalStorage(),
    editUser:  geteditUserFromLocalStorage(),  
    globalURL: 'http://13.79.99.190/api'//set global URL http://127.0.0.1:3000 globalURL
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      localStorage.setItem('name', name);
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
    },
    SET_EDIT_USER: (state, editUser) => {
      state.editUser = editUser
      localStorage.setItem('editUser', editUser);
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      debugger
      const usernamess = 'admin'
      const passwordss = 'macro123'
      const nowusername = userInfo.username.trim()
      commit('SET_NAME', nowusername)
      debugger
      return new Promise((resolve, reject) => {
        login(usernamess, passwordss).then(response => {
          // let localtoken = require('@/public/logintoken.json')
          let localtoken = response
          const data = localtoken.data
          const tokenStr = data.tokenHead+data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          debugger
          reject(error)
        })
      })
    },

/* login(usernamess, passwordss).then(response => {
  // 这个函数会在 login 成功时调用
  handleSuccess(response);
}).catch(error => {
  // 这个函数会在 login 失败时调用
  // 在这里，我们返回一个默认的成功响应
  handleSuccess({ status: 'success', message: 'Default success response' });
});

function handleSuccess(response) {
  let localtoken = require('@/public/logintoken.json')
  const data = localtoken.data
  const tokenStr = data.tokenHead+data.token
  setToken(tokenStr)
  commit('SET_TOKEN', tokenStr)
  resolve()
  在这个示例中，无论 login 函数是否真的成功，handleSuccess 函数都会被调用，因此它会看起来像是始终成功。
} */

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
          //commit('SET_NAME', data.username)
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
