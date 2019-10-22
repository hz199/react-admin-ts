import XLSX, { WorkBook } from 'xlsx'

const transformData = (data: ArrayBuffer) => {
  let result = ''

  const uint8Array = new Uint8Array(data.slice(0))

  uint8Array.forEach((byte: number) => {
    result += String.fromCharCode(byte)
  })

  return result
}

/**
 * input excel 数据在线解析
 * @param el 当前 input dom
 * @param rABS 是否将文件读取为二进制字符串 true
 */
const importExcel = <T>(el: HTMLInputElement, rABS = true) => {
  return new Promise((resolve: (value: T[]) => void, reject) => {
    let WB: WorkBook

    try {
      if (!el.files) {
        reject('$el can not find')
        return
      }

      const F = el.files[0]
      const reader = new FileReader()
      if (rABS) {
        reader.readAsArrayBuffer(F)
      } else {
        reader.readAsBinaryString(F)
      }
      reader.onload = function(e) {
        const data = e.target!.result as ArrayBuffer

        if (rABS) {
          WB = XLSX.read(btoa(transformData(data)), {
            type: 'base64'
          })
        } else {
          WB = XLSX.read(data, {
            type: 'binary'
          })
        }

        resolve(XLSX.utils.sheet_to_json<T>(WB.Sheets[WB.SheetNames[0]]))
      }
    } catch (err) {
      reject(err)
    }
  })
}

export default importExcel
