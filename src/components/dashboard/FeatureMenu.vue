<template>
    <div class="grid grid-cols-1 auto-rows-max  bg-MeivAsh gap-4 p-16 md:grid-cols-2 lg:grid-cols-4 dark:bg-zinc-900">
        <ItemMenu v-for="item in (itemsSelector.length && itemsSelector || menuItems  )" :img="langs[item].img" :title="langs[item].title"
            :description="langs[item].description" />
    </div>
</template>

<script>
import ItemMenu from "./ItemMenu.vue";
import { computed } from 'vue';
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin"


export default {
    setup() {

        const store = langStore();
        const user = userLogin();
        const langs = computed(() => store.getLang.ItemMenu);
        const menuItems = computed(() => user.role.permissions.map(permission => permission.feature));
        return {
            langs, menuItems
        }
    },
    data() {

        return {
            itemsSelector: []
        }
    },
    components: {
        ItemMenu
    },
    mounted() {
        this.emitter.on("filterItemMenu", inputValue => {
            this.itemsSelector=  this.menuItems.filter(item => item.includes(inputValue.toLowerCase()))
        });
    },
    beforeUnmount() {  
             this.emitter.$off('filterItemMenu') 
         },
    computed:{
        menuItemsFilter(){

        }
    }
}

</script>