<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="updateTool" class="flex flex-col gap-5">
            <div
                class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7">
                    <InputLabelError ref="formToolCreateCode" v-model="formToolCreateUpdate.code"
                        :placeholder="langs.Placeholder" :msg="langs.CodeError" :name="langs.Code"
                        :default="formToolCreateUpdate.code" />
                    <div class="flex flex-col md:flex-row gap-5 ">
                        <LabelSelectWithInputError ref="formToolCreateGroup" :msg="langs.GroupToolsError" :name="langs.GroupTools" :placeholder="langs.GroupToolsPlaceholder" v-model="formToolCreateUpdate.groupTool" :default="formToolCreateUpdate.groupTool"
                            :items="activeGroupTools" itemFilter="code"
                        />
                        <SwitchLabel v-if="value" v-model="formToolCreateUpdate.active" @change="changeValue"
                            :default="Boolean(formToolCreateUpdate.active)" :name="langs.Active" />
                    </div>
                </div>
            </div>
            <Button :text="langs.Save"></Button> 
        </form>
       
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabelError from '../../forms/SelectLabelError.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import Button from '../../widgets/Button.vue';
import { toolsStore } from '../../../store/toolsStore';
import { groupToolsStore } from "../../../store/groupToolsStore";
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
import LabelSelectWithInputError from "../../forms/LabelSelectWithInputError.vue";
import { markRaw } from 'vue';

export default {
    props: ['value'],
    data() {
        return {
            activeGroupTools: [],
            toolStore: toolsStore(),
            groupToolsStore: groupToolsStore(),
            formToolCreateUpdate: {
                code: this.value ? this.value.code : '',
                id: this.value ? this.value.id : '',
                groupTool: this.value ? this.value.group.id : -1,
                active: this.value ? this.value.active : '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupAddTool
        },
        isTool() {
            return Boolean(this.tool)
        }
    },
    async mounted(){
        this.activeGroupTools = await groupToolsStore().getActiveGroupTools()
    },
    methods: {
        changeValue() {
            this.formToolCreateUpdate.active = Number(this.formToolCreateUpdate.active)
        },
        updateTool() {
            try {
                if (this.validateDataEqualsOrEmpty({
                    code: this.formToolCreateUpdate.code,
                    group: this.formToolCreateUpdate.groupTool,
                }, {
                    code: this.$refs.formToolCreateCode,
                    group: this.$refs.formToolCreateGroup,

                }, -1))
                    (async () => {
                        try {
                            this.value &&
                                await this.toolStore.update(this.value.id,
                                    {
                                        code: this.formToolCreateUpdate.code,
                                        group_tools_id: this.formToolCreateUpdate.groupTool ,
                                        active: this.formToolCreateUpdate.active,
                                    }
                                );

                            !this.value &&
                                await this.toolStore.add(
                                    {
                                        code: this.formToolCreateUpdate.code,
                                        group_tools_id: this.formToolCreateUpdate.groupTool,
                                    }
                                );
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.value && this.langs.updatedSucess || !this.value && this.langs.createdSucess,
                                type: markRaw(ToastSuccess)
                            });
                        } catch (error) {
                            this.$emit("activeToast", {
                                msg: this.langs.errorCreatedUpdated,
                                type: markRaw(ToastError)
                            });
                        }
                    })();
            } catch (e) {
                console.error(e);
            }
        },

    },
    components: {
    Popoup,
    InputLabelError,
    SelectLabelError,
    SwitchLabel,
    Button,
    LabelSelectWithInputError
},
    emits: ['activeToast', 'closePopUp'],
    mixins: [FormValidate]
}

</script>
