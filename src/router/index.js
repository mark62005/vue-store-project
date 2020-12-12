import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Orders from '../views/Orders.vue';
import Coupons from '../views/Coupons.vue';
import CustomerOrders from '../views/CustomerOrders.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/admin',
    name: 'adminDashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
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
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'customer-orders',
        name: 'customer-orders',
        component: CustomerOrders,
      },
    ],
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
