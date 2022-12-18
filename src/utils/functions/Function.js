export function verifyObjectFieldsNotNull(object){
    for (let key in object) {
        if (object[key] === null || object[key] === "")
            return false;
    }
    return true;
}