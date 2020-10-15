<template>
  <div>
    <hm-header>我的关注</hm-header>
    <div class="list" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL+item.head_img" alt="">
      </div>
      <div class="center">
        <div class="nickname">{{item.nickname}}</div>
        <div class="date">{{item.create_date | date}}</div>
      </div>
      <div class="right" @click="unFollows(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return {
    list:[]
  }
},
created(){
this.getMyFollowList()
this.follow()
},
methods:{
 async getMyFollowList(){
   let res=await this.$axios.get('/user_follows')
   console.log('用户关注列表',res.data);
   this.list=res.data.data
  },
  async unFollows(id){
    await this.$dialog.confirm({
  title: '温馨提示',
  message: '你确定要取消关注此用户吗？',
})
    let res=await this.$axios.get(`/user_unfollow/${id}`)
    console.log('取消关注用户',res.data);
    const {statusCode,message}=res.data
    if(statusCode==200){
      this.$toast.success(message)
      this.getMyFollowList();
    }
    else{
      this.$toast.fail(message)
    }
  },
  async follow(){
    let res=await this.$axios.get('/user_follows/5')
    this.getMyFollowList()
  }
}
}
</script>

<style lang='less'>
.list{
  display: flex;
  align-items: center;
  height: 90px;
  padding: 20px;
  .left{
    width: 60px;
    img{
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .center{
    height: 50px;
    line-height: 25px;
    flex: 1;
    padding-left: 20px;
    .date{
      font-size: 12px;
    }
  }
  .right{
    width: 60px;
    background-color: #dddddd;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    font-size: 12px;
  }
}
</style>