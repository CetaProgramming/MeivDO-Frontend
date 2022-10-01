<template>
    <Popoup :titlePopUp="langs.Title" class="font-meivdo">
        <form class="flex flex-col gap-5">
            <div
                class="font-openSans grid grid-cols-1 items-center gap-5 md:gap-1  lg:grid-cols-1fr-auto md:justify-between ">
                <div class="flex flex-col gap-7">
                    <InputLabelError ref="formToolCreateName" v-model="formToolCreateUpdate.code"
                        :placeholder="langs.Placeholder" msg="langs.NameError" :name="langs.Code"
                        :default="formToolCreateUpdate.code" />
                        <div class="flex flex-col md:flex-row gap-5 ">
                            <SelectLabelError class="w-full" ref="formTollCreateGroup" :msg="langs.CodeError" :items="groupTools" :name="langs.GroupTools"
                        :default="formToolCreateUpdate.id" v-model="formToolCreateUpdate.groupTool" />
                        <SwitchLabel v-if="showActive"  v-model="formToolCreateUpdate.active" @change="changeValue"
                        :default="Boolean(formToolCreateUpdate.active)  " :name="langs.Active" />
                        </div>
                        
                </div>
            </div>
<Button :text="langs.Save"></Button>
        </form>
    </Popoup>
    <!-- v-if="showActive" -->
</template>

<script>
import Popoup from '../../public/Popoup.vue';
import { langStore } from '../../../store/langStore';
import InputLabelError from '../../forms/InputLabelError.vue';
import SelectLabelError from '../../forms/SelectLabelError.vue';
import SwitchLabel from '../../forms/SwitchLabel.vue';
import Button from '../../widgets/Button.vue';
export default {
    data() {
        return {
            formToolCreateUpdate: {
                code: this.code ? this.tool.code : '',
                id: this.tool ? this.tool.id : '',
                groupTool: this.tool ? this.tool.GroupTool : '',
                active: this.tool ? this.tool.active : '',
            }
        };
    },
    computed: {
        langs() {
            return langStore().getLang.PageTool.PopupAddTool
        }
    },
    methods:{
        changeValue() {
            this.formToolCreateUpdate.active = Number(this.formToolCreateUpdate.active)
        },
    },
    components: { Popoup, InputLabelError, SelectLabelError, SwitchLabel, Button }
}
</script>
