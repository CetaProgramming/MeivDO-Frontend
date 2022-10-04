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

    static formDate(data){
        if(!data)
            return;
        let dataForm = data;
        if(typeof Date !== dataForm)
            dataForm = new Date(data);
        return new Intl.DateTimeFormat(Navigator.language).format(dataForm) 
    }

    static formInputDate(data){
        if(!data)
            return;
        let dataForm = data;
        if(typeof Date !== dataForm)
            dataForm = new Date(data);
        console.log(dataForm.toISOString().split('T')[0]);
        return dataForm.toISOString().split('T')[0]
    }
}

export default DataManipulate;