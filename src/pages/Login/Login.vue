<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isShowSms}" @click="isShowSms=true">短信登录</a>
          <a href="javascript:;" :class="{on: !isShowSms}" @click="isShowSms=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isShowSms}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="myphone" v-validate="'required|mobile'">
              <span style="color: red;" v-show="errors.has('myphone')">{{ errors.first('myphone') }}</span>
              <button :disabled="!isRightPhone || time>0" class="get_verification"
              :class="{right_phone_number:isRightPhone}" @click.prevent="sendCode"
              >{{obtainCode}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="myscode" v-validate="'required'">
              <span style="color: red;" v-show="errors.has('myscode')">{{ errors.first('myscode') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShowSms}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" name="users" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('users')">{{ errors.first('users') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd" name="mypwd" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('mypwd')">{{ errors.first('mypwd') }}</span>
                <div class="switch_button " :class="isShowPwd ? 'on': 'off'" @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="mycode" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('mycode')">{{ errors.first('mycode') }}</span>
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
      <p>{{$t('message')}}</p>
      <button @click="change">切换语言</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { Toast, MessageBox } from "mint-ui";
  export default {
    data(){
      return {
        isShowSms: true,
        isShowPwd: false,
        phone: '',
        code: '', 
        name: '',   
        pwd: '',
        captcha: '', 
        obtainCode: '获取验证码',
        time: 0,
        captcha: '',
        iscaptcha: true
      }
    },
    computed:{
      //判断手机号
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      async sendCode(){
        this.time = 10
        const timer = setInterval(() => {
          
          if(this.time > 0){
            this.time--
            this.obtainCode = `短信已发送(${this.time}s)`
          }else{
            clearInterval(timer)
            this.obtainCode = '获取验证码'
          }
        }, 1000);
        
        const result = await this.$API.reqSendCode(this.phone)
        if(result.code === 0){
          Toast('短信验证码发送成功')
        }else{
          this.time = 0
          MessageBox('提示',result.mag || '短信验证码发送失败')
        }
      },
      async login(){
        let success
        if(this.isShowSms){
          success = await this.$validator.validateAll(['myphone','myscode']) //该promise验证完成即成功
        }else{
          success = await this.$validator.validateAll(['users','mypwd','mycode'])
        }
        // console.log(success);
        
        let result
        if(success){
          const {isShowSms,phone,code,name,pwd,captcha} = this
          if(isShowSms){
            result = await this.$API.reqSmsLogin(phone,code)
          }else{
            result = await this.$API.reqPwdLogin({name,pwd,captcha})
          }
          this.updateCaptcha()
          this.captcha = ''
        }

        if(result.code === 0){
          const user = result.data
          this.$store.dispatch('saveUser',user)

          this.$router.replace('/profile')
        }else{
          MessageBox('提示',result.msg);
        }
      },
      updateCaptcha(){
        if(this.iscaptcha){
          this.iscaptcha = false
          this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+ Date.now()
          setTimeout(() => {
          this.iscaptcha = true
        }, 2000);
        }
        
      },
      change(){
        const locale = this.$i18n.locale === 'en'?'zh_CN':'en'
        console.log(locale);
        
        this.$i18n.locale = locale
        localStorage.setItem('locale_key', locale)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone_number
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
 
</style>

