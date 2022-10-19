<template>
    <div>
        <div class="bg-image p-4 text-white "> 
            <Header/>
        </div>
            <RepairMain />
    </div>
   
</template>

<script>
import MenuDashboard from './dashboard/MenuDashboard.vue';
import RepairMain from './repair/RepairMain.vue';
import Header from './dashboard/Header.vue';

export default {

    components: {
    RepairMain,
    MenuDashboard,
    Header
    }
}
</script>