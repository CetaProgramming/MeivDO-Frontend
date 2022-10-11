<template>
    <div class="flex flex-col gap-2 w-full">
        <Label :name="name" :msg="name"/>
        <InputSelectOption v-model="value" :items="items" :itemFilter="itemFilter" :default="default" :placeholder="placeholder"/>
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