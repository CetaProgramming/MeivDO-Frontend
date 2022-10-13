<template>
    <div class="bg-white dark:bg-MeivMatteBlack dark:text-white font-bold p-4 text-xl flex md:flex-row flex-col gap-7 items-center flex-wrap">
        <h1>{{langsToolOption.name}}</h1>
        <Button v-for="(item, idx) in langsToolOption.items " width='md:w-auto w-full' bg="bg-zinc-400" color="text-black" pad="px-5 py-1 "
            class="hover:bg-blue-400 hover:text-white"  :class="{'bg-blue-400 text-slate-100': item.value == active}" :text=item.name @click="tablePick(idx)"/>
            
    </div>
</template>

<script>
    import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
export default {
    data() {
        return {
            active: 'Tools'
        };
    },
    computed: {
        langsToolOption() {
            return langStore().getLang.PageTool.TableOptions;
        },

    },
    methods: {
        tablePick(idx) {
            this.active = this.langsToolOption.items[idx].value
            this.$emit("tableChange", this.langsToolOption.items[idx].value);
        }
    },
    components: { Button }
}
</script>
