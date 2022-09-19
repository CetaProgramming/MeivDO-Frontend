<template>
    <div class="flex items-center ">
        <img class=" h-20" :src="langs.users.img" alt="">
        <h1 class="font-bold dark:text-white"> {{langs.users.title}}</h1>
    </div>
</template>

<script>
import { computed } from 'vue';
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin"


export default {
    setup() {
        const store = langStore();
        const user = userLogin();
        const langs = computed(() => store.getLang.ItemMenu);
        const menuItems = computed(() => user.role && user.role.permissions.map(permission => permission.feature));
        return {
            langs, menuItems
        }
    }
}
</script>

