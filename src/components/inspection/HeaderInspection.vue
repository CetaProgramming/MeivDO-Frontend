<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <PageImageName :img="langsItems.inspections.img" :title="langsItems.inspections.title" />
        <div>
            <div class="flex gap-4 ">
                <NavigateItemMenu />

                <Button v-if="this.isCompleted == 'Completed'" @click="isAddInspectionClicked = !isAddInspectionClicked" :text="langsInspection.ButtonNew"
                    bg="bg-green-500" pad="px-4 py-2" class="rounded-lg"></Button>
            </div>
        </div>
    </div>
    <AddUpdateInspection v-if="isAddInspectionClicked " @activeToast="activeToast"
        @closePopUp="isAddInspectionClicked= false" :showActive="false" />
</template>

<script>
import PageImageName from '../public/Table/PageImageName.vue';
import { langStore } from '../../store/langStore';
import NavigateItemMenu from '../public/NavigateItemMenu.vue';
import Button from '../widgets/Button.vue';
import AddUpdateInspection from './PopupsInspection/AddUpdateCompleted.vue';


export default {
    props: ['isCompleted'],
    data() {
        return {
            isAddInspectionClicked: false,
        }
    },
    computed: {
        langsInspection() {
            return langStore().getLang.PageInspections.InspectionFeature
        },
        langsItems() {
            return langStore().getLang.ItemMenu
        }
    },
    methods: {
        activeToast(toast) {
            this.$emit('activeToast', toast);
        }
    },
    emits: ['activeToast'],
    components: {
        PageImageName,
        NavigateItemMenu,
        Button,
        AddUpdateInspection
    }
}
</script>