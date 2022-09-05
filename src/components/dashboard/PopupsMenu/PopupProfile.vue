<template>
    <Popoup :titlePopUp="langs.Title1">
        <div class="font-openSans grid grid-cols-1 md:grid-cols-1fr-auto md:justify-between  md:flex-row ">
            <div class="flex flex-col gap-2 ">
                <h1 class="font-bold">{{langs.Name}}</h1>
                <!-- necessário ir a base de dados buscar os dados de utilizador -->
                <input class=" w-4/5 p-3 rounded-md text-black text-sm bg-gray-300 pl-2 placeholder-black dark:placeholder-white dark:text-white dark:bg-zinc-800" type="text" v-model="input" placeholder="Bruno Costa" />
                <h1 class="font-bold">Email</h1>
                <h2 class="ml-4">email@email.com</h2>
                <h1 class="font-bold">{{langs.Role}}</h1>
                <h2 class="ml-4">Administrator</h2>
            </div>
            <div class="mt-10">
                <img class="dropdown mr-6" @click="isMenuClicked = !isMenuClicked" src="" alt="f" />
                <button class="bg-black text-white p-1 rounded-lg mt-2 dark:bg-zinc-800">{{langs.Picture}}</button>
            </div>

        </div>
        <button class="bg-red-500 text-white rounded-md p-2 w-full mt-4  items-center">{{langs.SaveProf}}</button>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { computed } from 'vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core'


export default {
    props: ['mode'],
    setup() {
        const store = langStore();

        const isDark= useDark()
        const toggleDark = useToggle(isDark)

        const langs = computed(() => store.getLang.PopupProfile);

        return {
            langs,toggleDark,isDark
        }
    },
    components: {
        Popoup
    }
}
</script>
