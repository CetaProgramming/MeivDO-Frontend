<template>
    <div class="flex flex-col gap-2 w-full">
        <Label :name="name" :msg="name"/>
        <Input :type="type" v-model="value" :default="default" :placeholder="placeholder" @input="changeValue" :class="borders, background, color" />
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import Input from '../widgets/Input.vue';
export default {
    data(){
        return {
            value: this.default
        }
    },
    props: {
        default: {
            type: String,
            default: "",
        },
        type: {
            default: "text",
            type: String
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
    },
    emits: [
        'update:modelValue'
    ],
    methods: {
        changeValue(event){
            this.$emit("update:modelValue", event.target.value);
        }
    },
    components: { Label, Input }
}
</script>

<style lang="scss" scoped>

</style>