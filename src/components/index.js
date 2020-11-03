import BaseLayout from './BaseLayout'
import ImageCropperMerchant from './ImageCropper/MerchantAuth'
import ImageCropperPHP from './ImageCropper/PHPSessionAuth'
import MultiplePicker from './MultiplePicker'
import SinglePicker from './SinglePicker'
import VButton from './VButton'
import VPopup from './VPopup'

const components = {
  install: function(Vue) {
    Vue.component('base-layout', BaseLayout)
    Vue.component('image-cropper-merchant', ImageCropperMerchant)
    Vue.component('image-cropper-php', ImageCropperPHP)
    Vue.component('multiple-picker', MultiplePicker)
    Vue.component('single-picker', SinglePicker)
    Vue.component('v-button', VButton)
    Vue.component('v-popup', VPopup)
  },
}

export default components
