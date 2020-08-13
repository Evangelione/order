<template>
  <v-popup ref="picker">
    <van-picker :columns="col" @cancel="onCancel" @change="onChange" @confirm="onConfirm" show-toolbar />
  </v-popup>
</template>

<script>
import VPopup from '@/components/VPopup'

export default {
  name: 'SinglePicker',

  mixins: [],

  components: {
    VPopup,
  },

  props: {
    col: Array,
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    onConfirm(data) {
      this.$emit('confirm', data)
      this.toggle()
    },
    onChange() {},
    onCancel() {
      this.toggle()
    },
    toggle() {
      this.$refs.picker.toggle()
    },
  },
}
</script>

<style lang="less" scoped></style>
