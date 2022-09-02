<template>
    <div class="absolute bg-black bg-opacity-30 flex justify-center items-center min-h-screen top-0 w-screen">
        <div class="md:w-3/5 w-full min-h-screen md:min-h-fit  bg-white rounded-md " >
            <div class="p-10 flex flex-col gap-4 ">
                <div class="flex justify-between ">
                    <h1 class="text-2xl">{{titlePopUp}}</h1>
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
export default {
    setup() {
        const store = langStore();

        const langs = computed(() => store.getLang.StandartProfile);

        return {
            langs
        }
    },
    props:{
        titlePopUp: String
    },
    methods: {
        closePopUp(){
            this.$emit("closePopUp")
        }
    }, 
    emits: ["closePopUp"]
   
}
</script>
