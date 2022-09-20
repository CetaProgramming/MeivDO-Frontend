<template>
    <div class="flex gap-2 bg-white p-1 rounded-md items-center dark:bg-MeivMatteBlack dark:text-white">
        <p>{{langsUser.View}}</p>
        <select name="features" id="features" class="bg-gray-300 rounded-md p-1 hover:cursor-pointer dark:bg-zinc-800">
            <option  v-for="item in (itemsSelector.length && itemsSelector || menuItems  )" :value="item">
                {{ langs[item].title }}
            </option>
        </select>
    </div>
</template>

<script>
import ItemMenu from '../dashboard/ItemMenu.vue';
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
            return langStore().getLang.ItemMenu
        },
        langsUser(){
            return langStore().getLang.UserFeature
        },
        menuItems(){
            return userLogin().role && userLogin().role.permissions.map(permission => permission.feature)
        }
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
        this.emitter.off('filterItemMenu');
    },

}

</script>
