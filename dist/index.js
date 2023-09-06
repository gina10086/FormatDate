"use strict";
/*
 * @Description:
 * @Version: 2.0
 * @Author: Gina
 * @Date: 2023-09-06 15:03:15
 * @LastEditors: Gina
 * @LastEditTime: 2023-09-06 22:16:01
 */
Object.defineProperty(exports, "__esModule", { value: true });
class FormatSetting {
    constructor(...lans) {
        this.weekLans = {
            zh: Array.from('一二三四五六日').map(v => '周' + v),
            en: ['Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', 'Sun.']
        };
        this.format = (date, formatStr, weekLan = 'zh') => {
            const currentDate = new Date(date);
            if (isNaN(currentDate.getDay()))
                return date;
            const formater = formatStr.replace(/\s+/g, ' ');
            const __Date = {
                year: '',
                month: '',
                day: '',
                week: '',
                hour: '',
                minute: '',
                second: '',
            };
            formater.split(' ')
                .forEach(str => {
                const regEx = /[@\-.:年月日时分秒周]/g;
                str
                    .split(regEx)
                    .forEach((type) => Object.assign(__Date, this.setAttr(type, currentDate)));
            });
            const result = formatStr
                .replace(/m+/g, __Date.minute)
                .replace(/M+/g, __Date.month)
                .toLowerCase()
                .replace(/y+/g, __Date.year)
                .replace(/d+/g, __Date.day)
                .replace(/w+/g, this.weekLans[weekLan][Number(__Date.week) - 1])
                .replace(/h+/g, __Date.hour)
                .replace(/s+/g, __Date.second);
            return result;
        };
        this.setAttr = (type, date) => {
            const str = type.toLowerCase();
            if (/^y+$/g.test(str)) { //年
                const l = type.length;
                const y = date.getFullYear().toString();
                return { year: y.slice(l > y.length - 1 ? 0 : l) };
            }
            if (/^M+$/g.test(type)) { //月
                return { month: this.padStart(date.getMonth() + 1, type.length) };
            }
            if (/^d+$/g.test(str)) { //日
                return { day: this.padStart(date.getDate(), type.length) };
            }
            if (/^w+$/g.test(type)) { //星期
                return { week: date.getDay().toString() };
            }
            if (/^h+$/g.test(str)) { //时
                return { hour: this.padStart(date.getHours(), type.length) };
            }
            if (/^m+$/g.test(type)) { //分
                return { minute: this.padStart(date.getMinutes(), type.length) };
            }
            if (/^s+$/g.test(str)) { //秒
                return { second: this.padStart(date.getSeconds(), type.length) };
            }
            return {};
        };
        this.padStart = (temp, length) => {
            const result = temp.toString();
            return result.padStart(length, '0');
        };
        this.addWeekLans = (...lans) => {
            lans.forEach((v) => {
                this.weekLans[v.name] = v.value;
            });
        };
        if (lans)
            this.addWeekLans(...lans);
        return this;
    }
}
exports.default = FormatSetting;
//# sourceMappingURL=index.js.map