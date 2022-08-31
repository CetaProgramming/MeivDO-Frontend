<template>
    <select class="p-1" v-model="lang"  @change="changeLanguague">
        <option v-for="lang in languagues" :value="lang.value">{{ lang.name }}</option>
    </select>
</template>

<script>
    import getUnicodeFlagIcon from 'country-flag-icons/unicode'
    import { computed } from 'vue';
    import { langStore } from '../../store/langStore'
    import { storeToRefs } from 'pinia'

    export default {
        name: 'SelectLanguague',
        setup(){

            const store = langStore();

            const { lang } = storeToRefs(store);

            function changeLanguague(event){
                store.setLanguague(event.target.value);
            }
            
            return {
                lang,
                changeLanguague
            }
        },
        data(){
            return {
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
        }
    }
</script>