<template>
    <div class="flex gap-2 bg-white p-1 rounded-md items-center ">
        <p>{{langsUser.View}}</p>
        <select name="features" id="features" class="bg-gray-300 rounded-md p-1 hover:cursor-pointer">

            <option  v-for="item in (itemsSelector.length && itemsSelector || menuItems  )"  :value="item">
             
                {{ langs[item].title }}
            </option>
        </select>
    </div>
</template>

<script>
import ItemMenu from '../dashboard/ItemMenu.vue';
import { computed } from 'vue';
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin"


export default {
    setup() {

        const store = langStore();
        const user = userLogin();
        const langs = computed(() => store.getLang.ItemMenu);
        const langsUser = computed(() => store.getLang.UserFeature);
        const menuItems = computed(() => user.role && user.role.permissions.map(permission => permission.feature));
        return {
            langs, 
            menuItems,
            langsUser,
        }
    },
    data() {

        return {
            inputedText: '',
            itemsSelector: []
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
