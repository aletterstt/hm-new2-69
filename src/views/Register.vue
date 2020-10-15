<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      clearable
      :error-message="usernameErrMsg"
      @input="checkname"
      @clear="clearname"
    />
    <van-field
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      clearable
      :error-message="nicknameErrMsg"
      @input="checkNickname"
      @clear="clearNickname"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      clearable
      :error-message="passwordErrMsg"
      @input="checkPassword"
      @clear="clearPassword"
    />
    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: '',
      usernameErrMsg: '',
      nicknameErrMsg: '',
      passwordErrMsg: ' ',
    }
  },
  methods: {
    checkname() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式错误'
      }
    },
    checkNickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = ''
      } else {
        this.nicknameErrMsg = '昵称格式错误'
      }
    },
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式不正确'
      }
    },
    clearname() {
      if (this.username === '') {
        this.usernameErrMsg = ''
      }
    },
    clearNickname() {
      if (this.nickname === '') {
        this.nicknameErrMsg = ''
      }
    },
    clearPassword() {
      if (this.password === '') {
        this.passwordErrMsg = ''
      }
    },
   async startRegister() {
      if (
        this.username !== '' &&
        this.nickname !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.nicknameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
       let res=await this.$axios
          .post('/register', {
            username: this.username,
            password: this.password,
            nickname: this.nickname,
          })
          console.log('注册',res)

            const { statusCode, message, data } = res.data
            if (statusCode === 200) {
              this.$toast.success(message)
              this.$router.push({
                name: '/login',
                params: {
                  username: this.username,
                  password: this.password,
                },
              })
            } else {
              this.$toast.fail(message)
            }
      } else {
        this.$toast.fail('注册失败')
      }
    },
  },
}
</script>

<style></style>
