<template>
    <div class="bg-white items  grid md:grid-cols-1fr-auto-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white">
        <div>
            <p class="mb-2 text-center">{{langs.Keywords}}</p>
            <div class="flex bg-zinc-300 p-1 rounded-md dark:bg-zinc-800 relative items-center">
                <fas class="" icon="fa-solid fa-search" />
                <input class=" indent-2 bg-zinc-300 w-full outline-0 dark:bg-zinc-800" type="text" >
            </div>
        </div>
        <div class=" ">
            <p class="mb-2 text-center dark:text-white">{{langs.Category}}</p>
            <select id="status" class="bg-zinc-300 p-1 rounded-md hover:cursor-pointer w-full dark:bg-zinc-800">
                <option value="" disabled selected hidden>{{langs.SelectOpion}}</option>
                <option value="active">Active</option>
                <option value="disabled">disabled</option>
            </select>
        </div>
    </div>
</template>

<script>
    import { langStore } from '../../../store/langStore';

export default {
    setup () {
        

        return {}
    },
    computed: {
        langs() {
            return langStore().getLang.Tool
        }
    },
}
</script>
