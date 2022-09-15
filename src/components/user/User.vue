<template>
    <div class="bg-MeivAsh  h-screen font-openSans  ">
        <div class="p-16">
            <HeaderUser></HeaderUser>
            <MenuUsers></MenuUsers>

            <div class="flex flex-col">
                <TableUserHeader  :Items=langsUser.UserHeader />
                <UserTable />

            </div>
            <Paginate />

        </div>
    </div>
</template>

<script>

import { computed } from 'vue';
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin"
import { useToggle } from '@vueuse/shared';
import HeaderUser from './HeaderUser.vue';
import MenuUsers from './MenuUsers.vue';
import TableUserHeader from './TableUserHeader.vue';
import UserTable from './UserTable.vue';
import Paginate from './Paginate.vue';


export default {

    setup() {
        const store = langStore();
        const user = userLogin();
        const langs = computed(() => store.getLang.ItemMenu);
        const langsUser = computed(() => store.getLang.UserFeature);
       
        const menuItems = computed(() => user.role && user.role.permissions.map(permission => permission.feature));
        return {
            langs, menuItems, langsUser
        }
    }
    ,
    components: {
        HeaderUser,
        MenuUsers,
        UserTable,
        Paginate,
        TableUserHeader
    },
    
}
</script>