<template>
    <Popoup>
        <form class="flex flex-col gap-5" @submit.prevent="deleteTool">
            <div class="font-openSans grid grid-cols-1  md:justify-between  md:flex-row gap-6 ">
                <div class="grid gap-6 text-center text-3xl">
                    {{langs.DeleteTextFirst}}{{value}}{{langs.DeleteTextEnd}}
                </div>
                <Button :text="langs.Confirmation" />
            </div>
        </form>
    </Popoup>
</template>

<script>
import { markRaw } from "vue";
import Popoup from '../../public/Popoup.vue';
import {inspectionCompletedStore} from '../../../store/inspectionCompletedStore'
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
export default {
    props: ['value'],
    data() {
        return {
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
        }
    },
    computed: {
        langs() {
            return langStore().getLang.PageInspections.PopupDeleteInspection
        }
    },
    methods: {
        async deleteTool() {
            try {
                await inspectionCompletedStore().deleteInspection(this.value)
                this.$emit("closePopUp");
                this.$emit("activeToast", {
                    msg: this.langs.DeleteInspectionSucess,
                    type: markRaw(ToastSuccess)
                });
            } catch (error) {
                this.$emit("activeToast", {
                    msg: this.langs.DeleteInspectionError,
                    type: markRaw(ToastError)
                });
            }
        }
    },
    components: {
        Popoup,
        ToastError,
        ToastSuccess,
        Button
    }
}
</script>