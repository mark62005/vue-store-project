import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Orders from '../views/Orders.vue';
import Coupons from '../views/Coupons.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'products',
        component: Products,
        meta: { requiresAuth: true },
      },

      {
        path: 'orders',
        name: 'orders',
        component: Orders,
        meta: { requiresAuth: true },
      },

      {
        path: 'coupons',
        name: 'coupons',
        component: Coupons,
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },

  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
});

export default router;
