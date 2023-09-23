/*
 * @Description: 
 * @Version: 2.0
 * @Author: Gina
 * @Date: 2023-09-06 15:03:15
 * @LastEditors: Gina
 * @LastEditTime: 2023-09-24 01:33:57
 */


export type Week = {
    name: string
    value: string[]
}
export type WeekLans = {
    [attr:string]: string[]
}
class FormatSetting {
    weekLans:WeekLans = {
        zh: Array.from('日一二三四五六').map(v => '周' + v),
        en: ['Sun.','Mon.','Tues.','Wed.','Thur.','Fri.','Sat.']
    }
    constructor(...lans:Week[]) {
        if(lans) this.addWeekLans(...lans);
        return this
    }
    format = (date: Date, formatStr:string, weekLan:string = 'zh'):string => {
        const currentDate = new Date(date)
        if(isNaN(currentDate.getDay())) return '日期格式错误';
        const formater = formatStr.replace(/\s+/g, ' ')
        const __Date = {
            year: '',
            month: '',
            day: '',
            week: '',
            hour: '',
            minute: '',
            second: '',
        }
        const M = formater.match(/M+/g)
        M?.forEach((type) => Object.assign(__Date, this.setAttr(type, currentDate)))
        formater
            .replace(/M+/g, '')
            .toLowerCase()
            .match(/[m|y|d|w|h|s]+/g)
            ?.forEach((type) => Object.assign(__Date, this.setAttr(type, currentDate)))
        const result = formatStr
            .replace(/m+/g, __Date.minute)
            .replace(/M+/g, __Date.month)
            .toLowerCase()
            .replace(/y+/g, __Date.year)
            .replace(/d+/g, __Date.day)
            .replace(/w+/g, this.weekLans[weekLan as keyof typeof this.weekLans ][Number(__Date.week)])
            .replace(/h+/g, __Date.hour)
            .replace(/s+/g, __Date.second)
        
        return result
    }

    setAttr = (type:string, date:Date) => {
        const str = type.toLowerCase()
        if(/^y+$/g.test(str)) {//年
            const l = type.length
            const y = date.getFullYear().toString()
            return {year: y.slice(l > y.length - 1 ? 0 : l)}
        } 
        if(/^M+$/g.test(type)) {//月
            return {month: this.padStart(date.getMonth() + 1, type.length)}
        } 
        
        if (/^d+$/g.test(str)) {//日
            return {day: this.padStart(date.getDate(), type.length)}
        }
        
        if (/^w+$/g.test(type)) {//星期
            return {week: date.getDay().toString()}
        }
        
        if (/^h+$/g.test(str)) {//时
            return {hour: this.padStart(date.getHours(), type.length)}
        }
        
        if (/^m+$/g.test(type)) {//分
            return {minute: this.padStart(date.getMinutes(), type.length)}
        }
        
        if (/^s+$/g.test(str)) {//秒
            return {second: this.padStart(date.getSeconds(), type.length)}
        } 
        return {}
    }
    
    padStart = (temp: string | number, length:number) => {
        const result = temp.toString()
        return result.padStart(length, '0')
    } 
    addWeekLans = (...lans:Week[]) => {
        lans.forEach((v:Week) => {
            this.weekLans[v.name as keyof typeof this.addWeekLans] = v.value
        })
    }
}
export default FormatSetting