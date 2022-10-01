const bookingValidation = (values) => {
    let errors = {};
    const today = new Date();
    // console.log("today : " + today);
    // console.log("start : " + values.startDate);
    // console.log("end : " + values.endDate);

    if(!values.sharingType){
        errors.sharingType = "Sharing Type is required!!!"
    }

    if (!values.startDate) {
        errors.startDate = "Start Date is required!!!";
    }
    else if(new Date(values.startDate) < today){
        errors.startDate = "Start Date cannot be in past!!!";
    }

    if (!values.endDate) {
        errors.endDate = "End Date is required!!!";
    }else if(values.endDate <= values.startDate){
        errors.endDate = "End Date must be after Start Date!!!";
    }


    return errors;
};

export default bookingValidation;
