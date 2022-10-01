const loginvalidation=(values)=>{
    let errors={}
    if(!values.email){
        errors.email="Email id is required"
    }
    
    if(!values.password){
        errors.password="Password is required"
    }    
    return errors;
}

export default loginvalidation;