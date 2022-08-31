<template>
    <ToastError v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible= false"/>
    <form id="form" class="bg-white z-10 flex flex-col items-center gap-5" @submit.prevent="formValid">
        <div class="flex flex-col gap-2">
            <label for="email" class="block text-sm font-medium text-gray-900">{{this.langs.EmailInput}}</label>
            <input type="email" id="email" v-model="formLogin.email" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="example@email.com" @change="inputValid">
            <label v-if="errorsInputs.email" class="font-openSans text-xs text-red-500">{{this.langs.EmailError}}</label>
        </div>
        <div class="flex flex-col gap-2">
            <label for="password" class="block text-sm font-medium text-gray-900">{{this.langs.PasswordInput}}</label>
            <input type="password" id="password" v-model="formLogin.password" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="*********" @change="inputValid">
            <label v-if="errorsInputs.password" class="font-openSans text-xs text-red-500">{{this.langs.PasswordError}}</label>
        </div>
        <button type="submit" class="btn bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-80 text-white mt-5">{{this.langs.LoginButton}}</button>
    </form>
</template>

<script>
    import DataValidator from '../mixins/DataValidator.js';
    import { computed } from 'vue';
    import { langStore } from '../../store/langStore'
    import { userLogin } from '../../store/userLogin'
    import ToastError from './../public/Toast/ToastError.vue';
    
    export default {
        setup(){
            const store = langStore();

            const userLoginStore = userLogin();

            const langs = computed(() => store.getLang.Login);

            return {
                langs,
                userLoginStore
            }
        },
        data(){
            return {
                toast: {
                    type: ToastError,
                    msg: '',
                    visible: false
                },
                formLogin: {
                    email: '',
                    password: '',
                },
                errorsInputs: {
                    email: false,
                    password: false
                }
            }
        },
        methods: {
            inputValid(event){
                if(this.empty(this.formLogin[event.target.id]))
                    this.errorsInputs[event.target.id] = true;
            },
            formValid(event){
                try {
                    let isError = false;
                    const dataForm = JSON.parse(JSON.stringify(this.formLogin));
                    Object.entries(dataForm).forEach(([key, value]) => {
                        if(!value){
                            this.errorsInputs[key] = true;
                            isError = true;
                        }
                    });
                    if(!isError)
                        (async () => {
                            try {
                                await this.userLoginStore.login(dataForm);
                            } catch (error) {
                                this.toast.msg = 'Error';
                                this.toast.visible = true;
                            }
                        })();
                } catch (e) {
                    console.log(e);
                }
            }
        },
        components: {
            ToastError
        },
        mixins: [ DataValidator ]
    }
</script>