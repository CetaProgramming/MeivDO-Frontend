<template>
    <!-- <h5 class="text-white text-xs font-bold"></h5> -->
    <select class="p-1" v-model="defaultLang"  @change="emitLanguagueChanged">
        <option v-for="lang in languagues" :value="lang.value">{{ lang.name }}</option>
    </select>
</template>

<script>
    import getUnicodeFlagIcon from 'country-flag-icons/unicode'

    export default {
        name: 'SelectLanguague',
        mounted(){
            if(!localStorage.getItem('lang'))
                localStorage.setItem('lang', 'en')  
            return this.defaultLang = localStorage.getItem('lang');  
        },
        data(){
            return {
                defaultLang: 'en',
                languagues: [
                    {
                        name: `${getUnicodeFlagIcon('US')} English`,
                        value: 'en'
                    },
                    {
                        name: `${getUnicodeFlagIcon('PT')} Português`,
                        value: 'pt'
                    }
                ]           
            }
        },
        methods: {
            emitLanguagueChanged(){
                localStorage.setItem('lang', this.defaultLang);
                this.$emit('languagueChangedEvent', this.defaultLang);
            }
        },
        computed: {
            langs(){
                return import(`../../locales/${ localStorage.getItem('lang') }.json`)
            }
        }
    }
</script>