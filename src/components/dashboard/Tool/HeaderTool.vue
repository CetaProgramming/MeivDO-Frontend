<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <PageImageName :img="langsItems.tools.img" :title="langsItems.tools.title" />
        <div>
            <div class="flex gap-4 ">
                <NavigateItemMenu />
                <Button @click="isAddToolClicked = !isAddToolClicked" :text="langsUser.ButtonNew" bg="bg-green-500"
                    pad="px-4 py-2" class="rounded-lg"></Button>
            </div>
        </div>
    </div> 
     <AddUpdateTool v-if="isAddToolClicked" @closePopUp="isAddToolClicked= false" />
</template>

<script>
import PageImageName from '../../public/Table/PageImageName.vue';
import AddUpdateTool from './PopupsTool/AddUpdateTool.vue';
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import NavigateItemMenu from '../../public/NavigateItemMenu.vue';
export default {
    data() {
        return {
            isAddToolClicked: false,
        };
    },
    computed: {
        langsUser() {
            return langStore().getLang.ToolFeature
        },
        langsItems() {
            return langStore().getLang.ItemMenu
        }
    },
    components:
    {
    PageImageName,
    AddUpdateTool,
    Button,
    NavigateItemMenu
}
}
</script>