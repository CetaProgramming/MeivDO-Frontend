import { ref } from "vue";

export default{
    methods: {
        validateData(data, refs){
            const error = ref(true);
            const dataForm = JSON.parse(JSON.stringify(data));
            Object.entries(dataForm).forEach(([key, value]) => {
                if(!value){
                    refs[key].isError = true;
                    error.value = false;
                }
            });
            return error.value;
        },
        validateDataEqualsOrEmpty(data, refs, valueCompare){
            const error = ref(true);
            const dataForm = JSON.parse(JSON.stringify(data));
            Object.entries(dataForm).forEach(([key, value]) => {
                if(!value || this.equalData(value, valueCompare)){
                    refs[key].isError = true;
                    error.value = false;
                }
            });
            return error.value;
        },
        equalData(data1, data2){
            return data1 === data2;
        }
    }
}