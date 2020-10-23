<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center" @click="$router.push('/search')">
        <i class="iconfont iconsearch"></i> 搜索新闻
      </div>
      <div class="right" @click="$router.push('/user')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>

   
      <!-- 小三角 -->
      <van-sticky z-index="999">
      <div class="container" @click="$router.push('tabsedit')">
       <i class="iconfont iconjiantou1"></i>
      </div>
     </van-sticky>
     <!-- tab栏 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
    >
    <van-tabs v-model="active" sticky>
    <van-tab v-for="item in tabsList" :key="item.id" :title=item.name  sticky>
      <hm-post @click.native="$router.push(`/detail/${post.id}`)" v-for="(post,index) in postList" :key="index" :post="post"></hm-post>
    </van-tab>
    </van-tabs>
    </van-list>
    </van-pull-refresh>
  
   
  </div>
</template>

<script>
export default {
  name:'home',
 data() {
    return {
      active: 1,
      tabsList:[],
      postList:[],
      loading:false,
      finished:false,
      pageIndex:1,
      pageSize:5,
      isLoading:false
    };
  },
  created(){
this.getTabsList()
  },
  activated(){
let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
     if(activeTabs){
       this.tabsList=activeTabs
       this.active=2
       this.getPostList(this.tabsList[this.active].id)
       return 
     }
  },
  methods:{
   async getTabsList(){
     let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
     if(activeTabs){
       this.tabsList=activeTabs
       this.getPostList(this.tabsList[this.active].id)
       return 
     }
     let res=await this.$axios.get('/category')
     console.log('tablist',res.data.data);
     this.tabsList=res.data.data
      this.getPostList(this.tabsList[this.active].id)
    },
    async getPostList(id){
      let res= await this.$axios.get("/post",{
        params:{
          category:id,
          pageIndex:this.pageIndex,
          pageSize:this.pageSize
        }
      })
      console.log('栏目列表',res.data.data);
      this.loading=false
      if(res.data.data.length<this.pageSize){
        this.finished=true
      }
      //下拉刷新完成
      this.isLoading=false;
      this.postList=[...this.postList,...res.data.data]
    },
   onLoad(){
      this.pageIndex++
      this.getPostList(this.tabsList[this.active].id)
      console.log('触底了');
    },
    onRefresh(){
      //重新获取数据
      this.postList=[]
      //回到第一页
      this.pageIndex=1;
      //处理底部的文字
      this.finished=false
      //加载未完成
      this.loading=true
      //获取数据
      this.getPostList(this.tabsList[this.active].id)
    },
    fn(){
      console.log(111);
    }
  },
  watch:{
    active(newActive){
      this.pageIndex=1;
      this.finished=false
      this.loading=true
      this.getPostList(this.tabsList[newActive].id)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-tabs__nav {
  background : #dddddd;
  margin-right: 40px;
}
.container{
  z-index: 999;
  position: absolute;
  right: 0;
  width: 40px;
  height: 44px;
  background-color: #ddd;
  line-height: 44px;
  text-align: center;
  color: #000;
  .iconjiantou1{
    font-size: 30px;
  }
}
.header{
  height: 40px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  .left,.right{
    width: 40px;
    text-align: center;;
    }
    .iconnew{
      font-size: 40px;
    }
    .iconwode{
      font-size: 22px;
    }
    .center{
      flex: 1;
      text-align: center;
      line-height: 30px;
      height: 30px;
      background-color: rgba(255,255,255,0.5);
    }
}
</style>