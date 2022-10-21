<template>
    <div class="flex flex-col gap-2">
        <Label :name="name" :msg="name" />
        <select id="status" :value="value" @change="changeValue" 
            class="bg-zinc-300 p-2 rounded-md hover:cursor-pointer w-full dark:bg-zinc-800 ">
            <option value="" disabled hidden>{{langs.selectOption}}</option>
            <option v-for="item in items" :value="item[valueItem] ">{{item.name}}</option>
        </select>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import { langStore } from '../../store/langStore';
export default {
    data() {
        return {
            value: this.default
        };
    },
    props: {
        default: {
            default: "",
        },
        name: {
            default: "input",
            type: String,
        },
        items: {
            required: true,
            type: Array,
        },
        valueItem: {
            type: String,
            default: 'value'
        }
        
    },
    computed:{
        langs(){
            return langStore().getLang.Options;
        },
    },
    methods: {
        changeValue(event) {
            this.value = event.target.value
            this.$emit('update:modelValue', event.target.value)
        },
        resetValues(){
            this.value = '';
        }
    },
    components: {
        Label
    }
}
</script>