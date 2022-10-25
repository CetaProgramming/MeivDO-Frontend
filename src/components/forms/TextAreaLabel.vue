<template>
    <div class="flex flex-col gap-2 w-full">
        <Label :name="name" :msg="name"/>
        <textarea class="rounded outline-none resize-none" v-model="value" @input="changeValue" :placeholder="placeholder" :class="[pad, borders, background, color]" ></textarea>
        <Label v-if="isError" :name="name" class="font-openSans text-xs" color="text-red-500" :msg="msg"/>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
import Input from '../widgets/Input.vue';
export default {
    data(){
        return {
            isError: false,
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
        msg: {
            default: "error",
            type: String,
        },
        pad: {
            default: "p-2",
            type: String
        },
        borders: {
            type: String,
            default: "border-gray-500 dark:border-zinc-800"
        },
        background: {
            type: String,
            default: "bg-zinc-300 dark:bg-zinc-800"
        },
        color: {
            type: String,
            default: "text-neutral-900 dark:text-white"
        },
        placeholder: {
            default: "placeholder",
            type: String,
        }
    },
    emits: [
        'update:modelValue'
    ],
    methods: {
        inputValid(){
            if(!this.value)
                return this.isError = true;
            return this.isError = false;
        },
        changeValue(event){
            this.inputValid();
            this.$emit("update:modelValue", event.target.value);
        }   
    },
    components: { Label, Input }
}
</script>