<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center" @keyup.enter="search">
        <input type="text" placeholder="请输入内容" v-model="keyword" @input="search_commend"> <i class="iconfont iconsearch"></i>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 搜索推荐 -->
    <div class="commend" v-if="commendList.length>0">
      <div v-for="item in commendList" :key="item.id">{{item.title}}</div>
    </div>
    <!-- 内容 -->
    <div class="content" v-else-if="postList.length>0">
      <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
    </div>
    <!-- 历史 -->
    <div class="history" v-else>
      <div class="title">历史记录</div>
      <div class="list">
        <div class="item" v-for="item in historyList" :key="item">
          <div @click="historyTag(item)">{{item}}</div>
        </div>
        
      </div>
      <div class="title">热门搜索</div>
       <div class="list">
        <div class="item">12</div>
        <div class="item">12</div>
        <div class="item">12</div>
        <div class="item">12</div>
        <div class="item">12</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
data(){
  return {
    keyword:"",
    postList:[],
    historyList:[],
    commendList:[]
  }
},
watch:{
  keyword(newVal){
    if(!newVal){
      this.postList=[]
      this.commendList=[]
    }
  }
},
created(){
  this.search()
  let historyList= JSON.parse(localStorage.getItem('history_list'))
  if(historyList){
    this.historyList=historyList
  }
},
methods:{
 async search(){
   if(this.keyword.trim()=== '') return 
   let res=await this.$axios.get('/post_search',{
     params:{
       keyword:this.keyword
     }
   })
   //把搜索的关键字添加到历史记录中
   this.historyList.unshift(this.keyword)
    this.historyList=[... new Set(this.historyList)]
   localStorage.setItem('history_list',JSON.stringify(this.historyList))
  
   console.log('搜索内容',res.data);
   this.postList=res.data.data
  },
  historyTag(item){
    this.keyword=item
    this.search()
  },
 async  search_commend(){
   if(this.keyword.trim() === ''){
     return 
   }
let res = await this.$axios.get('/post_search_recommend',{
  params:{
    keyword:this.keyword
  }
})
console.log('搜索推荐',res.data);
this.commendList=res.data.data
  }
}
}
</script>

<style scoped lang="less">
.header{
  // padding: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  
  .left, .right{
    width: 40px;
    font-size: 12px;
  }
  .center{
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    input{
      height: 30px;
      width: 80%;
      border: none;
      border: 1px solid #cccccc;
      border-radius: 15px;
      text-indent: 2em;
      font-size: 12px;
    }
    i{
      position: absolute;
      left: 35px;
      top: 8px;
    }
  }
}
.history{
  padding: 20px;
  .title{
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    margin-bottom: 12px;
    .item{
      padding: 10px;
      margin-right: 10px;
      background-color: #ddd;
    }
  }
}
.commend{
  div{
    height: 30px;
    border: 1px solid #ccc;
    text-align: left;
    line-height: 30px;
  }
}
</style>