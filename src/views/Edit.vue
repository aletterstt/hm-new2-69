
<template>
  <div>
    <hm-header>编辑信息</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+info.head_img" alt="">
      <van-uploader class="loader" :after-read="afterRead" />
    </div>
    <div class="info">
    <van-cell-group>
      <van-cell title="昵称" :value="info.nickname" @click="showNickname" is-link />
      <van-cell title="密码" value="******" is-link/>
      <van-cell title="性别" :value="info.gender===1?'男':'女'" @click="showGender" is-link/>
    </van-cell-group>


    <!-- 修改昵称 -->
    <van-dialog v-model=" isShowNickname" title="修改昵称" @confirm="confirmNickname" show-cancel-button>
   <van-field v-model="nickname"  placeholder="请输入新的昵称" />
   </van-dialog>

   <!-- 修改性别 -->
    <van-dialog v-model=" isShowGender" title="修改性别" @confirm="confirmGender" show-cancel-button>
   <van-radio-group v-model="gender">
  <van-cell-group >
    <van-cell title="男" clickable @click="gender = 1">
      <template #right-icon>
        <van-radio :name="1" />
      </template>
    </van-cell>
    <van-cell title="女" clickable @click="gender = 0">
      <template #right-icon>
        <van-radio :name="0" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
   </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      info:{},
      isShowNickname:false,
      nickname:"",
      gender:"",
      isShowGender:false
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
   async getInfo(){
      // const token=localStorage.getItem('token')
      const user_id=localStorage.getItem('user_id')
     let res=await this.$axios.get(`/user/${user_id}`)
     console.log(res.data);
        this.info=res.data.data
    },
    showNickname(){
      this.isShowNickname=true,
      this.nickname=this.info.nickname
    },
    confirmNickname(){
      if(this.nickname===this.info.nickname){
        this.$toast('新旧昵称一样')
        return
      }
      /* const token=localStorage.getItem('token')
      const user_id=localStorage.getItem('user_id')
      this.$axios.post(`/user_update/${user_id}`,{nickname:this.nickname},{
        headers:{
          Authorization:token
        }
      }).then(res=>{
        // console.log(res.data);
        this.getInfo()
      }) */
      this.ml_editUser({nickname:this.nickname})
    },
    showGender(){
      this.isShowGender=true
      this.gender=this.info.gender
    },
    confirmGender(){
      if(this.gender===this.info.gender){
        this.$toast("新旧性别一样")
        return
      }
      this.ml_editUser({gender:this.gender})
    },
   async ml_editUser(data){
      // const token=localStorage.getItem('token')
      const user_id=localStorage.getItem('user_id')
    let res=await this.$axios.post(`/user_update/${user_id}`,data)
     this.getInfo()
        this.$toast.success(res.message)
    },
   async afterRead(data){
      console.log(data);
      let token=localStorage.getItem('token')
      let formdata=new FormData()
      formdata.append('file',data.file)
     let res=await this.$axios.post('/upload',formdata)
     this.ml_editUser({
          head_img:res.data.data.url
        })
    }
  }

}
</script>

<style lang="less">
.avatar{
  text-align: center;
  margin: 20px 0;
  position: relative;
  img{
    width: 70px;
    height: 70px;
    object-fit: contain;
    border-radius: 50%;
  }
  .loader{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;
  }
}
</style>