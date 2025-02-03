// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../components/Auth.vue';
import { Auth as AmplifyAuth } from 'aws-amplify';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
      next();
    } catch (error) {
      next({ name: 'Auth' }); // redirect to the auth page if not signed in
    }
  } else {
    next();
  }
});

export default router;
