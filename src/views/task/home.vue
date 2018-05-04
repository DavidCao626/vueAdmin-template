<template>
    <page class="page" :breadcrumb="false">
        <div class="page-box">
            <div class="page-box__2">
                <div class="page-box__block flex">
                    <div class="page-box__1">
                        <el-tabs tab-position="right" style="height: 200px;width:100%">
                            <el-tab-pane label="内蒙古大学2017年贫困建党">
                                <ProjectProgress></ProjectProgress>
                            </el-tab-pane>
                            <el-tab-pane label="乌兰夫奖学金申请">
                                <ProjectProgress></ProjectProgress>
                            </el-tab-pane>
                            <el-tab-pane label="贫困建党收费项目">
                                 <ProjectProgress></ProjectProgress>
                            </el-tab-pane>
                            <el-tab-pane label="定时任务补偿">
                                 <ProjectProgress></ProjectProgress>
                            </el-tab-pane>
                            <el-tab-pane label="内大2018年夏日文化晚会筹备">
                                 <ProjectProgress></ProjectProgress>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="page-box__0">
                        <router-link to="/task/index">
                            <i class="el-icon-more"></i>
                        </router-link>
                    </div>
                </div>
                <div class="page-box__block">
                    2
                </div>
            </div>
            <div class="page-box__1">
                <div class="page-box__block">
                    1
                </div>
                <div class="page-box__block">
                    2
                </div>
            </div>
        </div>

    </page>
</template>
<script>
import { ProjectProgress } from '~/views/task/components/Progress'
export default {
  components: {
    ProjectProgress
  }
}
</script>
<style lang="scss" scoped>
.page {
  &-box {
    display: flex;
    &__0 {
      flex: 0;
    }
    &__1 {
      flex: 1;
    }
    &__2 {
      flex: 2;
    }
    &__block {
      margin: 0px 20px 20px auto;
      padding: 25px;
      background-color: #ffffff;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;

      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
    }
    &__block:hover {
      box-shadow: 0 2px 7px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.1s ease-in-out;
    }
  }
}
</style>

