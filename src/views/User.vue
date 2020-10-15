<template>
  <div>
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL+info.head_img" alt="">
      </div>
      <div class="center">
        <div class="nickname">
          <i v-if="info.gender===1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          {{info.nickname}}
          </div>
          <div class="date">{{info.create_date | date}}</div>
      </div>
    </div>


    <van-cell title="我的关注" is-link value="关注的用户" @click='$router.push("/my-follow")' />
    <van-cell title="我的跟帖" is-link value="跟帖/回复" @click="$router.push('/my-comment')" />
    <van-cell title="我的收藏" is-link value="文档/视频" @click="$router.push('/my-star')" />
    <van-cell title="设置" is-link @click="$router.push('/edit')" />
    <van-cell title="退出" is-link @click="logout" />
  </div>
</template>

<script>
export default {
data(){
  return {
    info:{}
  }
},
created(){
  // let token=localStorage.getItem('token')
  let user_id=localStorage.getItem('user_id')
  this.$axios.get(`user/${user_id}`).then(res=>{
   console.log(res.data);
    const {statusCode,data,message}=res.data
    if(statusCode===200){
      this.info=data
    }else{
      this.$toast.fail(message)
    }
  })
},
methods:{
 async logout(){
await this.$dialog.confirm({
  title: '你确定要退出吗',
  // message: '弹窗内容',
})
   localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    this.$router.push('/login')
    this.$toast.success("退出成功")
 
  }
   
}
}
</script >

<style scoped lang="less">
.info{
  display: flex;
  height: 100px;
  border-bottom: 2px solid #cccccc;
  align-items: center;
  .left{
    img{
      width: 70px;
      // vertical-align: center;
    }
  }
  .center{
    flex: 1;
    padding-left: 50px;
    // display: flex;
    height: 50px;
    line-height: 25px;
    font-size: 14px;

  }
}
</style>