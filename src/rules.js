localStorage.setItem('a','0');
localStorage.setItem('b','0');
localStorage.setItem('c','0');
localStorage.setItem('d','0');
localStorage.setItem('e','0');
// 中文校验
export const validateContacts = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入中文或英文')),
      localStorage.setItem('a','1')
    }
    if (!/^[\u0391-\uFFE5A-Za-z]{1,30}$/.test(value)) {
      callback(new Error('不可输入特殊字符和数字')),
      localStorage.setItem('a','1');
    } else {
      callback(),
      localStorage.setItem('a','0');
      
    }
  }
  
//   纯数字校验
export const validateNumber = (rule, value, callback) => {
    let numberReg = /^\d+$|^\d+[.]?\d+$/
    if (value !== '') {
        if (!numberReg.test(value)) {
            callback(new Error('请输入数字')),
            localStorage.setItem('b','1');
        } else {
            callback(),
            localStorage.setItem('b','0');
        }
    } else {
        callback(new Error('请输入值')),
        localStorage.setItem('b','1');
    }
}
// 验证是否整数
export function isInteger(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空')),
      localStorage.setItem('c','1');
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数')),
        localStorage.setItem('c','1');
      } else {
        const re = /^[0-9]*[1-9][0-9]*$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入正整数')),
          localStorage.setItem('c','1');
        } else {
          callback(),
          localStorage.setItem('c','0');
        }
      }
    }, 0);
  }
//   0-99
export function isOneToNinetyNine(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空')),
      localStorage.setItem('e','1');
    }
    setTimeout(() => {
      if (!Number(value)) {
        callback(new Error('请输入正整数')),
        localStorage.setItem('e','1');
      } else {
        const re = /^[1-9][0-9]{0,1}$/;
        const rsCheck = re.test(value);
        if (!rsCheck) {
          callback(new Error('请输入正整数，值为【1,99】')),
          localStorage.setItem('e','1');
        } else {
          callback(),
          localStorage.setItem('e','0');
        }
      }
    }, 0);
  }
//   自动检验数值的范围
  export function checkMax20000(rule, value, callback) {
    if (value == '' || value == undefined || value == null) {
      callback();
    } else if (!Number(value)) {
      callback(new Error('请输入正整数，值为【1,20000】')),
      localStorage.setItem('d','1');
    } else if (value < 1 || value > 20000) {
      callback(new Error('请输入正整数，值为【1,20000】')),
      localStorage.setItem('d','1');
    } else {
      callback(),
      localStorage.setItem('d','0');
    }
  }