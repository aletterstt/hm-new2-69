<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i> 搜索新闻
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
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