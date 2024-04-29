// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Productos from './components/Productos.vue'
import Usuarios from './components/Usuarios.vue'
import Login from './components/Login.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/productos', component: Productos },
  { path: '/usuarios', component: Usuarios }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router