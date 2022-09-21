<template>
    <div v-if="pag.lastPage != 1" class=" justify-end bottom-0 right-4 flex" >
        <div class="bg-white flex gap-5  p-3 rounded-md dark:bg-MeivMatteBlack" >
            <div class="pagination items-center flex gap-2 dark:text-white" @click="changePage">
                <a v-if="pag.actualPage != 1" :key="1" class="px-2 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black">&laquo;</a>
                <a v-for="index in numberPage" :key="index" class="px-2 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black" :class="index == pag.actualPage && 'dark:bg-zinc-800'">{{ index }}</a>
                <a v-if="pag.actualPage !== pag.lastPage" :key="pag.lastPage" class="px-2 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-gray-400 dark:hover:text-black">&raquo;</a>
            </div>
            <div class="flex gap-2 items-center">
                <p class="dark:text-white">{{ langs.Page}}</p>
                <Input v-model="goToPage" pad="p-1" class="text-center w-8"/>
                <Button pad="p-1" @click="changePageGO" :text="langs.BtnGo" typeFont="font-normal" fontSize="text-sm" width="w-fit"/>
            </div>
        </div>
    </div>
</template>

<script>
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import Input from '../../widgets/Input.vue';
export default {
    data() {
        return {
            storeLangs: langStore(),
            goToPage: ""
        };
    },
    props: ["pag"],
    computed:{
        langs(){
            return this.storeLangs.getLang.Paginate;
        },
        numberPage(){
            if(this.pag.actualPage != 1){
                if(this.pag.actualPage === this.pag.lastPage && this.pag.lastPage > 2)
                    return [this.pag.actualPage - 2, this.pag.actualPage -1, this.pag.actualPage];
                if(this.pag.lastPage > 3)
                    if(this.pag.actualPage <= 2)
                        return 3;
                    else
                        return [this.pag.actualPage - 1, this.pag.actualPage, this.pag.actualPage + 1];
                return this.pag.lastPage;
            }
            if(this.pag.lastPage > 3)
                return 3;
            return this.pag.lastPage;
        }
    },
    methods: {
        changePage(event) {
            this.$emit("selectPage", event.target.__vnode.key);
        },
        changePageGO() {
            this.goToPage && this.$emit("selectPage", +this.goToPage);
        }
    },
    emits: [
        "selectPage"
    ],
    components: { Button, Input }
}
</script>

