<template>
    <div class="relative bottom-0">
        <Input ref="inputValue" @click="changeStateOption" @focusout="changeStateOption" type="text" :placeholder="placeholder" @input="changeValueWithInput" :class="borders, background, color" class="w-full" />
        <div @scroll="loadItems" ref="listItems" v-show="optionState" class="absolute w-full p-2 max-h-32 overflow-auto dark:bg-zinc-900">
            <p  v-for="item in itemsFiltered" @click="clickOptionItem(item.name)" @focusout="changeStateOption" class="p-1 cursor-pointer truncate hover:dark:bg-zinc-800">{{item.name}}</p>
            <p v-if="!itemsFiltered.length" class="text-xs text-center text-red-500">Nothing to show</p>
        </div>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import Input from '../widgets/Input.vue';
export default {
    data(){
        return {
            itemsFilter: this.items,
            value: this.default,
            optionState: false
        }
    },
    computed: {
        itemsFiltered(){
            return this.itemsFilter.filter(item => item.name.toLowerCase().includes(this.$refs.inputValue.value.toLowerCase()));
        }
    },
    props: {
        default: {
            type: Number,
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
        }
    },
    methods: {
        changeStateOption(event){
            if (event.type === "click" && this.optionState || event.rangeParent && String(event.rangeParent.nodeName).includes('text')) 
                return;
            this.optionState = !this.optionState;
        },
        clickOptionItem(value){
            this.changeIndexOnValue(value);
            this.$refs.inputValue.value = this.itemsFilter[this.value].name;
            this.optionState = false;
            this.changeValue(value, false);
        },
        changeValueWithInput(event){
            this.changeValue(event.target.value);
        },
        changeIndexOnValue(value){
            const indexValue = this.itemsFilter.findIndex(item => item.name.toLowerCase().includes(value.toLowerCase()));
            this.value = indexValue;
            return indexValue;
        },
        changeValue(value, isRunChangeIndexOnValue = true){
            isRunChangeIndexOnValue && this.changeIndexOnValue(value);
            this.$emit("update:modelValue", this.$refs.inputValue.value ? this.itemsFilter[this.value]?.id ?? -1 : -1);
        },
        loadItems(e){
            const { scrollTop, offsetHeight, scrollHeight } = e.target
            if ((scrollTop + offsetHeight) >= scrollHeight) {
                this.$emit('loadItems');
            }
        }
    },
    emits: [
        'update:modelValue', 'loadItems'
    ],
    components: { Label, Input }
}
</script>