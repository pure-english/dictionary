// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        // path: '/search/:searchQuery',
        path: '/search',
        name: "Word Search",
        component: () => import("@/views/Search.vue"),
      },
      {
        path: "/list",
        name: "Word List",
        component: () => import("@/views/Wordlist.vue"),
      },
      {
        path: '/word/:word',
        name: "Word Definition",
        component: () => import('@/views/Word.vue'),
      },
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: "/editor",
    component: () => import('@/layouts/Editor.vue'),
  },
  // {
  //   path: "/word/:word",
  //   component: import('@/views/Word.vue'),

  // }

  // Catch-all 404 route
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
]

const router = createRouter({
  history: createWebHistory("/dictionary/"),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
