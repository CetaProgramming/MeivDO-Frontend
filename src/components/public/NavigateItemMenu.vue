<template>
    <div class="flex gap-2 bg-white p-1 rounded-md items-center dark:bg-zinc-900 dark:text-white">
        <p>{{langsUser.View}}</p>
        <select name="features" id="features" v-model="inputedText" @click="optionSelected($event)" class="capitalize bg-gray-300 rounded-md p-1 hover:cursor-pointer dark:bg-zinc-800">
            <option disabled hidden select>{{ $route.name }}</option>
            <option value="dashboard">Dashboard</option>
            <option v-for="item in itemsMenuRoutes()" :value="langs[item].title.toLowerCase()" :key="langs[item].title.toLowerCase()">
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
            inputedText: this.$route.name
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
        optionSelected(){
            try {
                if(this.inputedText)
                    this.$router.push({ name: this.inputedText});
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
