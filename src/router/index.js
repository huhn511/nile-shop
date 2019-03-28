import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/home', component: () => import('@/views/home/index'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop',
    name: 'Shop',
    children: [
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/shop/index'),
        meta: { title: 'Shop', icon: 'shop' }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    redirect: '/products/index',
    name: 'Products',
    meta: { title: 'Products', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'List',
        component: () => import('@/views/products/index'),
        meta: { title: 'List', icon: 'list' }
      },
      {
        path: 'new',
        name: 'New Product',
        component: () => import('@/views/products/new/index'),
        meta: { title: 'New Product', icon: 'add' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/products/edit/index'),
        name: 'Edit Product',
        meta: { title: 'Edit Product', noCache: true },
        hidden: true
      },
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/index',
    name: 'Orders',
    meta: { title: 'Orders', icon: 'box' },
    children: [{
      path: 'index',
      name: 'List',
      component: () => import('@/views/orders/index'),
      meta: { title: 'Order List', icon: 'list' }
    }, 
    {
      path: 'requests',
      name: 'Requests',
      component: () => import('@/views/orders/requests/index'),
      meta: { title: 'Order Requests', icon: 'checklist' }
    },
    {
      path: 'new',
      name: 'New Order',
      component: () => import('@/views/orders/new/index'),
      meta: { title: 'New Order', icon: 'add' }
    },
    {
      path: 'details/:id(\\d+)',
      component: () => import('@/views/orders/details/index'),
      name: 'OrderDetails',
      meta: { title: 'Order details', noCache: true },
      hidden: true,
      props: true
    },
    ]
  },
  {
    path: '/viewer',
    component: Layout,
    redirect: '/viewer',
    name: 'Viewer',
    meta: { title: 'Viewer', icon: 'eye-open' },
    children: [
      {
        path: '/viewer/',
        component: () => import('@/views/viewer/index'),
        meta: { title: 'Viewer', noCache: true },
      },
      {
        path: '/viewer/:root',
        component: () => import('@/views/viewer/index'),
        meta: { title: 'Viewer', noCache: true },
        hidden: true
      },
    ]
  },
  {
    path: 'Website',
    component: Layout,
    children: [
      {
        path: 'https://nile.shopping',
        meta: { title: 'Website', icon: 'link' }
      }
    ]
  },
  {
    path: 'Community',
    component: Layout,
    children: [
      {
        path: 'https://nile.community',
        meta: { title: 'Community', icon: 'link' }
      }
    ]
  },
  {
    path: 'Github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/huhn511/nile-shop',
        meta: { title: 'Github', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, component: Layout }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
