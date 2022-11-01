import { createRouter, createWebHashHistory } from 'vue-router'
import { userLogin } from "./store/userLogin"

function laziLoad(view){
     return () => import(`./components/${view}.vue`)
}
const routes = [
    {
    path: '/',
    name: 'login',
    component: laziLoad('Login'),
    meta: { requiresAuth: false }
},
{
    path: '/dashboard',
    name: 'dashboard',
    component: laziLoad('Dashboard'),
    meta: { requiresAuth: true }
},
{
    path: '/projects',
    name: 'projects',
    component: laziLoad('ProjectComponent'),
    meta: { requiresAuth: true }
},
{
    path: '/inspections',
    name: 'inspections',
    component: laziLoad('InspectionComponent'),
    meta: { requiresAuth: true }
},
{
    path: '/tools',
    name: 'tools',
    component: laziLoad('ToolComponent'),
    meta: { requiresAuth: true }
},
{
    path: '/projects',
    name: 'projects',
    component: laziLoad('ProjectComponent'),
    meta: { requiresAuth: true }
},
{
    path: '/users',
    name: 'users',
    component: laziLoad('UserComponent'),
    meta: { requiresAuth: true }
},

{
    path: '/repairs',
    name: 'repairs',
    component: laziLoad('RepairsComponent'),
    meta: { requiresAuth: true }
},
{
    path: "/:pathMatch(.*)*",
    component: laziLoad('NotFound')
},

];

const router = createRouter({ history: createWebHashHistory(), routes});

router.beforeEach(async (to, from) => {
    const userLoginStore = userLogin();
    try {
        if(to.meta.requiresAuth && !userLoginStore.email && !await userLoginStore.acessUser()){
            return { name: 'login' }        
        }
        if(!to.meta.requiresAuth && userLoginStore.email){
            return { name: from.name}
        }
    } catch (error) {
        userLoginStore.deleteSession();
        return { name: 'login' }
    }
})

export default router;
