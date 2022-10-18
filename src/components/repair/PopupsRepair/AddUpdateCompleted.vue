<!-- <template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo" @closePopUp="$emit('closePopUp')">
        <form @submit.prevent="AddUpdateRepair" class="flex flex-col gap-5 font-openSans">
            <LabelSelectWithInputError v-if="!this.value" ref="formRepairGetTool" :name="langs.Tools" v-model="formRepairCreateUpdate.tool" :default="formRepairCreateUpdate.tool"
            :items="activeTools" itemFilter="code" :placeholder="langs.OptionTool" />

            <div v-else>dasdsa</div>

               <TextAreaLabel ref="formRepairDetail" :name="langs.Description"
                    :placeholder="langs.PlaceholderDescription" :msg="langs.DescriptionError" v-model="formRepairCreateUpdate.description" :default="formRepairCreateUpdate.description">  
                </TextAreaLabel>
               <LabelPickOptions ref="formRepairStatus" v-model="formRepairCreateUpdate.status" :name="langs.LabelText" :text="langs.TextButtons" :msg="langs.SelectButton" /> 
            <Button :text="langs.Save"></Button>
        </form>
    </Popoup>
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore'
import {repairCompletedStore} from '../../../store/repairCompletedStore'
import {toolsStore} from '../../../store/toolsStore'
import LabelSelectWithInputError from '../../forms/LabelSelectWithInputError.vue';
import TextAreaLabel from '../../forms/TextAreaLabel.vue';
import ButtonIcon from '../../widgets/ButtonIcon.vue';
import Button from '../../widgets/Button.vue';
import LabelPickOptions from '../../forms/LabelPickOptions.vue';
import ToastError from "../../public/Toast/ToastError.vue"
import ToastSuccess from "../../public/Toast/ToastSuccess.vue"
import FormValidate from "../../mixins/FormValidate";
export default {
    props: ['value'],
    data() {
        return {
            activeTools: [],
            formRepairCreateUpdate: {
                tool: this.value ? this.value.tool.code : -1,
                description: this.value ? this.value.description : '',
                status: this.value ? this.value.status : -1,
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageRepairs.AddRepairPop
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
            const data = await toolsStore().getActiveAndAvailableTools(this.formRepairCreateUpdate.tool);
            this.activeTools = data;
        },
        activeToast(toast) {
            this.$emit('activeToast', toast);
        },
        AddUpdateRepair() {
            try {
                if (this.validateDataEqualsOrEmpty({
                    tool: this.formRepairCreateUpdate.tool,
                    status: Number(this.formRepairCreateUpdate.status),
                    description: this.formRepairCreateUpdate.description
                }, {
                    tool: this.$refs.formRepairGetTool,
                    status: this.$refs.formRepairStatus,
                    description: this.$refs.formRepairDetail
                }, -1))
                    (async () => {
                        try {
                            this.value &&
                                await repairCompletedStore().update(this.value.id,
                                  {
                                        tool_id: this.formRepairCreateUpdate.tool,
                                        status: this.formRepairCreateUpdate.status,
                                        additionalDescription: this.formRepairCreateUpdate.description,
                                    }
                                );
                            !this.value &&
                                await repairCompletedStore().add(
                                    {
                                        tool_id: this.formRepairCreateUpdate.tool,
                                        status: this.formRepairCreateUpdate.status,
                                        additionalDescription: this.formRepairCreateUpdate.description,
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
    components: { Popoup, LabelSelectWithInputError, TextAreaLabel, ButtonIcon, Button, LabelPickOptions },
    emits: ['activeToast','closePopUp'],
    mixins: [FormValidate]
}
</script> -->