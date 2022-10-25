<template>
    <form class="bg-white items  grid md:grid-cols-1fr-auto-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white" @submit.prevent="doSearch">
        <InputSearch ref="inputSearch" v-model="FilterUser.Name" :name="langs.Keyword"/>
        <SelectLabel ref="selectLabel" v-model="FilterUser.Active" :name="langs.Status.Text" :items="langs.Status.Options"/>
        <div class="flex gap-3">
            <ButtonIcon icon="fa-solid fa-magnifying-glass" text="" pad="p-3" bg="bg-blue-600" space="normal" />
            <ButtonIcon icon="fa-solid fa-trash" @click.stop.prevent="resetValues" text="" pad="p-3"  space="normal" />
        </div>
    </form>
</template>

<script>
import DarkModeSwitch from '../dashboard/DarkModeSwitch.vue';
import { langStore } from '../../store/langStore';
import { usersStore } from '../../store/usersStore';
import SelectLabel from '../forms/SelectLabel.vue';
import InputSearch from '../forms/InputSearch.vue';
import ButtonIcon from '../widgets/ButtonIcon.vue';
    
export default {
    data(){
        return {
            FilterUser: {
                Name: '',
                Active: ''
            }
        }
    },
    computed: {
        langs(){
            return langStore().getLang.PageUsers.Filters.Users;
        }
    },
    methods: {
        async doSearch(){
            await usersStore().doSearch(this.FilterUser);
        },
        async resetValues(){
            this.FilterUser.Name = "";
            this.FilterUser.Active = "";
            this.$refs['inputSearch'].resetValues();
            this.$refs['selectLabel'].resetValues();
            await usersStore().doSearch(this.FilterUser, true);
        }
    },
    components: { DarkModeSwitch, SelectLabel, InputSearch, ButtonIcon }
}
</script>

