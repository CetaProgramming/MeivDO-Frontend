<template>
    <div class="grid grid-cols-1 auto-rows-max  bg-MeivAsh gap-4 p-16 md:grid-cols-2 lg:grid-cols-4 dark:bg-zinc-900">
        <ItemMenu v-for="item in langs" :img="item.img" :title="item.title" :description="item.description"/>
    </div>
</template>

<script>
 import ItemMenu from "./ItemMenu.vue";
 import { computed } from 'vue';
 import { langStore } from "../../store/langStore";
    export default {
       setup (){
        
        const store = langStore();

        const langs = computed(() => store.getLang.ItemMenu);
         
        console.log(langs)

        return {
            langs
        }
       },
        components: { 
            ItemMenu
        }
    }
</script>