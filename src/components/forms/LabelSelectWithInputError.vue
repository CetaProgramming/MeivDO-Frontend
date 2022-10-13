<template>
    <div class="flex flex-col gap-2 w-full">
        <Label :name="name" :msg="name"/>
        <InputSelectOption v-model="value" :items="items" :itemFilter="itemFilter" :default="default" :placeholder="placeholder"/>
        <Label v-if="isError" :name="name" class="font-openSans text-xs" color="text-red-500" :msg="msg"/>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import InputSelectOption from '../widgets/InputSelectOption.vue';
export default {
    data(){
        return {
            value: this.default,
            isError: false
        }
    },
    watch:{
        value(value){
            this.isErrorShow(value);
            this.$emit("update:modelValue", value);
        }
    },
    props: {
        default: {
            type: Number
        },
        name: {
            default: "input",
            type: String,
        },
        placeholder: {
            default: "placeholder",
            type: String,
        },
        items: {
            required: true
        },
        msg: {
            default: "error"
        },
        itemFilter: {
            required: true
        }
    },
    methods: {
        isErrorShow(value){
            this.isError = this.value === -1 || !value ? true : false;
        },
        validateValue(event){
            this.isErrorShow(event.target.value);
            this.$emit("update:modelValue", event.target.value);
        }
    },
    emits: [
        'update:modelValue'
    ],
    components: { Label, InputSelectOption }
}
</script>