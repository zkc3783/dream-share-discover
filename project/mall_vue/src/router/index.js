import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {path: '/register', component: () => import('@/views/register/index'),hidden: true},
  {path: '/shopper', component: () => import('@/views/shopper/index'),hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    meta: {title: 'home', icon: 'home'},
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    },
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    // name: 'pms',
    meta: {title: 'Manage Items', icon: 'product'},
    children: [{
      path: 'product',
      // name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: 'Check Items', icon: 'product-list'}
      },
      {
        path: 'addProduct',
        // name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: 'Add Items', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        // name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: 'Update Items', icon: 'product-add'},
        hidden: true
      },
      // {
      //   path: 'productCate',
      //   name: 'productCate',
      //   component: () => import('@/views/pms/productCate/index'),
      //   meta: {title: 'productCate', icon: 'product-cate'}
      // },
      // {
      //   path: 'addProductCate',
      //   name: 'addProductCate',
      //   component: () => import('@/views/pms/productCate/add'),
      //   meta: {title: 'addProductCate'},
      //   hidden: true
      // },
      // {
      //   path: 'updateProductCate',
      //   name: 'updateProductCate',
      //   component: () => import('@/views/pms/productCate/update'),
      //   meta: {title: 'updateProductCate'},
      //   hidden: true
      // },
      // {
      //   path: 'productAttr',
      //   name: 'productAttr',
      //   component: () => import('@/views/pms/productAttr/index'),
      //   meta: {title: 'productAttr', icon: 'product-attr'}
      // },
      // {
      //   path: 'productAttrList',
      //   name: 'productAttrList',
      //   component: () => import('@/views/pms/productAttr/productAttrList'),
      //   meta: {title: 'productAttrList'},
      //   hidden: true
      // },
      // {
      //   path: 'addProductAttr',
      //   name: 'addProductAttr',
      //   component: () => import('@/views/pms/productAttr/addProductAttr'),
      //   meta: {title: 'addProductAttr'},
      //   hidden: true
      // },
      // {
      //   path: 'updateProductAttr',
      //   name: 'updateProductAttr',
      //   component: () => import('@/views/pms/productAttr/updateProductAttr'),
      //   meta: {title: 'updateProductAttr'},
      //   hidden: true
      // },
      // {
      //   path: 'brand',
      //   name: 'brand',
      //   component: () => import('@/views/pms/brand/index'),
      //   meta: {title: 'brand manage', icon: 'product-brand'}
      // },
      // {
      //   path: 'addBrand',
      //   name: 'addBrand',
      //   component: () => import('@/views/pms/brand/add'),
      //   meta: {title: 'addBrand'},
      //   hidden: true
      // },
      // {
      //   path: 'updateBrand',
      //   name: 'updateBrand',
      //   component: () => import('@/views/pms/brand/update'),
      //   meta: {title: 'updateBrand'},
      //   hidden: true
      // }
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    // name: 'ums',
    meta: {title: 'Manage Users', icon: 'ums'},
    children: [
      {
        path: 'admin',
        // name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: 'Customers', icon: 'ums-admin'}
      },
      {
        path: 'role',
        // name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: 'Store Owners', icon: 'ums-role'}
      }
      ,
      // {
      //   path: 'menu',
      //   name: 'menu',
      //   component: () => import('@/views/ums/menu/index'),
      //   meta: {title: 'menu-list', icon: 'ums-menu'}
      // },
      // {
      //   path: 'allocMenu',
      //   name: 'allocMenu',
      //   component: () => import('@/views/ums/role/allocMenu'),
      //   meta: {title: 'allocMenu'},
      //   hidden: true
      // },
      // {
      //   path: 'allocResource',
      //   name: 'allocResource',
      //   component: () => import('@/views/ums/role/allocResource'),
      //   meta: {title: 'allocResource'},
      //   hidden: true
      // },
      // {
      //   path: 'addMenu',
      //   name: 'addMenu',
      //   component: () => import('@/views/ums/menu/add'),
      //   meta: {title: 'addMenu'},
      //   hidden: true
      // },
      // {
      //   path: 'updateMenu',
      //   name: 'updateMenu',
      //   component: () => import('@/views/ums/menu/update'),
      //   meta: {title: 'updateMenu'},
      //   hidden: true
      // },
      // {
      //   path: 'resource',
      //   name: 'resource',
      //   component: () => import('@/views/ums/resource/index'),
      //   meta: {title: 'resource-list', icon: 'ums-resource'}
      // },
      // {
      //   path: 'resourceCategory',
      //   name: 'resourceCategory',
      //   component: () => import('@/views/ums/resource/categoryList'),
      //   meta: {title: 'resourceCategory-list'},
      //   hidden: true
      // }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
