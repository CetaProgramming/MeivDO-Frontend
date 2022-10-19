<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="AddUpdateInspection" class="flex flex-col gap-5 font-openSans">
            <LabelSelectWithInputError v-if="!this.value" ref="formInspectionGetTool" :name="langs.Tools" v-model="formInspectionCreateUpdate.tool" :default="formInspectionCreateUpdate.tool"
            :items="activeTools" itemFilter="code" :placeholder="langs.OptionTool" />

                <div v-else> <LabelShowInfo :header="langs.Tools" :info="formInspectionCreateUpdate.tool"></LabelShowInfo></div>

               <TextAreaLabel ref="formInspectionDetail" :name="langs.Description"
                    :placeholder="langs.PlaceholderDescription" :msg="langs.DescriptionError" v-model="formInspectionCreateUpdate.description" :default="formInspectionCreateUpdate.description">  
                </TextAreaLabel>
               <LabelPickOptions ref="formInspectionStatus" :default="formInspectionCreateUpdate.status" v-model="formInspectionCreateUpdate.status" :name="langs.LabelText" :text="langs.TextButtons" :msg="langs.SelectButton" /> 
            <Button :text="langs.Save"></Button>
        </form>
        
    </Popoup>
    
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore'
import {inspectionCompletedStore} from '../../../store/inspectionCompletedStore'
import {toolsStore} from '../../../store/toolsStore'
import LabelSelectWithInputError from '../../forms/LabelSelectWithInputError.vue';
import TextAreaLabel from '../../forms/TextAreaLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import Button from '../../widgets/Button.vue';
import LabelPickOptions from '../../forms/LabelPickOptions.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
import LabelShowInfo from '../../forms/LabelShowInfo.vue';
export default {
    props: ['value'],
    data() {
        return {
            activeTools: [],
            formInspectionCreateUpdate: {
                tool: this.value ? this.value.tool.code : -1,
                description: this.value ? this.value.description : '',
                status: this.value ? this.value.status : -1,
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageInspections.AddInspectionPop
        },
        langsToast() {
            return langStore().getLang.PageTool.PopupAddGroupTool
        }
    },
    async mounted(){
        await this.getActiveTools();
    },
    methods: {
        async getActiveTools(){
            const data = await toolsStore().getActiveAndAvailableTools(this.formInspectionCreateUpdate.tool);
            this.activeTools = data;
        },
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        AddUpdateInspection() {
            try {
                if (this.validateDataEqualsOrEmpty({
                    tool: this.formInspectionCreateUpdate.tool,
                    status: Number(this.formInspectionCreateUpdate.status),
                    description: this.formInspectionCreateUpdate.description
                }, {
                    tool: this.$refs.formInspectionGetTool,
                    status: this.$refs.formInspectionStatus,
                    description: this.$refs.formInspectionDetail
                }, -1))
                    (async () => {
                        try {
                            this.value &&
                                await inspectionCompletedStore().update(this.value.id,
                                  {
                                        status: this.formInspectionCreateUpdate.status,
                                        additionalDescription: this.formInspectionCreateUpdate.description,
                                    }
                                );
                            !this.value &&
                                await inspectionCompletedStore().add(
                                    {
                                        tool_id: this.formInspectionCreateUpdate.tool,
                                        status: this.formInspectionCreateUpdate.status,
                                        additionalDescription: this.formInspectionCreateUpdate.description,
                                    }
                                );
                            this.$emit("closePopUp");
                            this.$emit("activeToast", {
                                msg: this.value && this.langsToast.updatedSucess || !this.value && this.langsToast.createdSucess,
                                type: ToastSuccess
                            });
                        } catch (error) {
                            console.error(error);
                            this.$emit("activeToast", {
                                msg: this.langsToast.errorCreatedUpdated,
                                type: ToastError
                            });
                        }
                    })();
            } catch (e) {
                console.log(e);
            }
        }

    },
    components: { Popoup, LabelSelectWithInputError, TextAreaLabel, ButtonIcon, Button, LabelPickOptions, LabelShowInfo },
    emits: ['activeToast','closePopUp'],
    mixins: [FormValidate]
}
</script>

<style lang="scss" scoped>

</style>