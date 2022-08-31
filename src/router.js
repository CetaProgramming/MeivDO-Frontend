import { createRouter, createWebHistory } from 'vue-router'

function laziLoad(view){
     return import(`./components/${view}.vue`)
}
const routes = [
    {
    path: '/',
    name: 'login',
    component: laziLoad('Login')
},
{
    path: '/dashboard',
    name: 'dashboard',
    component: laziLoad('Dashboard')
},
{
    path: "/:pathMatch(.*)*",
    component: laziLoad('NotFound')
},

];

const router = createRouter({ history: createWebHistory(), routes});

export default router;