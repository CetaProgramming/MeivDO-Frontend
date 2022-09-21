<template>
    <div class="flex items-center">
        <img class=" h-20" :src="langs.users.img" alt="">
        <h1 class="font-bold dark:text-white"> {{langs.users.title}}</h1>
    </div>
</template>

<script>
import { langStore } from "../../store/langStore";

export default {
    computed:{
        langs(){
            return langStore().getLang.ItemMenu
        }
    }
}
</script>

