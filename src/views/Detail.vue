<template>
  
  <div>
    <!-- 头部 -->
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
    <div
        v-if="detail.type == 1"
        class="content"
        v-html="detail.content"
      ></div>
     <video v-else :src="detail.content" controls></video>
   </div>
   <!-- 点赞 -->
     <div class="bottom">
       <div @click="like" class="like" :class="{active:detail.has_like}">
         <i class="iconfont icondianzan"></i>
         <i>{{detail.like_length}}</i>
       </div>
     </div>
   <div class="comments">
    
     <hm-comment v-for="comment in commentList " :key="comment.id" :comment="comment"></hm-comment>
   </div>
   <!-- 底部 -->
   <div class="footer">
     <div class="input" v-if="isShow">
       <div class="left">
         <input type="text" ref="input" placeholder="写跟贴" @focus="handelFocus">
       </div>
        <div class="center">
          <van-icon name="chat-o" badge="9" />
        </div>
        <div class="right">
          <van-icon name="star-o" />
        </div>
     </div>
     <div v-else class="textarea">
       <div class="left">
         <textarea ref="textarea" placeholder="请输入内容" @blur="handelBlur"></textarea>
       </div>
       <div class="right">
          <div class="send">发送</div>
        </div>
     </div>
   </div>
  </div>
</template>

<script>
import func from '../../vue-temp/vue-editor-bridge';
export default {
  data(){
    return {
      detail: {
        user: {},
      }, // 详情页信息
      commentList:[],
      isShow:true
    }
  },
  mounted(){
    console.log('111',this.$refs);
  },
created(){
  // console.log('详情页',this.$route.params.id);
  this.getDetail(),
   this.getCommentList()
   
},
methods:{
  //获取详情页
 async getDetail() {
      let res = await this.$axios.get(`/post/${this.$route.params.id}`)
      console.log('详情页信息', res.data.data)
      this.detail = res.data.data
    },
//关注用户
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
//取消关注用户
async unfollow(){
  let res= await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)
  // console.log('关注成功',res.data);
  if(res.data.statusCode==200){
    this.$toast.success(res.data.message)
    this.getDetail()
  }
},
//点赞
async like(){
let res=await this.$axios.get(`post_like/${this.detail.user.id}`)
console.log('点赞',res.data);
if(res.data.statusCode==200){
  this.$toast('点赞成功')
  this.getDetail()
}
},
//获取评论列表
async getCommentList(){
let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)

console.log('评论列表',res.data);
this.commentList=res.data.data
},
//获得焦点
handelFocus(){
  this.isShow=false
},
//失去焦点
handelBlur(){
  this.isShow=true
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


.footer {
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  .input {
    height: 40px;
    display: flex;
    .left {
      flex: 1;
      // background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        height: 30px;
        width: 80%;
        border: none;
        border-radius: 15px;
        background: #ddd;
        text-indent: 1em;
      }
    }
    .center,
    .right {
      width: 60px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .textarea {
    height: 70px;
    display: flex;
    .left {
      flex: 1;
      // background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        border: none;
        width: 90%;
        height: 75%;
        border-radius: 8px;
        resize: none;
        background: #ddd;
        text-indent: 1em;
        padding-top: 5px;
      }
    }
    .right {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .send {
        background: #f00;
        color: #fff;
        width: 40px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>