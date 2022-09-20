<template>
    <div class="grid grid-cols-1 auto-rows-max  bg-MeivAsh gap-4 p-16 md:grid-cols-2 lg:grid-cols-4 dark:bg-zinc-900">
        <ItemMenu v-if="(inputedText && itemsSelector.length) || !inputedText "
            v-for="item in (itemsSelector.length && itemsSelector || menuItems  )" :img="langs[item].img"
            :title="langs[item].title" :description="langs[item].description" :link="langs[item].link" />
        <h1 class="font-openSans col-start-1 col-end-5 text-center dark:text-white " v-else>{{langs.noItemFound}} <span
                class="text-red-600  ">{{inputedText}}</span> </h1>
    </div>

</template>

<script>
import ItemMenu from "./ItemMenu.vue";
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin"


export default {
    data() {
        return {
            inputedText: '',
            itemsSelector: []
        }
    },
    computed: {
        langs(){
            return langStore().getLang.ItemMenu;
        },
        menuItems(){
            return userLogin().role && userLogin().role.permissions.map(permission => permission.feature);
        },
    },
    components: {
        ItemMenu
    },
    mounted() {
        this.emitter.on("filterItemMenu", inputValue => {
            this.inputedText = inputValue
            this.itemsSelector = this.menuItems.filter(item => this.langs[item].title.toLowerCase().includes(inputValue.toLowerCase()))
        });
    },

    beforeUnmount() {  
             this.emitter.off('filterItemMenu') 
         },

    }

</script>