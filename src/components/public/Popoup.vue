<template>
    <div id="popUp"
        class="absolute left-0 md:fixed bg-black text-black backdrop-blur-md bg-opacity-30 flex justify-center items-center min-h-screen top-0 w-full dark:bg-opacity-70">
        <div
            class="md:w-3/5 block overflow-auto w-full min-h-screen md:min-h-fit bg-white rounded-md  h-screen md:h-fit  dark:bg-black dark:text-white">
            <div class="p-10 flex flex-col gap-4 ">
                <div class="flex justify-between ">
                    <h1 class="text-2xl">{{ titlePopUp }}</h1>
                    <button class="text-3xl" @click="closePopUp">X</button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { langStore } from '../../store/langStore';
import { useDark, useToggle } from '@vueuse/core'


export default {
    setup() {
        const store = langStore();
        const isDark = useDark()
        const toggleDark = useToggle(isDark)

        const langs = computed(() => store.getLang.StandartProfile);

        return {
            langs, toggleDark, isDark
        }
    },
    created() {
        window.addEventListener("resize", this.resizingPopUp);
    },
    mounted() {
        document.body.classList.add("overflow-hidden")
        this.resizingPopUp
    },
    unmounted() {
        document.body.classList.remove("overflow-hidden")
    },
    props: {
        titlePopUp: String
    },
    methods: {
        closePopUp() {
            this.$emit("closePopUp")
        },
        resizingPopUp() {
            this.$el.childNodes[0].style.height = this.$el.childNodes[0].clientHeight > window.innerHeight ?
                `${window.innerHeight}px` :
                "auto";
        }
    },
    emits: ["closePopUp"]

}
</script>
