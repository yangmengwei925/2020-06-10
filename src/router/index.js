import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import( '../views/login/index')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/index',   //重定向
    meta: { title: '首页' },
    component: () => import( '../layout/index'),
    children:[
      {
          path: '/index',  //首页
          name: 'index',
          component: () => import( '../views/home/index')
      },
      {
        path: '/loan-input',  //贷款申请
        name: 'loan-input',
        meta: { title: '贷款申请' },
        component: () => import( '../views/loan-input/index'),
      },
      {
        path: '/input-manager',
        name: 'input-manager',
        meta: { title: '申请管理' },
        component: () => import('../views/input-manager/index'),
      },
      {
        path: '/loan-approve',  //贷款审批
        name: 'loan-approve',
        meta: { title: '贷款审批' },
        component: () => import( '../views/loan-approve/index'),
        children:[
          {
              //path: '/loan-approve/first',  //初审
              path:'first',
              name: 'first',
              meta: { title: '初审' },
              component: () => import( '../views/loan-approve/first')
          },
          {
            //path: '/loan-approve/first',  //终审
            path:'end',
            name: 'end',
            meta: { title: '终审' },
            component: () => import( '../views/loan-approve/end')
        },
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
