const pgvalidation=(values)=>{
    let errors={}
    if(!values.name){
        errors.name="PG Name is required!"
    }
    if(!isNaN(values.name)){
        errors.name="PG Name should be character only!"
    }

    if(!values.city){
        errors.city="City is required!"
    }
    if(!isNaN(values.city)){
        errors.name="City Name should be character only!"
    }

    if(!values.locality){
        errors.locality="Locality is required!"
    }
    if(!isNaN(values.locality)){
        errors.locality="Locality Name should be character only!"
    }

    if(!values.amenities){
        errors.amenities="Please add amenities!"
    }
    
    if(!values.pgDescription){
        errors.pgDescription="PG description is required!"
    }

    if(!values.foodAvailability){
        errors.foodAvailability="Please select Food Availability!"
    }
    
    if(!values.type){
        errors.type="Please select PG type!"
    }

    if(values.noOfSingleSharing <1 ){
        errors.noOfSingleSharing="No should be greater than 0"
    }

    if(values.singleSharingPrice < 1){
        errors.singleSharingPrice="Invalid Price!"
    }

    if(values.noOfDoubleSharing <1 ){
        errors.noOfDoubleSharing="No should be greater than 0"
    }

    if(values.doubleSharingPrice <1){
        errors.doubleSharingPrice="Invalid Price!"
    }

    if(values.noOfTripleSharing <1 ){
        errors.noOfTripleSharing="No should be greater than 0"
    }

    if(values.tripleSharingPrice <1){
        errors.tripleSharingPrice="Invalid Price!"
    }
    
    return errors;
}

export default pgvalidation;