<template>
    <div>
        <div class="bg-image p-4 text-white ">
      <Header/>
        </div>
        <userVue></userVue>
    </div>
</template>

<script>
import MenuDashboard from './dashboard/MenuDashboard.vue';

import userVue from './user/user.vue';
import Header from './dashboard/Header.vue';

export default {

    components: {
    userVue,
    MenuDashboard,
    Header
}
}
</script>

