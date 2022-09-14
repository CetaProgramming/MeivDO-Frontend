class DataManipulate{
    
    static formDataImage(data, method = false){
        const dataForm = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if(value instanceof File && !dataForm.has("_method") || !dataForm.has("_method") && method)
                dataForm.append("_method", "PUT");
            dataForm.append(key, value);
        });
        return dataForm;
    }
}

export default DataManipulate;