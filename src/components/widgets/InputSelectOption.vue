<template>
    <div class="relative bottom-0">
        <Input ref="inputValue" @click.stop.prevent="changeStateOption" type="text" v-model="data" :placeholder="placeholder" @input="changeValueWithInput" :class="borders, background, color" class="w-full" />
        <div ref="listItems" v-show="optionState" class="z-50 absolute w-full p-2 max-h-32 overflow-auto bg-white  dark:bg-zinc-900">
            <p v-for="item in itemsFiltered" @click="clickOptionItem(item[itemFilter])"  class="p-1 cursor-pointer truncate hover:dark:bg-zinc-800 hover:bg-zinc-300">{{item[itemFilter]}}</p>
            <p v-if="!itemsFiltered.length" class="text-xs text-center text-red-500">{{lang.noSearchData}}</p>
        </div>
    </div>
</template>
<script>
import Label from '../widgets/Label.vue';
import Input from '../widgets/Input.vue';
import {langStore} from './../../store/langStore';
export default {
    watch:{
        items(){
            this.$refs.inputValue.value = this.items && this.default !== -1 ? this.items.find(item => item.id == this.default)[this.itemFilter] : ''
        },
        default(value){
            if(value == -1){
                this.$refs.inputValue.value = '';
                this.value = -1;
            }
        }
    },
    data(){
        return {
            data: '',
            value: this.default,
            optionState: false
        }
    },
    computed: {
        itemsFiltered(){
            return !this.data && this.items || this.items.filter(item => item[this.itemFilter].toLowerCase().includes(this.data.toLowerCase()));
        },
        lang(){
            return langStore().getLang.Options;
        }
    },
    props: {
        default: {
            type: Number,
            default: -1
        },
        name: {
            default: "input",
            type: String,
        },
        placeholder: {
            default: "placeholder",
            type: String,
        },
        borders: {
            type: String,
        },
        background: {
            type: String,
        },
        color: {
            type: String,
        },
        items: {
            required: true
        },
        itemFilter: {
            required: true
        }
    },
    methods: {
        changeStateOption(event){
            if (event.rangeParent && String(event.rangeParent.nodeName).includes('text')) 
                return;
            this.optionState = !this.optionState;
        },
        clickOptionItem(value){
            console.log(value);
            this.changeIndexOnValue(value);
            this.$refs.inputValue.value = this.items[this.value][this.itemFilter];
            this.data = this.items[this.value][this.itemFilter];
            this.optionState = false;
            this.changeValue(value, false);
        },
        changeValueWithInput(event){
            this.changeValue(event.target.value);
        },
        changeIndexOnValue(value){
            const indexValue = this.items.findIndex(item => item[this.itemFilter].toLowerCase().includes(value.toLowerCase()));
            this.value = indexValue;
            return indexValue;
        },
        changeValue(value, isRunChangeIndexOnValue = true){
            isRunChangeIndexOnValue && this.changeIndexOnValue(value);
            this.$emit("update:modelValue", this.$refs.inputValue.value ? this.items[this.value]?.id ?? -1 : -1);
        }
    },
    emits: [
        'update:modelValue'
    ],
    components: { Label, Input }
}
</script>