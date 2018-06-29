<template>
    <table class="timeline">
        <tr>
            <td>
                <span class=" timeline-serial__big">
                    <!-- <svg-icon icon-class="form"  width="41px" height="39px" style="margin-top:10px;color:#fff" /> -->
                    <i class="el-icon-edit-outline" style="font-size:30px;margin-top:15px;"></i>
                </span>
                <div class="timeline-line"></div>
            </td>
            <td>
                <div class="timeline-box-header__title2" >
                    <h3>
                        <!-- 已用 1.6天，环节可用 33.4天，任需时长：31天，预计超时：0天。 -->
                        {{ProjectInfo}}
                    </h3>
                </div>
            </td>
        </tr>
        <template v-for="(item,index) in ProjectItemsData">
            <tr v-if="item.ProjectItemType==0">
                <td class="timeline-box">
                    <span class="timeline-serial">
                        {{++index}}
                    </span>
                   <div class="timeline-line  " v-if="index!=(ProjectItemsData.length)"></div>
                </td>
                <td>
                    <div class="tag tag-flex">
                        <div class="tag-flex tag-flex-direction__column">
                            <div class=" tag-flex tag-flex-justify__content">
                                <span>
                                    <el-tooltip class="item" effect="dark" :content="item.ProjectItemDesc" placement="right">
                                        <span class="tag-title">{{item.ProjectItemName}}
                                            <small class="el-icon-question"></small>
                                        </span>

                                    </el-tooltip>
                                </span>
                                <span></span>

                            </div>
                            <div class="tag-description">(手动节点不需要配置)</div>

                        </div>
                        <div class="tag-flex status-mark" style="margin-left:20px;">
                        </div>
                    </div>
                </td>
            </tr>

           

            <tr v-else>
                <td class="timeline-box">
                    <span class="timeline-serial ">
                       {{++index}}
                    </span>
                    <div class="timeline-line  " v-if="index!=(ProjectItemsData.length)"></div>
                </td>
                <td>
                    <div class="tag tag-flex">
                        <div class="tag-flex tag-flex-direction__column">
                            <div class=" tag-flex tag-flex-justify__content">
                                <span>
                                    <el-tooltip class="item" effect="dark" :content="item.ProjectItemDesc" placement="right">
                                        <span class="tag-title">{{item.ProjectItemName}}
                                            <small class="el-icon-question"></small>
                                        </span>
                                    </el-tooltip>
                                </span>
                                <span >计划2天</span>
                                
                            </div>
                            <div class="tag-description" >计划开始时间：2017-02-05 22:00 ~ 计划结束时间：2018-07-01 00:00 </div>
                        </div>
                        <div class="tag-flex tag-flex-direction__column" style="margin-left:20px;" >

                            <el-popover placement="top" width="160" :ref="'popover'+item.nodeId">
                                <p>请输入调整后的天数</p>
                                <el-input-number style=" margin-top: 10px" size="small" v-model="item.plannedDays"></el-input-number>
                                <div style="text-align: right; margin-top: 10px">
                                    <el-button type="primary" size="mini" @click="saveDays(item.nodeId)">保存</el-button>
                                </div>
                                <el-button slot="reference">调整天数</el-button>
                            </el-popover>

                        </div>
                    </div>
                </td>
            </tr>

        </template>
    </table>
</template>

