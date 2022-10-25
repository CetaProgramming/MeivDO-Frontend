<template>
    <select class="p-1 dark:bg-zinc-800 dark:text-white" v-model="lang"  @change="changeLanguague">
        <option v-for="lang in languagues" :value="lang.value">{{ lang.name }}</option>
    </select>
</template>

<script>
    import getUnicodeFlagIcon from 'country-flag-icons/unicode'
    import { langStore } from '../../store/langStore'
    import { storeToRefs } from 'pinia'

    export default {
        name: 'SelectLanguague',
        data(){
            return {
                lang: langStore().lang,
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
            changeLanguague(event){
                langStore().setLanguague(event.target.value);
            }
        }
    }
</script>