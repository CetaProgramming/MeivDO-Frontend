<template>
    <Popoup>
        <form class="flex flex-col gap-5">
            <div class="font-openSans grid grid-cols-1  md:justify-between  md:flex-row gap-6 ">
                <div class="grid gap-6 text-center text-3xl">
                    {{langs.ResetTextFirst}}{{IdUser}}{{langs.ResetTextEnd}}
                </div>
                 <Button :text="langs.Confirmation"/>
            </div>
        </form>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { computed, ref } from 'vue';
import { langStore } from '../../../store/langStore';
import {useDark, useToggle} from '@vueuse/core'
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import {usersStore} from "../../../store/usersStore"
import Button from '../../../components/widgets/Button.vue'
import FormValidate from '../../mixins/FormValidate';

export default {
    setup() {
        const store = langStore();
        const isDark= useDark();
        const toggleDark = useToggle(isDark);
        const userStore = usersStore();

        const langs = computed(() => store.getLang.PopupUserReset);

        return {
            langs,toggleDark,isDark, userStore
        }
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
        resetUserPassword(){
            
        }
    },
    mixins: [FormValidate]
}
</script>