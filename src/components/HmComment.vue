<template>
  <div class="hm-comment">
   <div class="header">
     <div class="left">
       <img :src="$axios.defaults.baseURL+comment.user.head_img" alt="">
     </div>
     <div class="center">
       <div class="name">{{comment.user.nickname}}</div>
       <div class="date">{{comment.create_date | date}}</div>
     </div>
     <div class="right" @click="reply">
       回复
     </div>
   </div>

    <hm-floor
    :count="getCount(0,comment)"
      v-if="comment.parent"
      :parent="comment.parent"
    ></hm-floor>
    <!-- 3. 内容 -->
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
props:['comment'],
methods:{
  getCount(num,comment){
    if(comment.parent){
      return this.getCount(num+1,comment.parent)
    }
    else{
      return num
    }
  },
  reply(){
    // console.log('回复的内容');
   this.$bus.$emit('reply',this.comment.id,this.comment.user.nickname)
  }
}
}
</script>

<style scoped lang="less">
.hm-comment{
  border-top: 2px solid #cccccc;
  .header{
    display: flex;
    padding: 20px;
    .left{
      img{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .center{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 20px;
      .date{
        color: #999;
      }
    }
    .right{
      width: 40px;
      color: #999;
    }
  }
  .content{
    padding: 20px;
  }
}
</style>