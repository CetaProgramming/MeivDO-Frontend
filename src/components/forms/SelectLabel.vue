<template>
    <div class="flex flex-col gap-2">
        <Label :name="name" :msg="name" />
        <select id="status" :value="value" @change="changeValue" 
            class="bg-zinc-300 p-2 rounded-md hover:cursor-pointer w-full dark:bg-zinc-800 ">
            <option value="" disabled hidden>Select option</option>
            <option v-for="item in items" :value="item.id">{{item.name}}</option>
        </select>
        <Label v-if="isError" :name="name" class="font-openSans text-xs" color="text-red-500" :msg="msg"/>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
export default {
    data() {
        return {
            isError: false,
            value: this.default
        };
    },
    props: {
        default: {
            type: String,
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
        msg: {
            default: "error",
            type: String,
        },
    },
    methods: {
        inputValid(){
            if(!this.value)
                return this.isError = true;
            return this.isError = false;
        },
        changeValue(event) {
            this.value = event.target.value
            this.inputValid();
            this.$emit('update:modelValue', event.target.value)
        }
    },

    components: {
        Label
    }
}
</script>

