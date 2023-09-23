## &#x20;安装



    npm i formatdate-ts



## 使用



```javascript
import formatDate from "formatdate-ts"
import type { Week } from "formatdate-ts"

const formatSetting = new formatDate() // ...args:Week[] 可加参数配置周相关显示默认为中文

const d = new Date()

formatSetting.format(d, 'yyyy-MM-dd w hh:mm:ss', 'zh') 
// 2023-09-07 周四 01:36:50
formatSetting.format(d, 'yyyy-MM-dd hh:mm:ss', 'zh') 
// 2023-09-07 01:36:50
formatSetting.format(d, 'yyyy') 
// 2023
formatSetting.format(d, 'yy') 
// 23
formatSetting.format(d, 'yyyy年M月dd w hh时mm分ss秒') 
// 2023年9月07日 周四 1时36分50秒
```



## &#x20;参数说明

### &#x20;formatSetting(...args\:Week\[] )



```javascript
new formatSetting({attr: 'zh', value: ['周日','周一', '周二', '周三', '周四', '周五', '周六']}, {'en', value: ['Sun.','Mon.','Tues.','Wed.','Thur.','Fri.','Sat.']})
```

| 参数名  | 备注                                                                 |
| :--- | :----------------------------------------------------------------- |
| week | object, {attr, value};attr: string,语言名称， value: string\[], 每天周数的名称 |

### formatSetting.format(dateString, formatString, weekLan)



| 参数名          | 备注                                      |
| :----------- | :-------------------------------------- |
| dateString   | 必填，Date格式，需要格式化的Date数据                  |
| formatString | 必填，string，详情见下方format 格式说明              |
| weekLan      | 选填，string，默认‘zh’。设置的周的名称（Week.attr）解析类型 |

## format 格式说明

不论这个格式字符串长得什么样子，只替换对应的格式名，且根据格式名的长度进行转换；

```javascript
const d = new Date()
console.log(dateFormat(d, 'yY爱啥啥M月dd日 w h时m分s秒'))
//23爱啥啥9月7日 周四 2时24分19秒
```

| 格式名 | 值                                                                           |
| :-- | :-------------------------------------------------------------------------- |
| 年   | y/Y，连写代表长度，但是不能超Date.getFullYear()的长度，超出默认显示全部。如： yy ：23， yYy：023，yyyy：2023 |
| 月   | M，连写表示长度。如： MM：01， MMM：0001，M：1                                             |
| 日   | d/D，连写表示长度。如：d: 5, DD: 05                                                   |
| 周   | w/W, 具体看weekLan类型，默认为中文，如： 周一。                                              |
| 时   | h/H,连写表示长度。如：h: 5, HH: 05                                                   |
| 分   | m,连写表示长度。如：m: 5, m: 05                                                      |
| 秒   | s/S,连写表示长度。如：s: 5, SS: 05                                                   |

