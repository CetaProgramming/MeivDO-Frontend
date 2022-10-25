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
import { langStore } from '../../../store/langStore';
import Button from '../../widgets/Button.vue';
import { categoryStore } from "../../../store/categoryStore";
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
            return langStore().getLang.PageTool.PopupDeleteCategory
        }
    },
    methods: {
        async deleteTool() {
            try {
                await categoryStore().deleteTool(this.value)
                this.$emit("closePopUp");
                this.$emit("activeToast", {
                    msg: this.langs.DeleteCategorySucess,
                    type: markRaw(ToastSuccess)
                });
            } catch (error) {
                this.$emit("activeToast", {
                    msg: this.langs.DeleteCategoryError,
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
  