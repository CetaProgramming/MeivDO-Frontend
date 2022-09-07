import { createRouter, createWebHistory } from 'vue-router'
import { userLogin } from "./store/userLogin"

function laziLoad(view){
     return () => import(`./components/${view}.vue`)
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
    path: '/projects',
    name: 'projects',
    component: laziLoad('ProjectComponent')
},
{
    path: '/inspections',
    name: 'inspections',
    component: laziLoad('InspectionComponent')
},
{
    path: '/tools',
    name: 'tools',
    component: laziLoad('ToolComponent')
},
{
    path: '/projects',
    name: 'projects',
    component: laziLoad('ProjectComponent')
},
{
    path: '/users',
    name: 'users',
    component: laziLoad('UserComponent')
},
{
    path: '/reparations',
    name: 'reparations',
    component: laziLoad('ReparationComponent')
},
{
    path: "/:pathMatch(.*)*",
    component: laziLoad('NotFound')
},

];

const router = createRouter({ history: createWebHistory(), routes});

router.beforeEach(async (to) => {
    const userLoginStore = userLogin();
    try {
        await userLoginStore.acessUser();
        if ((userLoginStore.email) && to.name !== 'login' && to.name !== 'dashboard' && !userLoginStore.isAllowed(to.name)) 
        return { name: 'dashboard' }  
        if ((userLoginStore.email) && to.name === 'login') 
            return { name: 'dashboard' }
        if (!userLoginStore.email && to.name !== 'login') 
             return { name: 'login' }      
    } catch (error) {
        userLoginStore.deleteSession();
        return { name: 'login' }
    }
})

export default router;