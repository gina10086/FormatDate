export type Week = {
    name: string;
    value: string[];
};
export type WeekLans = {
    [attr: string]: string[];
};
declare class FormatSetting {
    weekLans: WeekLans;
    constructor(...lans: Week[]);
    format: (date: Date, formatStr: string, weekLan?: string) => string;
    setAttr: (type: string, date: Date) => {
        year: string;
        month?: undefined;
        day?: undefined;
        week?: undefined;
        hour?: undefined;
        minute?: undefined;
        second?: undefined;
    } | {
        month: string;
        year?: undefined;
        day?: undefined;
        week?: undefined;
        hour?: undefined;
        minute?: undefined;
        second?: undefined;
    } | {
        day: string;
        year?: undefined;
        month?: undefined;
        week?: undefined;
        hour?: undefined;
        minute?: undefined;
        second?: undefined;
    } | {
        week: string;
        year?: undefined;
        month?: undefined;
        day?: undefined;
        hour?: undefined;
        minute?: undefined;
        second?: undefined;
    } | {
        hour: string;
        year?: undefined;
        month?: undefined;
        day?: undefined;
        week?: undefined;
        minute?: undefined;
        second?: undefined;
    } | {
        minute: string;
        year?: undefined;
        month?: undefined;
        day?: undefined;
        week?: undefined;
        hour?: undefined;
        second?: undefined;
    } | {
        second: string;
        year?: undefined;
        month?: undefined;
        day?: undefined;
        week?: undefined;
        hour?: undefined;
        minute?: undefined;
    } | {
        year?: undefined;
        month?: undefined;
        day?: undefined;
        week?: undefined;
        hour?: undefined;
        minute?: undefined;
        second?: undefined;
    };
    padStart: (temp: string | number, length: number) => string;
    addWeekLans: (...lans: Week[]) => void;
}
export default FormatSetting;
