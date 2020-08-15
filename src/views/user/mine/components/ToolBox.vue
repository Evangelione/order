<template>
  <div class="tool-box">
    <template v-if="mode == 'single'">
      <van-row class="single">
        <van-col span="14">
          <div class="title">{{ data.title }}</div>
          <div class="detail">{{ data.detail }}</div>
        </van-col>
        <van-col span="10">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597488348612&di=6201e3ff01083b3ba79b9f6b73074695&imgtype=0&src=http%3A%2F%2Fimg.xinxic.com%2Fimg%2Fb857908042e08bdd.jpg"
            alt=""
          />
        </van-col>
      </van-row>
    </template>

    <template v-if="mode == 'multi'">
      <van-row type="flex" align="center" class="multi">
        <van-col span="12" class="title">{{ data.title }}</van-col>
        <van-col span="12" class="detail" v-if="data.detail">
          <router-link :to="data.route || '#'">
            {{ data.detail }}
            <van-icon name="arrow" />
          </router-link>
        </van-col>
      </van-row>
      <van-grid :border="false" clickable :column-num="column">
        <van-grid-item :icon="item.icon" :text="item.text" v-for="(item, index) in data.list" :key="index" />
      </van-grid>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ToolBox',

  mixins: [],

  components: {},

  props: {
    mode: {
      type: String,
      default: 'single',
    },
    data: {
      type: Object,
      required: true,
    },
    column: {
      type: Number,
      default: 4,
    },
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.tool-box {
  margin-top: 10px;
  border-radius: 8px;
  background: #fff;
  padding: 12px 14px;

  .single {
    .title {
      font-size: @font-size-lg;
      font-weight: bold;
    }
    .detail {
      font-size: @font-size-sm;
      color: @color-text-secondary;
      margin-top: 8px;
    }

    img {
      width: 100%;
      height: 65px;
      float: right;
    }
  }
  .multi {
    .title {
      font-size: @font-size-lg;
      font-weight: bold;
      color: @color-text-primary;
    }

    .detail {
      font-size: @font-size-sm;
      text-align: right;
      a {
        color: @color-text-secondary;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .van-icon {
          margin-left: 4px;
        }
      }
    }
  }
  .van-grid {
    margin-top: 5px;

    /deep/.van-grid-item__content {
      padding: 10px 8px 4px 8px;
    }

    /deep/.van-grid-item__icon {
      color: @primary-base;
    }

    /deep/.van-grid-item__text {
      color: @color-text-regular;
    }
  }
}
</style>
