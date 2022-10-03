<template>
    <div class="grid overflow-auto md:text-ellipsis w-full gap-3 justify-items-start grid-cols-auto-1fr">
        <p class="font-bold dark:text-white">
            {{header}}
        </p>
        <div class="flex justify-center items-center gap-2">
            <circle class="rounded-xl w-3 h-3 block" :class="[background]"></circle>
            <span class="text-center truncate dark:text-white">{{word}}</span>
        </div>
    </div>
</template>

<script>
    import { langStore } from '../../store/langStore';
    export default {
        computed:{
            background(){
                const value = Number(this.info)
                return value && 'bg-green-400' || !value && 'bg-red-400';
            },
            pageLocales(){
                return `PageProjects`
            },
            word(){
                const value = Number(this.info)
                return value && langStore().getLang[this.pageLocales].Filters.Status.Options[1].name || !value && langStore().getLang[this.pageLocales].Filters.Status.Options[2].name;
            }
        },
        props:{
            header: {
                type : String
            },
            info: {
                type : Number,
                required : true
            }
        }
    }
</script>