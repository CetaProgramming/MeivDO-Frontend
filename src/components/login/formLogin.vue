<template>
  <ToastError v-if="this.toast.visible" :msg="this.toast.msg" @closeToast="this.toast.visible = false"
  />
  <form id="form" class="mx-10 z-10 flex flex-col items-center gap-5 lg:w-64 lg:mx-0" @submit.prevent="formValid">
    <InputLabelError ref="formLoginEmail" type="email" v-model="formLogin.email" placeholder="example@email.com" :msg="langs.EmailError" :name="langs.EmailInput" />
    <InputLabelError ref="formLoginPassword" type="password" v-model="formLogin.password" placeholder="*********" :msg="langs.PasswordError" :name="langs.PasswordInput" />
    <Button :text="langs.LoginButton" />
  </form>
</template>

<script>
import FormValidate from "../mixins/FormValidate.js";
import { computed } from "vue";
import { langStore } from "../../store/langStore";
import { userLogin } from "../../store/userLogin";
import ToastError from "./../public/Toast/ToastError.vue";
import Input from "../widgets/Input.vue";
import Button from "../widgets/Button.vue";
import InputLabelError from "../forms/InputLabelError.vue";

export default {
  setup() {
    const store = langStore();
    const userLoginStore = userLogin();

    const langs = computed(() => store.getLang.Login);

    return {
      langs,
      userLoginStore,
    };
  },
  data() {
    return {
      toast: {
        msg: "",
        visible: false,
      },
      formLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    formValid() {
      try {
        if (
          this.validateData(this.formLogin, {
            email: this.$refs.formLoginEmail,
            password: this.$refs.formLoginPassword,
          })
        )
          (async () => {
            try {
              await this.userLoginStore.login(this.formLogin);
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
    },
  },
  components: {
    ToastError,
    Input,
    Button,
    InputLabelError,
  },
  mixins: [FormValidate],
};
</script>
