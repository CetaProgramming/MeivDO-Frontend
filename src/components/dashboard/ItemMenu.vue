<template>
    <router-link :to="{name:link}">
    <div class="group text-center p-10 md:max-w-sm max-w bg-white rounded-lg border-2 duration-200 font-openSans cursor-pointer
     hover:bg-red-300 hover:border-solid hover:border-red-500 h-fit dark:bg-MeivMatteBlack dark:border-zinc-900 dark:hover:border-red-700 dark:hover:bg-MeivRedDark">
    <div class="flex justify-center">
        <img :src="getUrl" alt="" class="h-14 md:h-20">
    </div>
        <h1 class="pt-4 mb-2 text-xl font-bold text-black dark:text-white">{{title}}</h1>
        <p class="md:text-base text-gray-400 group-hover:text-black pt-2 text-sm dark:group-hover:text-white">{{description}}</p>
    </div>
    </router-link>
</template>

<script>

    export default {
        computed: {
            getUrl(){
                return `${import.meta.env.VITE_API_SOURCE}${this.img}`
            }
        },
        props: ['img', 'title', 'description', 'link']
    }

</script>