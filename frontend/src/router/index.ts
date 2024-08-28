import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudanteView from '../views/Estudantes/View.vue'
import EstudanteCriar from '../views/Estudantes/Criar.vue'
import EstudanteEditar from '../views/Estudantes/Editar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/estudantes',
      name: 'estudantes',
      component: EstudanteView
    },
    {
      path: '/estudantes/criar',
      name: 'estudantesCriar',
      component: EstudanteCriar
    },
    {
      path: '/estudantes/:id/editar',
      name: 'estudantesEditar',
      component: EstudanteEditar
    }
  ]
})

export default router;