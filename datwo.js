"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Datwo = exports.Date = void 0;
class Datwo extends Date {
  format(format = 'YYYY-MM-DDThh:mm:ss.CCCZ') {
    const T = this.getTime();
    const YYYY = this.getFullYear().toString();
    const YY = YYYY.substring(2);
    const M = this.getMonth() + 1;
    const MM = (M < 10 ? '0' : '') + M;
    const D = this.getDate();
    const DD = (D < 10 ? '0' : '') + D;
    const startday = new Date(YYYY + '-01-01');
    const diff = T - startday.getTime() + (startday.getTimezoneOffset() - this.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    let DDDa = Math.floor(diff / oneDay);
    DDDa = (DDDa < 10 ? '0' : '') + DDDa;
    DDDa = (DDDa < 100 ? '0' : '') + DDDa;
    const DDD = DDDa;
    const h = this.getHours();
    const hh = (h < 10 ? '0' : '') + h;
    const hm = h % 12;
    const hhm = (hm < 10 ? '0' : '') + hm;
    const m = this.getMinutes();
    const mm = (m < 10 ? '0' : '') + m;
    const mmmm = h * 60 + m;
    const s = this.getSeconds();
    const ss = (s < 10 ? '0' : '') + s;
    const sssss = mmmm * 60 + s;
    let CCC = this.getMilliseconds();
    if (CCC < 10) {
      CCC = '00' + CCC;
    } else if (CCC < 100) {
      CCC = '0' + CCC;
    }
    const CC = CCC.toString().slice(0, -1);
    const C = CC.toString().slice(0, -1);
    let DH = '';
    if (1 <= hh * 1 && hh * 1 <= 3) {
      DH = 'Night';
    } else if (1 <= hh * 4 && hh * 1 <= 5) {
      DH = 'Daybreak';
    } else if (6 <= hh * 1 && hh * 1 <= 8) {
      DH = 'Morning';
    } else if (9 <= hh * 1 && hh * 1 <= 12) {
      DH = 'Daytime';
    } else if (13 <= hh * 1 && hh * 1 <= 17) {
      DH = 'Afternoon';
    } else if (18 <= hh * 1 && hh * 1 <= 21) {
      DH = 'Evening';
    } else if (22 <= hh * 1 && hh * 1 <= 24 || hh * 1 == 0) {
      DH = 'Night';
    }
    let DHK = '';
    if (1 <= hh * 1 && hh * 1 <= 5) {
      DHK = '새벽';
    } else if (6 <= hh * 1 && hh * 1 <= 8) {
      DHK = '아침';
    } else if (9 <= hh * 1 && hh * 1 <= 12) {
      DHK = '낮';
    } else if (13 <= hh * 1 && hh * 1 <= 17) {
      DHK = '오후';
    } else if (18 <= hh * 1 && hh * 1 <= 21) {
      DHK = '저녁';
    } else if (22 <= hh * 1 && hh * 1 <= 24 || hh * 1 == 0) {
      DHK = '밤';
    }
    const APM = h < 13 ? 'AM' : 'PM';
    const APMK = h < 13 ? '오전' : '오후';
    format = format + '';
    format = format.replace(/YYYY/g, YYYY);
    format = format.replace(/YY/g, YY);
    format = format.replace(/MM/g, MM);
    format = format.replace(/M/g, M);
    format = format.replace(/DDD/g, DDD);
    format = format.replace(/DD/g, DD);
    format = format.replace(/D/g, D);
    format = format.replace(/hhhh/g, hhm);
    format = format.replace(/hhh/g, hm);
    format = format.replace(/hh/g, hh);
    format = format.replace(/h/g, h);
    format = format.replace(/mmmm/g, mmmm);
    format = format.replace(/mm/g, mm);
    format = format.replace(/m/g, m);
    format = format.replace(/sssss/g, sssss);
    format = format.replace(/ss/g, ss);
    format = format.replace(/s/g, s);
    format = format.replace(/CCC/g, CCC);
    format = format.replace(/CC/g, CC);
    format = format.replace(/C/g, C);
    format = format.replace(/GK/g, DHK);
    format = format.replace(/G/g, DH);
    format = format.replace(/NK/g, APMK);
    format = format.replace(/N/g, APM);
    return format;
  }
  compare(target = this, options = {}) {
    if (!target || !target.getTime) {
      target = new Date(target);
    }
    const BLOCK = {
      YEAR: 1000 * 60 * 60 * 24 * 365,
      MONTH: 1000 * 60 * 60 * 24 * 30,
      DAY: 1000 * 60 * 60 * 24,
      HOUR: 1000 * 60 * 60,
      MINUTE: 1000 * 60,
      SECOND: 1000
    };
    const C = this.getTime();
    const T = target.getTime();
    let M = T - C;
    if (!options.lang) {
      options.lang = 'ko_kr';
    }
    if (!options.detail) {
      options.detail = 'HOUR';
    }
    switch (options.lang) {
      case 'ko_kr':
        {
          return ko_kr();
          break;
        }
      case 'en_us':
        {
          return en_us();
          break;
        }
      default:
        {
          return ko_kr();
          break;
        }
    }
    function ko_kr() {
      if (M == 0) {
        return '지금';
      } else if (M < 0) {
        M = Math.abs(M);
        if (BLOCK.YEAR <= M) {
          const N = Math.floor(M / BLOCK.YEAR);
          switch (N) {
            case 1:
              {
                return '작년';
              }
            case 2:
              {
                return '재작년';
              }
            default:
              {
                return N + '년 전';
              }
          }
        } else if (BLOCK.MONTH <= M) {
          if (options.detail == 'YEAR') {
            return '방금 전';
          }
          const N = Math.floor(M / BLOCK.MONTH);
          switch (N) {
            case 1:
              {
                return '한 달 전';
              }
            case 2:
              {
                return '두 달 전';
              }
            case 3:
              {
                return '세 달 전';
              }
            case 4:
              {
                return '네 달 전';
              }
            case 5:
              {
                return '다섯 달 전';
              }
            case 6:
              {
                return '여섯 달 전';
              }
            case 7:
              {
                return '일곱 달 전';
              }
            case 8:
              {
                return '여덟 달 전';
              }
            case 9:
              {
                return '아홉 달 전';
              }
            case 10:
              {
                return '열 달 전';
              }
            case 11:
              {
                return '열한 달 전';
              }
            case 12:
              {
                return '열두 달 전';
              }
            default:
              {
                return N + '개월 전';
              }
          }
        } else if (BLOCK.DAY <= M) {
          if (options.detail == 'MONTH') {
            return '방금 전';
          }
          const N = Math.floor(M / BLOCK.DAY);
          switch (N) {
            case 1:
              {
                return '어제';
              }
            case 2:
              {
                return '그저께';
              }
            case 3:
              {
                return '사흘 전';
              }
            case 4:
              {
                return '나흘 전';
              }
            case 5:
              {
                return '닷새 전';
              }
            case 6:
              {
                return '엿새 전';
              }
            case 7:
              {
                return '7일 전';
              }
            case 8:
              {
                return '8일 전';
              }
            case 9:
              {
                return '9일 전';
              }
            case 10:
              {
                return '열흘 전';
              }
            case 15:
              {
                return '보름 전';
              }
            default:
              {
                return N + '일 전';
              }
          }
        } else if (BLOCK.HOUR <= M) {
          if (options.detail == 'DAY') {
            return '방금 전';
          }
          const N = Math.floor(M / BLOCK.HOUR);
          switch (N) {
            case 1:
              {
                return '한 시간 전';
              }
            case 2:
              {
                return '두 시간 전';
              }
            case 3:
              {
                return '세 시간 전';
              }
            case 4:
              {
                return '네 시간 전';
              }
            case 5:
              {
                return '다섯 시간 전';
              }
            case 6:
              {
                return '여섯 시간 전';
              }
            case 7:
              {
                return '일곱 시간 전';
              }
            case 8:
              {
                return '여덟 시간 전';
              }
            case 9:
              {
                return '아홉 시간 전';
              }
            case 10:
              {
                return '열 시간 전';
              }
            default:
              {
                return N + '시간 전';
              }
          }
        } else if (BLOCK.MINUTE <= M) {
          if (options.detail == 'HOUR') {
            return '방금 전';
          }
          const N = Math.floor(M / BLOCK.MINUTE);
          return N + '분 전';
        } else if (BLOCK.SECOND <= M) {
          if (options.detail == 'MINUTE') {
            return '방금 전';
          }
          const N = Math.floor(M / BLOCK.SECOND);
          return N + '초 전';
        } else {
          if (options.detail == 'SECOND') {
            return '방금 전';
          }
          const N = M;
          return N + '밀리초 전';
        }
      } else if (0 < M) {
        if (BLOCK.YEAR <= M) {
          const N = Math.floor(M / BLOCK.YEAR);
          switch (N) {
            case 1:
              {
                return '내년';
              }
            case 2:
              {
                return '내후년';
              }
            default:
              {
                return N + '년 후';
              }
          }
        } else if (BLOCK.MONTH <= M) {
          if (options.detail == 'YEAR') {
            return '조금 뒤';
          }
          const N = Math.floor(M / BLOCK.MONTH);
          switch (N) {
            case 1:
              {
                return '한 달 후';
              }
            case 2:
              {
                return '두 달 후';
              }
            case 3:
              {
                return '세 달 후';
              }
            case 4:
              {
                return '네 달 후';
              }
            case 5:
              {
                return '다섯 달 후';
              }
            case 6:
              {
                return '여섯 달 후';
              }
            case 7:
              {
                return '일곱 달 후';
              }
            case 8:
              {
                return '여덟 달 후';
              }
            case 9:
              {
                return '아홉 달 후';
              }
            case 10:
              {
                return '열 달 후';
              }
            case 11:
              {
                return '열한 달 후';
              }
            case 12:
              {
                return '열두 달 후';
              }
            default:
              {
                return N + '개월 후';
              }
          }
        } else if (BLOCK.DAY <= M) {
          if (options.detail == 'MONTH') {
            return '조금 뒤';
          }
          const N = Math.floor(M / BLOCK.DAY);
          switch (N) {
            case 1:
              {
                return '내일';
              }
            case 2:
              {
                return '모레';
              }
            case 3:
              {
                return '사흘 후';
              }
            case 4:
              {
                return '나흘 후';
              }
            case 5:
              {
                return '닷세 후';
              }
            case 6:
              {
                return '엿세 후';
              }
            case 7:
              {
                return '7일 후';
              }
            case 8:
              {
                return '8일 후';
              }
            case 9:
              {
                return '9일 후';
              }
            case 10:
              {
                return '열흘 후';
              }
            case 15:
              {
                return '보름 후';
              }
            default:
              {
                return N + '일 후';
              }
          }
        } else if (BLOCK.HOUR <= M) {
          if (options.detail == 'DAY') {
            return '조금 뒤';
          }
          const N = Math.floor(M / BLOCK.HOUR);
          switch (N) {
            case 1:
              {
                return '한 시간 후';
              }
            case 2:
              {
                return '두 시간 후';
              }
            case 3:
              {
                return '세 시간 후';
              }
            case 4:
              {
                return '네 시간 후';
              }
            case 5:
              {
                return '다섯 시간 후';
              }
            case 6:
              {
                return '여섯 시간 후';
              }
            case 7:
              {
                return '일곱 시간 후';
              }
            case 8:
              {
                return '여덟 시간 후';
              }
            case 9:
              {
                return '아홉 시간 후';
              }
            case 10:
              {
                return '열 시간 후';
              }
            default:
              {
                return N + '시간 후';
              }
          }
        } else if (BLOCK.MINUTE <= M) {
          if (options.detail == 'HOUR') {
            return '조금 뒤';
          }
          const N = Math.floor(M / BLOCK.MINUTE);
          return N + '분 후';
        } else if (BLOCK.SECOND <= M) {
          if (options.detail == 'MINUTE') {
            return '조금 뒤';
          }
          const N = Math.floor(M / BLOCK.SECOND);
          return N + '초 후';
        } else {
          if (options.detail == 'SECOND') {
            return '조금 뒤';
          }
          const N = M;
          return N + '밀리초 후';
        }
      }
    }
    function en_us() {
      if (M == 0) {
        return 'now';
      } else if (M < 0) {
        M = Math.abs(M);
        if (BLOCK.YEAR <= M) {
          const N = Math.floor(M / BLOCK.YEAR);
          switch (N) {
            default:
              {
                if (N == 1) {
                  return N + ' year ago';
                } else {
                  return N + ' years ago';
                }
              }
          }
        } else if (BLOCK.MONTH <= M) {
          if (options.detail == 'YEAR') {
            return 'just before';
          }
          const N = Math.floor(M / BLOCK.MONTH);
          if (N == 1) {
            return N + ' month ago';
          } else {
            return N + ' months ago';
          }
        } else if (BLOCK.DAY <= M) {
          if (options.detail == 'MONTH') {
            return 'just before';
          }
          const N = Math.floor(M / BLOCK.DAY);
          switch (N) {
            case 1:
              {
                return 'yesterday';
              }
            default:
              {
                return N + ' days ago';
              }
          }
        } else if (BLOCK.HOUR <= M) {
          if (options.detail == 'DAY') {
            return 'just before';
          }
          const N = Math.floor(M / BLOCK.HOUR);
          switch (N) {
            default:
              {
                if (N == 1) {
                  return N + ' hour ago';
                } else {
                  return N + ' hours ago';
                }
              }
          }
        } else if (BLOCK.MINUTE <= M) {
          if (options.detail == 'HOUR') {
            return 'just before';
          }
          const N = Math.floor(M / BLOCK.MINUTE);
          switch (N) {
            default:
              {
                if (N == 1) {
                  return N + ' minute ago';
                } else {
                  return N + ' minutes ago';
                }
              }
          }
        } else if (BLOCK.SECOND <= M) {
          if (options.detail == 'MINUTE') {
            return 'just before';
          }
          const N = Math.floor(M / BLOCK.SECOND);
          if (N == 1) {
            return N + ' second ago';
          } else {
            return N + ' seconds ago';
          }
        } else {
          if (options.detail == 'SECOND') {
            return 'just before';
          }
          const N = M;
          if (N == 1) {
            return N + ' milisecond ago';
          } else {
            return N + ' miliseconds ago';
          }
        }
      } else if (0 < M) {
        return 'future';
      }
    }
  }
  add(amount = 0) {
    if (amount instanceof Date) {
      amount = amount.getTime();
    }
    this.setTime(this.getTime() + amount);
    return this;
  }
  subtract(amount = 0) {
    if (amount instanceof Date) {
      amount = amount.getTime();
    }
    this.setTime(this.getTime() - amount);
    return this;
  }
  sub(...args) {
    return this.subtract(...args);
  }
}
exports.Date = exports.Datwo = Datwo;
var _default = exports.default = Datwo;

