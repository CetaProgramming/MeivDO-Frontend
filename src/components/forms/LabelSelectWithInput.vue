<template>
    <div class="flex flex-col gap-2 w-full">
        <Label :name="name" :msg="name"/>
        <InputSelectOption ref="inputSelectionOption" v-model="value" :items="items" :itemFilter="itemFilter" :default="value" :placeholder="placeholder"/>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import InputSelectOption from '../widgets/InputSelectOption.vue';
export default {
    data(){
        return {
            value: this.default,
        }
    },
    methods: {
        resetValues(){
            this.value=-1
            this.$refs.inputSelectionOption.resetValues();
        }
    },
    watch:{
        value(value){
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
        itemFilter: {
            required: true
        }
    },
    emits: [
        'update:modelValue'
    ],
    components: { Label, InputSelectOption }
}
</script>