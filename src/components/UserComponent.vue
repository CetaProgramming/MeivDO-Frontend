<template>
    <div>
        <div class="bg-image p-4 text-white "> 
            <Header/>
        </div>
            <UserMain />
    </div>
   
</template>

<script>
import MenuDashboard from './dashboard/MenuDashboard.vue';
import UserMain from './user/UserMain.vue';
import Header from './dashboard/Header.vue';

export default {

    components: {
    UserMain,
    MenuDashboard,
    Header
}
}
</script>

