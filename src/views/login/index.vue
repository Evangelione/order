<template>
  <div class="container">
    <div class="group">
      <div class="title">
        <div class="img-box">
          <img :src="logo" alt />
        </div>
        <div>用户登录</div>
      </div>
      <van-form :show-error="false" @failed="onFailed" @submit="onSubmit" ref="form" validate-first>
        <van-field
          :rules="[{ required: true, pattern: /^[1][3-9][0-9]{9}$/ }]"
          class="input"
          label-align="center"
          label-width="80"
          left-icon="user-o"
          maxlength="11"
          name="phone"
          placeholder="请输入手机号"
          type="tel"
          v-model="phone"
        />

        <van-field
          :rules="[
            {
              required: true,
              validator: val => {
                return val.length == 6
              },
            },
          ]"
          center
          class="input"
          clearable
          left-icon="envelop-o"
          maxlength="6"
          name="sms"
          placeholder="请输入短信验证码"
          type="digit"
          v-if="register"
          v-model="sms"
        >
          <template #button>
            <van-button
              :disabled="timer ? true : false"
              :loading="sms_loading"
              @click="getSms"
              native-type="button"
              size="small"
              type="primary"
            >
              {{ timer ? time : '发送验证码' }}
            </van-button>
          </template>
        </van-field>
        <van-field
          :rules="[
            {
              required: true,
              validator: val => {
                return val.length >= 6
              },
            },
          ]"
          class="input"
          label-align="center"
          label-width="80"
          left-icon="closed-eye"
          maxlength="20"
          name="pwd"
          placeholder="请输入密码"
          type="password"
          v-model="pwd"
        />
        <div @click="register = true" class="register" v-if="!register">点击注册</div>
        <div @click="register = false" class="register" v-else>我有账号</div>
        <van-button :loading="loading" class="button" round type="primary" v-if="!register">登录</van-button>
        <van-button :loading="loading" class="button" round type="primary" v-else>点击注册</van-button>
      </van-form>
    </div>
    <!-- <img class="blur" src="@/assets/image/login_bg.jpeg" /> -->
  </div>
</template>

<script>
import { getLogo, smsCode, registerAcc, login } from '@/api/common'
export default {
  name: 'Login',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      register: false,
      phone: '',
      pwd: '',
      sms: '',
      logo: '',
      time: 60,
      timer: null,
      loading: false,
      sms_loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    getLogo().then(res => {
      this.logo = res.wap_merchant_logo
    })
  },

  destroyed() {},

  methods: {
    getSms() {
      if (this.sms_loading || this.loading) return
      this.$refs.form
        .validate('phone')
        .then(() => {
          this.sms_loading = true
          smsCode({
            phone: this.phone,
          })
            .then(() => {
              this.sms_loading = false
              this._toast('验证码已发送')
              this.timer = setInterval(() => {
                if (this.time <= 0) {
                  clearInterval(this.timer)
                  this.timer = null
                  this.time = 60
                } else {
                  this.time -= 1
                }
              }, 1000)
            })
            .catch(() => {
              this.sms_loading = false
            })
        })
        .catch(e => {
          this.onFailed({
            errors: [e],
          })
        })
    },
    onFailed(errorInfo) {
      switch (errorInfo.errors[0].name) {
        case 'phone':
          this._toast('手机号格式不正确', () => {}, 'text')
          break
        case 'pwd':
          this._toast('请输入不少于6位的密码', () => {}, 'text')
          break
        case 'sms':
          this._toast('请输入正确的验证码', () => {}, 'text')
          break
      }
    },
    onSubmit(values) {
      this.loading = true
      console.log(values)
      if (values.sms) {
        registerAcc({
          phone: values.phone,
          password: values.pwd,
          verify: values.sms,
        })
          .then(res => {
            if (res.errorCode != '0') {
              this._toast(res.errorMsg, () => {}, 'fail')
            } else {
              this._toast('注册成功', () => {
                console.log(this.$route)
                if (this.$route.query.redirect) {
                  this.$router.replace(this.$route.query.redirect)
                } else {
                  this._goBack()
                }
              })
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        login({ phone: values.phone, pwd: values.pwd })
          .then(res => {
            console.log(res)
            if (res.errorCode != '0') {
              this._toast(res.errorMsg, () => {}, 'fail')
            } else {
              localStorage.setItem('ticket', res.result.user.ticket)
              localStorage.setItem('merchant_user', JSON.stringify(res.result.uid))
              this._toast('登录成功', () => {
                if (this.$route.query.redirect) {
                  this.$router.replace(this.$route.query.redirect)
                } else {
                  this._goBack()
                }
              })
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .blur {
    position: absolute;
    width: 108vw;
    height: 108vh;
    // filter: blur(10px);
    z-index: -10;
    top: -15px;
    left: -15px;
  }

  .group {
    margin-top: 60px;
    text-align: center;
    .title {
      text-align: center;
      font-size: 20px;
      color: rgb(102, 102, 102);
      margin-bottom: 60px;
      .img-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 28vw;
        box-shadow: 0 0 8px 1px #ccc;
        border: 1px solid #ccc;
        box-sizing: border-box;
        width: 31vw;
        height: 31vw;
        margin: 0 auto 15px;
        img {
          width: 27vw;
          height: 27vw;
          border-radius: 27vw;
        }
      }
    }

    .input {
      width: 300px;
      margin: 10px auto;
      background: transparent;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      padding-left: 20px;
      /deep/.van-field__left-icon {
        color: @color-text-primary;
      }
      /deep/.van-field__control {
        color: @color-text-primary;
        padding-left: 20px;
      }
    }

    .button {
      width: 280px;
      margin-top: 70px;
    }

    .register {
      text-align: right;
      width: 300px;
      margin: 0 auto;
      color: @primary-deep;
      font-size: 12px;
      padding-right: 30px;
    }
  }
}
</style>
