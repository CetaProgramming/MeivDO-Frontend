<template>
    <Popoup titlePopUp="Change Password">
        <div class="font-openSans  flex flex-col items-center">
            <div class="flex gap-20 justify-between w-2/4  mt-4 mb-10">
                <h1>{{ langs.DarkMode }}</h1>
                <DarkModeSwitch @toggle="toggleDark()" />
            </div>
            <!-- <div class="flex justify-around mb-10 ">
                <h1>{{ langs.Zoom }}</h1>
                <div class="flex items-center gap-2">
                    <button class="bg-gray-400 p-4 text-sm">-</button>
                    <h1 class="bg-gray-200 p-3 dark:bg-red-300">1.10</h1>
                    <button class="bg-gray-400 p-4 text-sm">+</button>
                </div>
            </div> -->
            <div class="flex gap-20 justify-between w-2/4 ">
                <h1>{{ langs.Language }}</h1>
                <SelectLanguague class="bg-gray-200" @languagueChangedEvent="languageChanged" />
            </div>
        </div>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { computed } from 'vue';
import { langStore } from '../../../store/langStore';
import SelectLanguague from '../.././public/Languague.vue';
import DarkModeSwitch from "../DarkModeSwitch.vue"
import { useDark, useToggle } from '@vueuse/core'



export default {
    props: ['mode'],
    setup() {
        const store = langStore();
        const isDark = useDark()
        const toggleDark = useToggle(isDark)
        const langs = computed(() => store.getLang.PopupSettings);

        return {
            langs, toggleDark, isDark

        }
    },
    components: {
        Popoup,
        SelectLanguague,
        DarkModeSwitch,
    },
}
</script>

<style lang="scss" scoped>
</style>