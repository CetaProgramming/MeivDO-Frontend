<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <PageImageName :img="langsItems.tools.img" :title="langsItems.tools.title" />
        <div>
            <div class="flex gap-4 ">
                <NavigateItemMenu />
                <Button @click="isAddToolClicked = !isAddToolClicked" :text="langsTool.ButtonNew" 
                    pad="px-4 py-2" class="rounded-lg"></Button>
            </div>
        </div>
    </div>
    <Transition>
        <component v-if="isAddToolClicked" @closePopUp="isAddToolClicked= false" @activeToast="showToast" :is="componentFilter"></component>
    </Transition>
</template>

<script>
import PageImageName from '../public/Table/PageImageName.vue';
import AddUpdateTools from './PopupsTool/AddUpdateTools.vue';

import { langStore } from '../../store/langStore';
import Button from '../widgets/Button.vue';
import NavigateItemMenu from '../public/NavigateItemMenu.vue';
import AddUpdateGroupTools from './PopupsTool/AddUpdateGroupTools.vue';
import AddUpdateCategory from './PopupsTool/AddUpdateCategory.vue';
export default {
    props: ['newOptions'],
    data() {
        return {
            popUpSelected: "Tools",
            isAddToolClicked: false
        };
    },
    computed: {
        langsTool() {
            return langStore().getLang.PageTool.ToolFeature
        },
        langsItems() {
            return langStore().getLang.ItemMenu
        },
        componentFilter(){
            this.popUpSelected = this.newOptions
            return `AddUpdate${this.popUpSelected}`
        }
    },
    methods: {
        showToast(data){
            this.$emit('activeToast', data);
        }
    },
    components:
    {
    PageImageName,
    AddUpdateTools,
    Button,
    NavigateItemMenu,
    AddUpdateGroupTools,
    AddUpdateCategory
},
emits: ['activeToast', 'closePopUp']
}
</script>