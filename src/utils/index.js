import Compressor from 'compressorjs'
import axios from 'axios'

/**
 * @author cc
 * @description 公共函数
 */

export default {
  // 传入键名 获取地址栏参数
  getUrlParam(name, url) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)`)
    let result = null
    if (url) {
      try {
        result = new URL(url).search.substr(1).match(reg)
      } catch (error) {
        result = null
      }
    } else {
      result = window.location.search.substr(1).match(reg)
    }
    if (result !== null) return decodeURIComponent(result[2])
    return ''
  },
  // 上传单个图片 blob
  compressionAndUploadImg(blob) {
    return new Promise((resolve, reject) => {
      /* eslint no-new: 0 */
      new Compressor(blob, {
        quality: 0.1,
        success: result => {
          const reader = new window.FileReader()
          reader.readAsDataURL(result)
          reader.onloadend = () => {
            // Send the compressed image file to server with XMLHttpRequest.
            axios
              .post('/appapi.php?c=Merchantapp&a=base64change', {
                imgBase: reader.result,
                ticket: localStorage.getItem('ticket'),
              })
              .then(response => {
                console.log(response)
                if (response.data.error === 0) {
                  resolve(response.data.msg)
                }
              })
              .catch(e => {
                reject(e)
              })
          }
        },
        error: err => {
          alert(`压缩错误：${err}`)
        },
      })
    })
  },
}
