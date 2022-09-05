<template>
    <ToastError v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"/>
    <form id="form" class=" z-10 flex flex-col items-center gap-5 " @submit.prevent="formValid">
        <div class="flex flex-col gap-2">
            <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white">{{langs.EmailInput}}</label>
            <input type="email" id="email" v-model="formLogin.email" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800" placeholder="example@email.com" @change="inputValid">
            <label v-if="errorsInputs.email" class="font-openSans text-xs text-red-500">{{langs.EmailError}}</label>
        </div>
        <div class="flex flex-col gap-2">
            <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">{{langs.PasswordInput}}</label>
            <input type="password" id="password" v-model="formLogin.password" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none dark:bg-zinc-800 dark:text-white dark:border-zinc-800" placeholder="*********" @change="inputValid">
            <label v-if="errorsInputs.password" class="font-openSans text-xs text-red-500">{{langs.PasswordError}}</label>
        </div>
        <button type="submit" class="btn bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-80 text-white mt-5">{{langs.LoginButton}}</button>
    </form>
</template>

<script>
    import DataValidator from '../mixins/DataValidator.js';
    import { computed } from 'vue';
    import { langStore } from "../../store/langStore";
    import { userLogin } from "../../store/userLogin";
    import ToastError from "./../public/Toast/ToastError.vue";
    
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
                    return this.errorsInputs[event.target.id] = true;
                return this.errorsInputs[event.target.id] = false;
            },
            formValid(){
                try {
                    let isError = false;
                    const dataForm = JSON.parse(JSON.stringify(this.formLogin));
                    Object.entries(dataForm).forEach(([key, value]) => {
                        if(!value){
                            this.errorsInputs[key] = true;
                            return isError = true;
                        }
                        return this.errorsInputs[key] = false;
                    });
                    if(!isError)
                        (async () => {
                            try {
                                await this.userLoginStore.login(dataForm);
                                this.$router.push("/dashboard");
                            } catch (error) {
                                this.toast.msg = this.langs.LoginWrong;
                                this.toast.visible = true;
                                console.log(error);
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