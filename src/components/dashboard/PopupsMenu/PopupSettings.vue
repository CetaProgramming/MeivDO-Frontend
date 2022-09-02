<template>
   <Popoup titlePopUp="Change Password">
    <div class="font-openSans">
       <div class="flex justify-around mt-4 mb-10">
        <h1>{{langs.DarkMode}}</h1>
        <button>But</button>
       </div>
       <div class="flex justify-around mb-10 ">
        <h1>{{langs.Zoom}}</h1>
        <div class="flex items-center gap-2" >
             <button class="bg-gray-400 p-4 text-sm">-</button>
             <h1 class="bg-gray-200 p-3">1.10</h1>
             <button class="bg-gray-400 p-4 text-sm">+</button>
        </div>
       
       </div>
       <div class="flex justify-around ">
        <h1>{{langs.Language}}</h1>
        <SelectLanguague class="bg-gray-200" @languagueChangedEvent="languageChanged"/>
       </div>
    </div>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { computed } from 'vue';
import { langStore } from '../../../store/langStore';
import SelectLanguague from '../.././public/Languague.vue';

export default {
    setup() {
        const store = langStore();

        const langs = computed(() => store.getLang.PopupSettings);

        return {
            langs
        }
    },
    components: {
        Popoup,
        SelectLanguague
    },
}
</script>

<style lang="scss" scoped>

</style>