export let filtering = (obj, numberFilter, checkedFilters, name) => {
    let objApprove;
    let count = 0;
    let corrKey = obj[name].toUpperCase().trim();
    checkedFilters.map(checkedFilter => {
        if (checkedFilter.name!=="p"){
            if (name.toUpperCase() === checkedFilter.name.toUpperCase()) {
                count++;
                if (corrKey === checkedFilter.value.toUpperCase()) {
                    objApprove = true
                }
            }
        }
    })
    if (count === 0) {
        objApprove = true
    }
    if (objApprove) {
        return obj;
    } else {
        return null;
    }
}

export let filteringPrice = (obj, checkedFilter) => {
    let objApprove;
    let price_down=Number(checkedFilter.value[0])
    let price_up=Number(checkedFilter.value[1])
    let corrKey=Number(obj["p"])
    if (checkedFilter.value[0]!==null){
        if(checkedFilter.value[1]!==null){
           if(corrKey>=price_down && obj["p"]<=price_up){
               objApprove=true
           }
        }else{
            if(corrKey>=price_down){
                objApprove=true
            }
        }
    }else{
        if(checkedFilter.value[1]!==null){
            if(corrKey<=price_up){
                objApprove=true
            }
        }else {
            objApprove=true
        }
    }
    if (objApprove) {
        return obj;
    } else {
        return null;
    }
}
