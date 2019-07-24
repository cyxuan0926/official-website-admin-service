'use strict';

/**
 * 格式化日期
 * @param {Number || Object || String} time 时间戳或者标准格式的时间对象 || 字符串
 * @param {String} format 描述日期格式的字符串
 * @param {Boolean} isFillZero 是否需要补0
 * @return {String} 格式化之后的日期字符串，默认为当前时间
 *                  默认格式为'yyyy/MM/dd hh:mm:ss'，且会自动补零
 *
 * @example
 *
 * formatTime(new Date(2017, 5, 3, 6, 7, 8), 'yyyy年MM月dd日 hh:mm:ss')
 * // => "2017年06月03日 06:07:08"
 *
 * formatTime(1502268008000, 'yyyy年MM月dd日 hh:mm:ss', false)
 * // => "2017年8月9日 16:40:8"
 *
 * formatTime('Fri Jun 29 2018 17:20:08 GMT+0800 (中国标准时间)')
 * // => "2018/06/29 17:20:08"
 *
 * formatTime(new Date(2017, 5, 3), 'MM-dd-yy hh:mm:ss')
 * // => "06-03-17 00:00:00"
 */
function formatTime(
  time = Date.now(),
  format = 'yyyy-MM-dd hh:mm:ss',
  isFillZero = true
) {
  const date = new Date(time);
  const cell = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  for (const key in cell) {
    if (cell.hasOwnProperty(key)) {
      format = format.replace(new RegExp(key), function(match) {
        return isFillZero ? ('0' + cell[key]).slice(-match.length) : cell[key];
      });
    }
  }

  return format;
}

module.exports = { formatTime };
