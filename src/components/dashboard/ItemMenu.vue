<template>
    <div class="group text-center p-6 md:max-w-sm max-w bg-white rounded-lg border-2 duration-200 font-openSans cursor-pointer hover:bg-red-300 hover:border-solid hover:border-red-500">
    <div class="flex justify-center">
        <img :src="img" alt="" class="h-14 md:h-20">
    </div>
        <h1 class="pt-4 mb-2 text-xl font-bold text-black">{{title}}</h1>
        <p class="md:text-base text-gray-400 group-hover:text-black pt-2 text-sm">{{description}}</p>
    </div>
</template>

<script>

    export default {
        props: ['img', 'title', 'description']
    }

</script>