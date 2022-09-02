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
    path: "/:pathMatch(.*)*",
    component: laziLoad('NotFound')
},

];

const router = createRouter({ history: createWebHistory(), routes});

router.beforeEach(async (to, from) => {
    const userLoginStore = userLogin();
    try {
        await userLoginStore.acessUser();
        if ((userLoginStore.email) && to.name === 'login') 
            return { name: 'dashboard' }
        if (!userLogin().email && to.name !== 'login') 
             return { name: 'login' }    
    } catch (error) {
        userLoginStore.deleteSession();
        return { name: 'login' }
    }
})

export default router;