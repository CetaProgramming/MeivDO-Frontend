<template>
    <Popoup>
        <form class="flex flex-col gap-5" @submit.prevent="deleteUser">
            <div class="font-openSans grid grid-cols-1  md:justify-between  md:flex-row gap-6 ">
                <div class="grid gap-6 text-center text-3xl">
                    {{langs.DeleteTextFirst}}{{IdUser}}{{langs.DeleteTextEnd}}
                </div>
                 <Button :text="langs.Confirmation"/>
            </div>
        </form>
    </Popoup>
</template>

<script>
import { markRaw } from "vue";
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import { usersStore } from "../../../store/usersStore"
import Button from '../../../components/widgets/Button.vue'

export default {
    computed: {
        langs() {
            return langStore().getLang.PageUsers.PopupUserDelete
        },
    },
    components: { 
        Popoup,
        ToastError,
        ToastSuccess,
        Button
    },
    props:[
        'IdUser'
    ],
    data() {
        return {
            toast: {
                msg: '',
                visible: false,
                type: ''
            },
        }
    },
    methods:{
        async deleteUser(){
            try { 
                await usersStore().deleteUser(this.IdUser)
                this.$emit("closePopUp");
                this.$emit("activeToast", {
                    msg: this.langs.DeleteUserSucess,
                    type: markRaw(ToastSuccess)
                });
                } catch (error) {
                    this.$emit("activeToast", {
                        msg: this.langs.DeleteUserError,
                        type: markRaw(ToastError)
                });
            }
        }
    }
}
</script>