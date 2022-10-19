<template>
    <div>
        <div class="bg-image p-4 text-white "> 
            <Header/>
        </div>
            <InspectionMain />
    </div>
   
</template>

<script>
import MenuDashboard from './dashboard/MenuDashboard.vue';
import InspectionMain from './inspection/InspectionMain.vue';
import Header from './dashboard/Header.vue';

export default {

    components: {
    InspectionMain,
    MenuDashboard,
    Header
}
}
</script>