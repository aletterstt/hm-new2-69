<template>
  <div>
   <hm-floor v-if="parent.parent" :parent="parent.parent" :count="count-1"></hm-floor>
   <div class="hm-floor" :class="{top:!parent.parent}">
     <div class="header">
       <div class="left">{{count}}楼</div>
       <div class="center">{{parent.create_date | date}}</div>
       <div class="right" @click="reply">回复</div>
      
     </div>
      <div class="content">
        {{parent.content}}
      </div>
   </div>
  </div>
</template>

<script>
export default {
props:['parent','count'],
name:'hm-floor',
methods:{
  reply(){
    this.$bus.$emit('reply',this.parent.id,this.parent.user.nickname)
  }
}
}
</script>

<style scoped lang="less">
.hm-floor {
  border: 1px solid #000;
  border-top: none;

  &.top {
    border-top: 1px solid #f00;
  }

  padding: 10px;
  .header {
    display: flex;
    .left {
      flex: 1;
    }
    .center {
      flex: 2;
      color: #999;
    }
    .right {
      width: 50px;
    }
  }
  .content {
    padding-top: 10px;
  }
}
</style>