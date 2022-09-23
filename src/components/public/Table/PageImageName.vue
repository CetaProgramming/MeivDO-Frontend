<template>
    <div class="flex items-center gap-3">
        <img class=" h-20" :src=img alt="">
        <h1 class="font-bold dark:text-white"> {{title}}</h1>
    </div>
</template>

<script>

export default {
    props:[
        'title',
        'img'
    ]
}
</script>

