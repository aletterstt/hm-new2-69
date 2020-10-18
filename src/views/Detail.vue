<template>
  
  <div>
   <div class="header">
     <div class="left">
       <i class="iconfont iconjiantou2" @click="$router.back()"></i>
     </div>
     <div class="center">
       <i class="iconfont iconnew"></i>
     </div>
     <div class="right">
       <div v-if="detail.has_follow" class="follow" @click="unfollow">已关注</div>
       <div v-else class="unfollow" @click="follow">关注</div>
     </div>
   </div>
   <div class="container">
     <div class="title line2">
       {{detail.title}}
     </div>
     <div class="name">
       <span>新华网</span>
       <span>{{detail.create_date | date}}</span>
     </div>
     <div class="content" v-if="detail.type===1" v-html="detail.content"></div>
     <video v-else v-html="detail.content" controls></video>
   </div>
   <!-- 点赞 -->
     <div class="bottom">
       <div @click="like" class="like" :class="{active:detail.has_like}">
         <i class="iconfont icondianzan"></i>
         <i>{{detail.like_length}}</i>
       </div>
     </div>
   
  </div>
</template>

<script>
export default {
  data(){
    return {
      detail:[]
    }
  },
created(){
  console.log('详情页',this.$route.params.id);
  this.getDetail()
},
methods:{
  async getDetail(){
  let res=await this.$axios.get(`/post/${this.$route.params.id}`)
  console.log('详情页',res.data.data);
  this.detail=res.data.data
},
async follow(){
  let token=localStorage.getItem('token')
  if(!token){
    this.$toast('请先登录')
    this.$router.push({
      name:"login",
      params:{
        back:true
      }
    })
    return 
  }
  let res= await this.$axios.get(`/user_follows/${this.detail.user.id}`)
  // console.log('关注成功',res.data);
  if(res.data.statusCode==200){
    this.$toast.success(res.data.message)
    this.getDetail()
  }
},
async unfollow(){
  let res= await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)
  // console.log('关注成功',res.data);
  if(res.data.statusCode==200){
    this.$toast.success(res.data.message)
    this.getDetail()
  }
},
async like(){
let res=await this.$axios.get(`post_like/${this.detail.id}`)
console.log('点赞',res.data);
if(res.data.statusCode==200){
  this.$toast('点赞成功')
  this.getDetail()
}
}
}
}
</script>

<style scoped lang="less">
/deep/ img{
  width: 100%;
}
/deep/ video{
  width: 100%;
}
.header{
  height: 40px;
  display: flex;
  padding: 20px;
  text-align: center;
  line-height: 40px;
  .left{
    width: 40px;
    // font-size: 30px;
    .iconjiantou2{
      font-size: 20px;
    }
  }
  .center{
    flex: 1;
    
    .iconnew{
      font-size: 50px;
    }
  }
  .right{
    margin-top: 10px;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    line-height: 20px;
    border: 1px solid #cccccc;
  }
}
.container{
  padding: 10px;
  .title{
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0;
  }
  .name{
    color: #999;
    span{
      margin-right: 20px;
    }
  }
  .content{
    margin-top: 20px;
  }
}
.bottom{
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  .like{
    height: 20px;
    width: 50px;
    border: 1px solid #000;
    line-height: 20px;
    border-radius: 15px;
    margin-right: 10px;
    i{
      margin: 0 5px;
    }
  }
  .like.active{
    border: 1px solid #f00;
    i{
      color: red;
    }
  }
}
</style>