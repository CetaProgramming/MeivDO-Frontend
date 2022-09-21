<template>
    <div class="flex flex-col justify-center items-center">
        <img class="dropdown w-28 h-28 md:w-32 md:h-32 rounded-full object-top object-cover" alt="foto" />
        <Button class=" p-3  dark:bg-zinc-800" :text="btnTitle" bg="bg-black"/>
    </div>
    
</template>

<script>
import Button from '../widgets/Button.vue';
export default {
    props:['btnTitle'],
    setup() {
        return {};
    },
    components: { Button }
}
</script>

