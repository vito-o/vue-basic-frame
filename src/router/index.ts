import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('../views/goods/index.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('../views/user/index.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;