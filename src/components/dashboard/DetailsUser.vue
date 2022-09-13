<template>
   <div class="justify-center flex  flex-col items-center mt-24 md:mt-4  gap-2 font-openSans">
        <h1 class="text-4xl">{{langs.HeadingMenu}}
                <span class="text-red-500 ">{{name}}</span>
        </h1>
        <h1 class="text-2xl">
            {{langs.HeadingMenu2}}
        </h1>
        <Input type="text" @input="filterItemMenu" class="w-full p-2 rounded-md sm:w-3/5" background="dark:bg-MeivMatteBlack " :placeholder="langs.SearchFeat"/>
    </div>
</template>

<script>
    import Input from '../widgets/Input.vue';
    import { computed } from 'vue';
    import { langStore } from '../../store/langStore';
    import { useDark, useToggle } from '@vueuse/core'
    import { userLogin } from '../../store/userLogin';
    export default {
        setup() {
            const store = langStore();
            const isDark = useDark()
            const toggleDark = useToggle(isDark)
            const {name} = userLogin();

            const langs = computed(() => store.getLang.MenuDashboard);

            return {
                langs, toggleDark, isDark, name
            }
    },
    methods: {
        filterItemMenu(event) {
            this.emitter.emit("filterItemMenu", event.target.value)
        }
    },
    components: {
        Input
    }
    }
</script>

<style lang="scss" scoped>

</style>