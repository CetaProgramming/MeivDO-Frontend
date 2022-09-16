<template>
    <div class="p-4 bg-zinc-300 rounded-md hidden font-bold min-w-fit justify-start gap-2 lg:grid dark:bg-MeivMatteBlack dark:text-white" :style="style">
        <h2 v-for="item in header" class="text-center">{{item}} </h2>     
    </div>
</template>

<script>
export default {
    props:['header', 'style']
}
</script>


