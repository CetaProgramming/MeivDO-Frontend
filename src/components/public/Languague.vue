<template>
    <!-- <h5 class="text-white text-xs font-bold"></h5> -->
    <select class="p-1" v-model="lang" @change="emitLanguagueChanged">
        <option value="en">English</option>
        <option value="pt">Português</option>
    </select>
</template>

<script>
    export default {
        name: 'SelectLanguague',
        mounted(){
            if(!localStorage.getItem('lang'))
                localStorage.setItem('lang', 'en')  
            return this.lang = localStorage.getItem('lang');  
        },
        data(){
            return {
                lang: 'en'            
            }
        },
        methods: {
            emitLanguagueChanged(){
                localStorage.setItem('lang', this.lang);
                console.log(this.languag);
                this.$emit('languagueChangedEvent', this.lang);
            }
        },
        computed: {
            langs(){
                return import(`../../locales/${ localStorage.getItem('lang') }.json`)
            }
        }
    }
</script>