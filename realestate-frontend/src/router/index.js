import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
        {
      path: '/impressum',
      name: 'impressum',
      component: () => import('../views/ImpressumView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
    },
   {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/properties',
      name: 'properties',
      component: () => import('../views/PropertiesView.vue'),
    },
    {
      path: '/property-details',
      name: 'PropertyDetails',
      component: () => import('../views/PropertyDetailsView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: () => import('../views/EditView.vue'),
    }
  ],
})

export default router
