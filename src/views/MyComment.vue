<template>
  <div>
    <hm-header>我的跟帖</hm-header>

    <van-list 
    v-model="loading" 
    :finished="finished" 
    finished-text="没有更多了" 
    @load='onLoad'
     :immediate-check="false"
     offset="50" >
        <div class="item" v-for="item in list" :key="item.id" >
        <div class="date">{{item.create_date | date}}</div>
        <div class="parent" v-if="item.parent" >
          <div class="parent-nickname">回复：{{item.parent.user.nickname}}</div>
          <div class="parent-content line1">
         {{item.parent.user.content}}
          </div>
        </div>
        <div class="content"> {{item.content}}</div>
        <div class="post">
          <div class="title line1">{{item.post.title}}</div>
          <i class="iconfont iconjiantou1"></i>
        </div>
        <i></i>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
data(){
  return {
    list:[],
    finished:false,
    loading:false,
    pageIndex:1,
    pageSize:4
  }
},
created(){
this.getMyCommentList()
},
methods:{
 async getMyCommentList(){
   let res=await this.$axios.get('/user_comments',{
    params:{
       pageIndex:this.pageIndex,
       pageSize:this.pageSize
    }
   })
   if(res.data.statusCode==200){
     this.loading=false
     if(res.data.data.length<this.pageSize){
       this.finished=true;
     }
     console.log('跟帖列表',res.data);
     this.list=[...this.list,...res.data.data]
   }
   
  },
  onLoad(){
    this.pageIndex++
    this.getMyCommentList()
  }
}
}
</script>


<style scoped lang="less">

  .item{
    border-bottom: 1px solid #ccc;
    padding: 10px;
   .date{
     line-height: 20px;
      height: 20px;
    color: #999;
   }
   .parent{
     background-color: #ccc;
     padding: 10px;
      color:#999;
     &-nickname{
      height: 20px;
      line-height: 20px;

     }
     &-content{
       font-size: 14px;
       line-height: 25px;
     }
   }
  }
  .content{
    font-size: 14px;
    padding: 10px 0;

  }
  .post{
    display: flex;
    .title{
      flex: 1;
      font-size: 12px;
    }
    .iconfont{
      width: 20px;
      text-align: center;
    }
  }

</style>>

