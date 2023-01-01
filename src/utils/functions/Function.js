export function verifyObjectFieldsNotNull(object){
    for (let key in object) {
        if (object[key] === null || object[key] === "")
            return false;
    }
    return true;
}

export function customTime(time) {
    const times = time.split(":");
    return `${times[0]}:${times[1]}`;
}