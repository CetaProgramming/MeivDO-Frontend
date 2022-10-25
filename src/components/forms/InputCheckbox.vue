<template>
    <div class="flex gap-2 w-full">
        <Input type="checkbox" v-model="value" :default="default" @update:model-value="changeValue" />
        <Label :name="name" :msg="name"/>
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
            type: Boolean,
            default: false,
        },
        name: {
            default: "input",
            type: String,
        },
    },
    emits: [
        'update:modelValue'
    ],
    methods: {
        changeValue(value){
            this.value = !value;
            this.$emit("update:modelValue", !value);
        }
    },
    components: { Label, Input }
}
</script>

<style lang="scss" scoped>

</style>