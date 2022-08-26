<template>
  <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-none bg-image min-h-screen lg:p-12">
    <div class="font-openSans flex justify-center my-2 gap-2 col-auto lg:col-span-2 lg:justify-end">
      <SelectLanguague @languagueChangedEvent="languageChanged"/>
    </div> 
    <div class="grid items-center grid-rows-1fr-auto lg:grid-cols-1fr-auto lg:grid-rows-none">
      <div class="flex flex-col gap-3 p-10 lg:p-0 lg:max-w-4/5">
        <h1 class="text-4xl text-white">{{this.langs.WelcomeMessage}}</h1>
        <p class="text-white font-openSans">{{this.langs.Slogan}}</p>
      </div>
      <div class="p-3 rounded h-fit bg-white flex flex-col justify-center gap-6 lg:p-10">
        <Logo/>
        <form id="form" class="bg-white z-10 flex flex-col items-center gap-5" @submit="formValid">
            <div class="flex flex-col gap-2">
              <label for="email" class="block text-sm font-medium text-gray-900">{{this.langs.EmailInput}}</label>
              <input type="email" id="email" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="example@email.com" @change="inputEventChange">
              <label v-if="emailerror" class="font-openSans text-xs text-red-500">{{this.langs.EmailError}}</label>
            </div>
            <div class="flex flex-col gap-2">
              <label for="password" class="block text-sm font-medium text-gray-900">{{this.langs.PasswordInput}}</label>
              <input type="password" id="password" class="font-openSans border border-gray-500 rounded text-neutral-900 text-sm w-80 p-3 outline-none" placeholder="*********" @change="inputEventChange">
              <label v-if="passworderror" class="font-openSans text-xs text-red-500">{{this.langs.PasswordError}}</label>
            </div>
          <button type="submit" class="btn bg-MeivRed font-bold text-lg p-5 tracking-widest rounded w-80 text-white mt-5">{{this.langs.LoginButton}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SelectLanguague from './public/Languague.vue';
import Logo from './public/Logo.vue'

export default {
  mounted(){
    this.languageChanged()
  },
  data(){
    return {
      langs: {},
      emailerror: false,
      passworderror: false
    }
  },
  methods: {
    languageChanged(){
      SelectLanguague.computed.langs()
        .then(data => this.langs = data.Login);
    },
    inputEventChange(event){
      this.inputValid(event.target);
    },
    inputValid(input){
      if(!input.value)
        return this[`${input.id}error`] = true
      return this[`${input.id}error`] = false
    },
    formValid(event){
      try {
        event.preventDefault();
        let isError = false;
        [...event.target]
                .filter(input => input.type === "password" || input.type === "email")
                .forEach(input => {
                    if(this.inputValid(input)) 
                      isError = true
                    }
                );
        if(!isError)
          console.log('RequestAPI');
      } catch (e) {
        console.log(e);
      }
    }
  },
  components: { 
    Logo,
    SelectLanguague 
  }
}
</script>