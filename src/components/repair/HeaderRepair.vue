<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <PageImageName :img="langsItems.repairs.img" :title="langsItems.repairs.title" />
        <div>
            <div class="flex gap-4 ">
                <NavigateItemMenu />
            </div>
        </div>
    </div>
</template>

<script>
import PageImageName from '../public/Table/PageImageName.vue';
import { langStore } from '../../store/langStore';
import NavigateItemMenu from '../public/NavigateItemMenu.vue';
import Button from '../widgets/Button.vue';



export default {
    props: ['isCompleted'],
    data() {
        return {
            isAddRepairClicked: false,
        }
    },
    computed: {
        langsRepair() {
            return langStore().getLang.PageRepairs.RepairFeature
        },
        langsItems() {
            return langStore().getLang.ItemMenu
        }
    },
    methods: {
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        closingteste(){
            this.isAddInspectionClicked = false
        }
    },
    emits: ['activeToast'],
    components: {
        PageImageName,
        NavigateItemMenu,
        Button,
    }
}
</script>