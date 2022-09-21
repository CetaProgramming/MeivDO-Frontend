<template>
    <div class="flex gap-2 bg-white p-1 rounded-md items-center dark:bg-MeivMatteBlack dark:text-white">
        <p>{{langsUser.View}}</p>
        <select name="features" id="features" @click="optionSelected($event)" class="bg-gray-300 rounded-md p-1 hover:cursor-pointer dark:bg-zinc-800">
            <option value="dashboard">Dashboard</option>
            <option v-for="item in itemsMenuRoutes()" :value="langs[item].title.toLowerCase()">
                {{ langs[item].title }}
            </option>
        </select>
    </div>
</template>

<script>
import ItemMenu from '../dashboard/ItemMenu.vue';
import { langStore } from "../../store/langStore";
import UserAccess from '../mixins/UserAccess';

export default {
    data() {
        return {
            inputedText: ''
        }
    },
    computed: {
        langs(){
            return langStore().getLang.ItemMenu
        },
        langsUser(){
            return langStore().getLang.UserFeature
        }
    },
    methods: {
        optionSelected(event){
            try {
                const optionSelected = event.target;
                if(optionSelected.tagName?.toLowerCase() === "option")
                    this.$router.push({ name: optionSelected.value});
            } catch (e) {
                console.error('Ups! Something went wrong!');
            }
        },
        itemsMenuRoutes(){
            return this.getAccess().filter(itemMenu => !itemMenu.includes(this.$route.name));
        }
    },
    components: {
        ItemMenu
    },
    mixins: [UserAccess]

}

</script>
