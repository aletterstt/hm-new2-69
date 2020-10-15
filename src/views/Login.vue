<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkname"
      @clear="clearname"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkpassword"
      @clear="clearpassword"
    />
    <hm-button @click.native="startLogin">登录</hm-button>
    <div class="to-register">
      如果没有账号请点击 <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '10086',
      password: '123',
      usernameErrMsg: '',
      passwordErrMsg: '',
    }
  },
  created() {
    console.log(this.$route)
    const { username, password } = this.$route.params
    if (username && password) {
      this.username = username
      this.password = password
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
    checkpassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码错误'
      }
    },
    clearname() {
      if (this.username === '') {
        this.usernameErrMsg = ''
      }
    },
    clearpassword() {
      if (this.password === '') {
        this.passwordErrMsg = ''
      }
    },
   async startLogin() {
    await this.$dialog.confirm({
  title: '标题',
  message: '你确定要登录吗',
})

      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
     let res=await this.$axios
          .post('/login', {
            username: this.username,
            password: this.password,
          })
          console.log('登录信息', res)
            const { statusCode, message, data } = res.data
            if (statusCode === 200) {
              localStorage.setItem('token', data.token)
              localStorage.setItem('user_id', data.user.id)
              this.$toast.success(message)
              this.$router.push('/user')
            } else {
              this.$toast.success(message)
            }
        // this.$toast.success('登录成功')
      } else {
        this.$toast.fail('登录失败')
      }
    },
  },
}
</script>

<style scoped>
.to-register{
  text-align: right;
  font-size: 14px;
  margin-right: 30px;
}
</style>
