<template>
    <div class="bg-white items  grid md:grid-cols-1fr-auto-auto gap-3 p-5 rounded-md dark:bg-MeivMatteBlack dark:text-white">
        <div>
            <p class="mb-2 text-center">Keywords</p>
            <div class="bg-zinc-300 p-1 rounded-md dark:bg-zinc-800">
                <fas icon="fa-solid fa-search" />
                <input class=" indent-2 bg-zinc-300 md:w-5/6 outline-0 dark:bg-zinc-800" type="text" >
            </div>
        </div>
        <div class=" ">
            <p class="mb-2 text-center dark:text-white">Status</p>
            <select id="status" class="bg-zinc-300 p-1 rounded-md hover:cursor-pointer w-full dark:bg-zinc-800">
                <option value="" disabled selected hidden>Select your option</option>
                <option value="active">Active</option>
                <option value="disabled">disabled</option>
            </select>
        </div>
        <!-- <div>
            <p class="mb-2">More Details</p>
            <DarkModeSwitch/>
        </div> -->
    </div>
</template>

<script>
import DarkModeSwitch from '../dashboard/DarkModeSwitch.vue';
    
export default {
    setup() {
        return {};
    },
    components: { DarkModeSwitch }
}
</script>

