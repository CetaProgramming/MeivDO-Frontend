<template>
    <div class="grid overflow-auto md:text-ellipsis w-full gap-3 justify-items-start grid-cols-auto-1fr">
        <p class="font-bold dark:text-white">
            {{header}}
        </p>
        <p class="text-center truncate dark:text-white">
            {{info ?? '-'}}
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            header: {
                type : String
            },
            info: {
                type : String
            }
        }
    }
</script>