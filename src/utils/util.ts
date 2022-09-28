import * as moment from "moment-timezone";
export function randomString(len: number) {
    const charSet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

export function checkPassDate(now: string, userdate: string, month: number) {
    const nowDate = new Date(now);
    const userDate = new Date(userdate);
    userDate.setMonth(userDate.getMonth() + month);
    if (nowDate > userDate) return false;
    return true;
}

export function getTime(noTime = false) {
    if (noTime) return moment().tz("Asia/Seoul").format("YYYY-MM-DD"); // '2016-05-01 20:14:28 +0900'

    return moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"); // '2016-05-01 20:14:28 +0900'
}

export function isEmpty(value: any) {
    if (value === null) return true;
    if (typeof value === "undefined") return true;
    if (typeof value === "string" && value === "") return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (
        typeof value === "object" &&
        value.constructor.name === "Object" &&
        Object.keys(value).length < 1 &&
        Object.getOwnPropertyNames(value).length < 1
    )
        return true;
    if (typeof value === "object" && value.constructor.name === "String" && Object.keys(value).length < 1) return true; // new String()

    return false;
}
