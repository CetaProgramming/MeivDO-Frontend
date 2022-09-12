class DataManipulate{
    
    static formData(data){
        const dataForm = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if(value instanceof File && !dataForm.has("_method"))
                dataForm.append("_method", "PUT");
            dataForm.append(key, value);
        });
        return dataForm;
    }
}

export default DataManipulate;