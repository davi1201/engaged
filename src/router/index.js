import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('@/views/characters/characters-list.vue'),
  },
  {
    path: '/characters/:id',
    name: 'Character',
    props: true,
    component: () => import('@/views/characters/character.vue'),
  },
  {
    path: '/episode/:id',
    name: 'Episode',
    props: true,
    component: () => import('@/views/episodes/episode.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