<script>
export default {
  data() {
    return {
      ProjectInfo:
        " 开始日期： 2018-06-28   结束日期： 2018-06-21         总共 -7.6天    剩余： -8.4 天   当前计划用：2 天",
      ProjectItemsData: [
        {
          nodeId: 0,
          ProjectStatus: 2, //已结束
          ProjectItemType: 0, //环节类型 0手动，1自动
          plannedDays: 0, //计划天数
          ProjectItemName: "配置计划", //环节名字
          ProjectItemDesc: "环节说明：下发任务该环节意思是给学院分发项目任务" //环节说明
        },
        {
          nodeId: 1,
          ProjectStatus: 1, //进行中
          plannedDays: 0, //计划天数
          ProjectItemType: 1, //环节类型 0手动，1自动
          ProjectItemName: "学校推荐", //环节名字
          ProjectItemDesc: "下发任务该环节意思是给学院分发项目任务" //环节说明
        },
        {
          nodeId: 2,
          ProjectStatus: 0, //未开始
          plannedDays: 0, //计划天数
          ProjectItemType: 0, //环节类型 0手动，1自动
          ProjectItemName: "预审", //环节名字
          ProjectItemDesc: "预审数据" //环节说明
        },
        {
          nodeId: 3,
          ProjectStatus: 0, //未开始
          plannedDays: 0, //计划天数
          ProjectItemType: 1, //环节类型 0手动，1自动
          ProjectItemName: "公示", //环节名字
          ProjectItemDesc: "公示数据" //环节说明
        },
        {
          nodeId: 4,
          ProjectStatus: 0, //未开始
          plannedDays: 0, //计划天数
          ProjectItemType: 0, //环节类型 0手动，1自动
          ProjectItemName: "终审", //环节名字
          ProjectItemDesc: "终审环节说明" //环节说明
        }
      ]
    };
  },
  methods: {
    saveDays(nodeId) {
      //保存天数
      alert(nodeId);
    },
    config(item) {
      //操作
      alert(item.nodeId);
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin serial {
  background: #ffa654;
  color: #ffffff;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
  @content;
}
.status-mark {
  margin-right: -15px;
  &__runing {
    position: absolute;
    top: -1px;
    left: -1px;
    z-index: 999;
  }
}
.timeline {
    margin: 20px;
  &-serial {
    @include serial {
      height: 30px;
      width: 30px;
      line-height: 30px;
      margin-left: 15px;
    }
  }
  &-serial__big {
    @include serial {
      height: 60px;
      width: 60px;
      line-height: 60px;
    }
  }
  &-serial__runing {
    @include serial {
      height: 30px;
      width: 30px;
      line-height: 30px;
      margin-left: 15px;
      background: #ffffff;
      & > i {
        color: #ffa654 !important;
        font-size: 30px !important;
      }
    }
  }
  &-line {
    height: 60px;
    margin: 10px auto 10px auto;
    background: #ffa654;
    width: 2px;
  }

  &-blur {
    background: #d1d1d1;
  }
  &-box {
    vertical-align: top !important;
    &-header__title {
      background-image: linear-gradient(-269deg, #fd924b 14%, #ffcf43 100%);
      color: #fff;
      margin-left: -40px;
      margin-top: 10px;
      height: 40px;
      padding: 8px 40px;
      border-radius: 0 20px 20px 0;
    }
    &-header__title2 {
      color: #444;
      margin-left: -40px;
      margin-top: 10px;
      height: 40px;
      padding: 8px 40px;
      border-radius: 0 20px 20px 0;
    }
  }
  td {
    vertical-align: top !important;
    padding-left: 20px;
  }
}
.timeline:not(:first-of-type) timeline-serial {
  height: 30px;
  width: 30px;
  line-height: 30px;
}

.tag {
  margin-top: -24px;
  height: 80px;
  border: 1px solid #ececec;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  padding: 12px 15px;
  display: inline-block;
  box-shadow: 0 2px 4px -4px rgba(0, 0, 0, 0.5);
  &-title {
    /* 配置项目计划: */
    font-size: 16px;
    color: #444;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 500;
  }
  &-description {
    /* 实际用时：0小时: */
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #666;
    font-weight: 500;
    font-size: 14px;
  }
  &-flex {
    display: inline-flex;
    &-direction__column {
      flex-direction: column;
      justify-content: center;
    }
    &-justify__content {
      align-items: center;
      justify-content: space-between;
    }
  }
  .tag-title i,
  small {
    color: #ccc;
  }
}
.tag:before,
.tag:after {
  content: "";
  display: block;
  border-width: 15px;
  position: absolute;
  left: -30px;
  top: 22px;
  border-style: solid dashed dashed;
  border-color: transparent #ececec transparent transparent;
  font-size: 0;
  line-height: 0;
}
.tag:after {
  left: -28px;
  border-color: transparent #fff transparent transparent;
}
</style>
