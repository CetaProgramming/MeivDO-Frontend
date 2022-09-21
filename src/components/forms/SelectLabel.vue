<template>
    <div class="flex flex-col gap-2">
        <!-- <label class="font-bold">{{langs.Role}}</label> -->
        <Label :name="name" :msg="name" />
        <select id="status" v-model="value" class="bg-zinc-300 p-1 rounded-md hover:cursor-pointer w-full">
            <option value="" disabled selected hidden>Select option</option>
            <option v-for="item in items" :value="item.value">{{item.name}}</option>

        </select>
    </div>
</template>

<script>
import Label from '../widgets/Label.vue';
export default {
    data() {
        return {
            value: ""
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
    },
    emits: [
        'update:modelValue'
    ],

    components: {
        Label
    }
}
</script>

