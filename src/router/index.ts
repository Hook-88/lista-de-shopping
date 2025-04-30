import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AddShoppingItemView from '@/views/AddShoppingItemView.vue'
import EditShoppingItemView from '@/views/EditShoppingItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shopping-list/add-item',
      name: 'add-shopping-item',
      component: AddShoppingItemView,
    },
    {
      path: '/shopping-list/:itemId/edit',
      name: 'edit-shopping-item',
      component: EditShoppingItemView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
