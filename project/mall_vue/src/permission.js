import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

let globalData = null;

const whiteList = ['/login','/register'] // 不重定向白名单 
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path ==='/shopper'){
    store.commit('SET_GLOBALVARIABLE', 0)
    next({ path: '/' })
    NProgress.done()
  }
  else if (to.path === '/manager') {
    store.commit('SET_GLOBALVARIABLE', 1)
    next({ path: '/' })
    NProgress.done()
  }
  else if (getToken()) {
    if (to.path === '/login'&&from.path === '/register') 
    {
      next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } 
    else if (to.path === '/login') 
      {
        next({ path: '/' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } 
    else 
    {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let test=store.getters.globalVariable
          debugger
          if (store.getters.globalVariable === 1)
            {
              globalData = require('@/public/admin_menu.json');
            }
          else
            {
              globalData = require('@/public/mall_menu.json');
            }
          let menus=globalData.menus;
          let username=globalData.username;
          //store.commit('SET_NAME', username)
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  }
  else if(to.path === '/register') {
      if (getToken()) {
        next('/')
      } else {
        next()
      }
  } 
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
