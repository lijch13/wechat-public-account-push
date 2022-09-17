import { selfDayjs } from './set-def-dayjs.js'
import { Solar } from 'lunar-javascript'
import { config } from '../../config/index.js'

/**
 * 驼峰转下划线
 * @param {*} str
 * @returns
 */
export const toLowerLine = (str) => {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return '_' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '_') { //如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}


/**
 * 获取随机颜色
 * @returns
 */
export const getColor = () => {
  if (!config.IS_SHOW_COLOR) {
    return undefined
  }
  return `#${ Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0') }`
}


/**
 * 生成一个从min 到 max 的随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 对生日时间倒计时进行排序
 * @param {*} list
 * @returns
 */
export const sortBirthdayTime = (list) => {
  list.forEach(item => {
     console.log("明年的日期")
    console.log(selfDayjs().format('YYYY') + '-' + (item.useLunar ? item.solarDateInThissYear : item.date))
    const diffDay = Math.ceil(selfDayjs(selfDayjs().format('YYYY') + '-' + (item.useLunar ? item.solarDateInThisYear : item.date)).diff(selfDayjs(), 'day', true))
    if (diffDay >= 0) {
      item['diffDay'] = diffDay
    } else {
      item['diffDay'] = Math.ceil(selfDayjs(selfDayjs().add(1, 'year').format('YYYY') + '-' + (item.useLunar ? item.solarDateInThisYear : item.date)).diff(selfDayjs(), 'day', true))
    }
  })
  return list.sort((a, b) =>
    a.diffDay > b.diffDay ? 1 : -1
  )
}

/**
 * 根据月日获取星座信息
 * @param {string} date 
 * @returns
 */
export const getConstellation = (date) => {
  const year = selfDayjs().year()
  const constellationCn = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼']
  const constellationEn = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
  const [month, day] = date.split('-').map(Number)
  const solar = Solar.fromYmd(year, month, day)
  const cn = solar.getXingZuo();
  return {
    cn,
    en: constellationEn[constellationCn.indexOf(cn)]
  }
}
