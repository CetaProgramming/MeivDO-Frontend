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

    static formDate(data, operator ="/"){
        if(!data)
            return;
        let dataForm = data;
        if(typeof Date !== dataForm)
            dataForm = new Date(data);
        return `${String(dataForm.getDay()).padStart(2,'0')}${operator}${String(dataForm.getMonth()).padStart(2,'0')}${operator}${dataForm.getFullYear()}`;
        
    }
}

export default DataManipulate;