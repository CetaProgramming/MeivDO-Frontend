<template>
    <div
        class="absolute  md:fixed bg-black backdrop-blur-md bg-opacity-30 flex justify-center items-center min-h-screen top-0 w-full ">
        <div class="md:w-3/5 block overflow-scroll w-full min-h-screen md:min-h-fit  bg-white rounded-md  h-screen">
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

        const langs = computed(() => store.getLang.StandartProfile);

        return {
            langs
        }
    },
    mounted() {
        document.body.classList.add("overflow-hidden")
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
        }
    },
    emits: ["closePopUp"]

}
</script>
