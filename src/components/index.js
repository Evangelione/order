import BaseLayout from './BaseLayout'
import ImageCropper from './ImageCropper'
import MultiplePicker from './MultiplePicker'
import SinglePicker from './SinglePicker'
import VButton from './VButton'
import VPopup from './VPopup'

const components = {
  install: function(Vue) {
    Vue.component('base-layout', BaseLayout)
    Vue.component('image-cropper', ImageCropper)
    Vue.component('multiple-picker', MultiplePicker)
    Vue.component('single-picker', SinglePicker)
    Vue.component('v-button', VButton)
    Vue.component('v-popup', VPopup)
  },
}

export default components
