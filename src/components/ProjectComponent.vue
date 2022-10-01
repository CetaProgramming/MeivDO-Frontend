<template>
    <div>
        <div class="bg-image p-4 text-white "> 
            <Header/>
        </div>
            <ProjectMain />
    </div>
   
</template>

<script>
import MenuDashboard from './dashboard/MenuDashboard.vue';
import ProjectMain from './project/ProjectMain.vue';
import Header from './dashboard/Header.vue';

export default {

    components: {
    ProjectMain,
    MenuDashboard,
    Header
}
}
</script>