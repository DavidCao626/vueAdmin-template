<template>
    <div class="progress-project">
        <div class="progress-project-circle">
            <el-progress type="circle" :percentage="77" :stroke-width="4" :show-text="true">
            </el-progress>
            <div class="flex">
                <div style="text-alcent:center">
                    <div class="circle" style="background-color:#fff;"></div>
                    <br/> 总预计 <br/> 360天
                </div>
                <div>
                    <div class="circle">
                    </div> <br/> 已消耗
                    <br/>183天
                </div>
                <div>
                    <div class="circle" style="background-color:#e4e8eb;">
                    </div> <br/> 剩余
                    <br/>177天</div>
            </div>
        </div>

        <div class="flex__1">
            <slot>
                昨日进度
                <el-progress :percentage="80" color="#8e71c7"></el-progress>
                昨日完成
                <el-progress :percentage="100" status="success"></el-progress>
                昨日未完成
                <el-progress :percentage="50" status="exception"></el-progress>
            </slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.progress-project {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  &-circle {
    width: 150px;
    text-align: center;
    & > .flex {
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  .flex__1 {
    margin: 0 20px;
  }
}
</style>
