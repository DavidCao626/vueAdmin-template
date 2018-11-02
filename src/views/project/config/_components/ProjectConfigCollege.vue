<template>
  <div>
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
          <div class="timeline-box-header__title2">
            <h3>
              <!-- 已用 1.6天，环节可用 33.4天，任需时长：31天，预计超时：0天。 -->
              开始日期：{{scopeInfo.planStartTime}},结束日期：{{scopeInfo.planEndTime}}，总时长：{{scopeDayCount.scopePlanTimeLong}},可用：{{scopeDayCount.scopeUsableTimeLong}}，当前计划用：{{scopeDayCount.scopeAllocationedTimeLong}}
            </h3>
          </div>
        </td>
      </tr>
      <template v-for="(item,index) in scopeWorkItems">
        <tr v-if="item.item.itemType=='manual'" :key="index">
          <td class="timeline-box">
            <span class="timeline-serial">
              {{++index}}
            </span>
            <div class="timeline-line" v-if="item.item.position!=='complete'"></div>
          </td>
          <td>
            <div class="tag tag-flex">
              <div class="tag-flex tag-flex-direction__column">
                <div class=" tag-flex tag-flex-justify__content">
                  <span>
                    <el-tooltip class="item" effect="dark" :content="item.item.stepName" placement="right">
                      <span class="tag-title">{{item.item.stepName}}
                        <small class="el-icon-question"></small>
                      </span>
                    </el-tooltip>
                  </span>
                  <span></span>

                </div>
                <div class="tag-description"></div>

              </div>
              <div class="tag-flex status-mark" style="margin-left:20px;">
              </div>
            </div>
          </td>
        </tr>
        <tr v-else :key="index">
          <td class="timeline-box">
            <span class="timeline-serial ">
              {{++index}}
            </span>
            <div class="timeline-line" v-if="item.item.position!=='complete'"></div>
          </td>
          <td>
            <div class="tag tag-flex">
              <div class="tag-flex tag-flex-direction__column">
                <div class=" tag-flex tag-flex-justify__content">
                  <span>
                    <el-tooltip class="item" effect="dark" :content="item.item.stepName" placement="right">
                      <span class="tag-title">{{item.item.stepName}}
                        <small class="el-icon-question"></small>
                      </span>
                    </el-tooltip>
                  </span>
                 <span>{{item.disPlanDate}}</span>
                </div>
                <div class="tag-description">计划开始时间： {{item.start==''?'未配置':formatMoment(item.start)}} ~ 计划结束时间： {{item.end==''?'未配置':formatMoment(item.end)}} </div>
              </div>
              <div class="tag-flex tag-flex-direction__column" style="margin-left:20px;">

                <el-popover placement="top" width="300" :ref="'popover'+item.item.id">
                  <p>{{ item.viewPlanAsDay }}天 {{ item.viewPlanHour }}小时</p>
                 <div>
                  <el-input style=" margin-top: 10px;width:100px;" size="small" type="Number" min="0"  :value="item.viewPlanAsDay" @change="handleChangeDay(item,$event)">
                  </el-input>
                  天
                  <el-input style=" margin-top: 10px;width:100px;" size="small" type="Number" min="0" max="24" :value="item.viewPlanHour" @change="handleChangeHour(item,$event)"></el-input>
                 小时</div>
                  <div style="text-align: right; margin-top: 10px">
                  </div>
                  <el-button slot="reference">调整时间</el-button>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </table>
    <div class="line"></div>
   <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
      <el-col :span="7">
        <el-button ref="next" @click="onSave">保存配置</el-button>
        <el-button ref="back" v-if="getNextEnable" @click="onSaveAndNext" type="primary">提交并下发任务</el-button>
        <el-button ref="return" v-else @click="onSaveAndReturn" type="primary">提交并返回控制台</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "../../_store/index.js";
import commons from "~/utils/common.js";
import moment from "moment";
export default {
  data() {
    return {};
  },
  props: ["hasNext"],
  computed: {
    getNextEnable: function() {
      console.log(this.hasNext);
      if (!this.hasNext || this.hasNext === "false") {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters({
      scopeInfo: store.namespace + "/getScopeConfigInfoScope",
      scopeWorkItems: store.namespace + "/getScopeConfigInfoWorkItems",
      scopeConfig: store.namespace + "/getScopeConfigInfo",
      scopeDayCount: store.namespace + "/getScopeConfigCountDay"
    })
  },
  methods: {
  ...mapActions({
      updateScopePlanTimeLong: store.namespace + "/updateScopePlanTimeLong",
      updateScopePlanTimeLongAndNext:store.namespace + "/updateScopePlanTimeLongAndNext",
      changeScopeItemHour: store.namespace + "/changeScopeItemDateHour"
    }),
    formatMoment: function(time) {
      return moment(time)
        .second(0).minute(0)
        .format("YYYY-MM-DD HH:mm");
    },
    onSaveAndNext() {
      console.log("保存并下发任务!");
      var planItems = {};
      for (var i = 0; i < this.scopeWorkItems.length; i++) {
        var workItem = this.scopeWorkItems[i];
        planItems[workItem.item.stepKey] = workItem.item.planTimeLong;
      }
      var itemId = commons.getRouterParam(this.$route, "itemId");
      this.updateScopePlanTimeLongAndNext({
        scopeId: this.scopeInfo.id,
        itemId: itemId,
        planItems: planItems
      }).then(result => {
        console.log([this.scopeInfo.id, result.resBody.id]);
        this.$router.push({
          name: "project_start",
          params: { scopeId: this.scopeInfo.id, itemId: result.resBody.id }
        });
      });
    },
    onSaveAndReturn() {
      console.log("保存并返回控制台!");
      var planItems = {};
      for (var i = 0; i < this.scopeWorkItems.length; i++) {
        var workItem = this.scopeWorkItems[i];
        planItems[workItem.item.stepKey] = workItem.item.planTimeLong;
      }
      var itemId = commons.getRouterParam(this.$route, "itemId");
      this.updateScopePlanTimeLongAndNext({
        scopeId: this.scopeInfo.id,
        itemId: itemId,
        planItems: planItems
      }).then(result => {
        this.$router.push({
          name: "control",
          params: { scopeId: this.scopeInfo.id }
        });
      });
    },
    onSave() {
      console.log("保存配置!");
      var planItems = {};
      for (var i = 0; i < this.scopeWorkItems.length; i++) {
        var workItem = this.scopeWorkItems[i];
        planItems[workItem.item.stepKey] = workItem.item.planTimeLong;
      }
      var itemId = commons.getRouterParam(this.$route, "itemId");
      this.updateScopePlanTimeLong({
        scopeId: this.scopeInfo.id,
        itemId: itemId,
        planItems: planItems
      });
    },
    handleChangeDay(param, value) {
      console.log("startChange");
      var hour=parseInt(value*24)+parseInt(param.viewPlanHour);
      this.changeScopeItemHour({ itemKey: param.stepKey, timeLong: hour });
    },
    handleChangeHour(param,value){
      console.log("startChange");
      var hour=parseInt(value)+parseInt(param.viewPlanAsDay*24);
      this.changeScopeItemHour({ itemKey:  param.stepKey, timeLong: hour });
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
