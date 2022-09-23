class DataManipulate{
    
    static formDataImage(data, method = false){
        const dataForm = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if( method)
                dataForm.append("_method", "PUT");
            dataForm.append(key, value);
        });
        return dataForm;
    }
}

export default DataManipulate;