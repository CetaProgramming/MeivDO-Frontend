<template>
    {{ FilterUser.Name }}
    <form class="bg-white items  grid md:grid-cols-1fr-auto-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white" @submit.prevent="doSearch">
        <InputSearch v-model="FilterUser.Name" :name="langs.Keyword"/>
        <SelectLabel v-model="FilterUser.Active" :name="langs.Status.Text" :items="langs.Status.Options"/>
        <div class="flex flex-col gap-3">
            <Button text="Submit" pad="pad-1" space="normal" />
            <Button text="Reset" pad="pad-1" space="normal" />
        </div>
    </form>
</template>

<script>
import DarkModeSwitch from '../dashboard/DarkModeSwitch.vue';
import Button from '../widgets/Button.vue';
import { langStore } from '../../store/langStore';
import { usersStore } from '../../store/usersStore';
import SelectLabel from '../forms/SelectLabel.vue';
import InputSearch from '../forms/InputSearch.vue';
    
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
            return langStore().getLang.Filters.Users;
        }
    },
    methods: {
        async doSearch(){
            await usersStore().doSearch(this.FilterUser);
        }
    },
    components: { DarkModeSwitch, Button, SelectLabel, InputSearch }
}
</script>

