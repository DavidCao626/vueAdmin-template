<template>
    <table class="timeline">
        <tr>
            <td>
                <span class=" timeline-serial__big">
                    <svg-icon icon-class="clock" width="41px" height="39px" style="margin-top:10px;" />
                </span>
                <div class="timeline-line"></div>
            </td>
            <td>
                <div class="timeline-box-header__title">
                    <h3>
                         已用{{scopeInfo.useredDay}}天，环节可用 {{scopeInfo.useabledDay}}天，任需时长：{{scopeInfo.neededDay}}天，预计超时：{{scopeInfo.delayDay}}天。
                    </h3>
                </div>
            </td>
        </tr>
        <template v-for="(item,index) in items">
            <tr v-if="item.item.state=='F'" :key="index">
                <td class="timeline-box">
                    <span class="timeline-serial">
                        <i class="el-icon-check"></i>
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
                               <span v-if="item.item.itemType=='automatic'">计划{{item.planTimeDay}}天</span>
                            </div>
                            <div class="tag-description">实际用时（{{item.usedHourLong}}小时）</div>
                        </div>
                        <div class="tag-flex status-mark" style="margin-left:20px;">
                            <!-- 已完成图标 -->
                            <svg-icon icon-class="status-ok" width="65px" height="65px" />
                        </div>
                    </div>
                </td>
            </tr>

            <tr v-else-if="item.item.state=='S'" :key="index">
                <td class="timeline-box">
                    <span class="timeline-serial__runing ">
                        <i class="el-icon-location"></i>
                    </span>
                    <div class="timeline-line timeline-blur" v-if="item.item.position!=='complete'"></div>
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
                                <span v-if="item.item.itemType=='automatic'">计划{{item.planTimeDay}}天</span>
                            </div>
                            <div class="tag-description" v-if="item.item.itemType=='automatic'">实际开始时间： {{item.start==''?'-':item.start}} ~ 计划结束时间：{{item.end==''?'未配置':item.end}} </div>
                            <div class="tag-description">已用（{{item.usedHourLong}}小时）</div>
                        </div>
                        <div class="tag-flex tag-flex-direction__column" style="margin-left:20px;">
                            <el-button type="warning" v-if="item.item.itemType=='manual'" size="mini"  @click="handle(item)">操作</el-button>
                            <el-popover placement="top" width="160" :ref="'popover'+item.item.id" v-else >
                                <p>请输入调整后的天数</p>
                                <el-input-number style=" margin-top: 10px" size="small" v-model="item.planTimeDay"></el-input-number>
                                <div style="text-align: right; margin-top: 10px">
                                    <el-button type="primary" size="mini" @click="updateItemPlanDayHandler(item)">保存</el-button>
                                </div>
                                <el-button type="warning" :disabled="getItemEnableState(item)" size="mini"  slot="reference">调整天数</el-button>
                            </el-popover>
                        </div>
                         <div  class="tag-flex tag-flex-direction__column" style="margin-left:20px;" > <el-button size="mini" @click="userOperationCompleteItem(item)" type="warning" >立即结束</el-button></div>
                    </div>
                </td>
            </tr>

            <tr v-else-if="item.item.state=='C'" :key="index">
                <td class="timeline-box">
                    <span class="timeline-serial timeline-blur">
                        <i class="el-icon-time"></i>
                    </span>
                    <div class="timeline-line timeline-blur" v-if="item.item.position!=='complete'"></div>
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
                              <span v-if="item.item.itemType=='automatic'">计划{{item.planTimeDay}}天</span>
                            </div>
                            <div class="tag-description" v-if="item.item.itemType=='automatic'">计划开始时间：2017-02-05 22:00 ~ 计划结束时间：2018-07-01 00:00 </div>
                        </div>
                        <div class="tag-flex tag-flex-direction__column" style="margin-left:20px;" v-if="item.item.itemType=='automatic'">

                            <el-popover placement="top" width="160" :ref="'popover'+item.item.id">
                                <p>请输入调整后的天数</p>
                                <el-input-number style=" margin-top: 10px" size="small" :min="0" v-model="item.planTimeDay"></el-input-number>
                                <div style="text-align: right; margin-top: 10px">
                                    <el-button type="primary" size="mini">保存</el-button>
                                </div>
                                <el-button type="warning" :disabled="getItemEnableState(item)" size="mini"  slot="reference">调整天数</el-button>
                            </el-popover>

                        </div>
                        <div class="tag-flex  status-mark" style="margin-left:20px;" v-else>
                            <svg-icon icon-class="status-no" width="65px" height="65px" />
                            <!-- 未开始图标 -->
                        </div>
                    </div>
                </td>
            </tr>
             <tr v-else-if="item.item.state=='E'" :key="index">
                <td class="timeline-box">
                    <span class="timeline-serial timeline-blur" style="background-color:red">
                        <i class="el-icon-time"></i>
                    </span>
                    <div class="timeline-line timeline-blur" v-if="item.item.position!=='complete'"></div>
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
                              <span v-if="item.item.itemType=='automatic'">计划{{item.planTimeDay}}天</span>
                            </div>
                            <div class="tag-description" v-if="item.item.itemType=='automatic'">计划开始时间：2017-02-05 22:00 ~ 计划结束时间：2018-07-01 00:00 </div>
                        </div>
                        <div class="tag-flex tag-flex-direction__column" style="margin-left:20px;" v-if="item.item.itemType=='automatic'">

                            <el-popover placement="top" width="160" :ref="'popover'+item.item.id">
                                <p>请输入调整后的天数</p>
                                <el-input-number style=" margin-top: 10px" size="small" :min="0" v-model="item.planTimeDay"></el-input-number>
                                <div style="text-align: right; margin-top: 10px">
                                    <el-button type="primary" size="mini">保存</el-button>
                                </div>
                                <el-button type="warning" :disabled="getItemEnableState(item)" size="mini"  slot="reference">调整天数</el-button>
                            </el-popover>
                            
                             

                        </div>
                        
                        <div class="tag-flex  status-mark" style="margin-left:20px;" v-else>
                            <svg-icon icon-class="status-no" width="65px" height="65px" />
                            <!-- 未开始图标 -->
                        </div>
                        <div  class="tag-flex tag-flex-direction__column" style="margin-left:20px;" > <el-button size="mini" @click="userOperationStartItem(item)" type="warning" >手动启动</el-button></div>
                    </div>
                </td>
            </tr>

        </template>
    </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../../_store/index.js'
import moment from 'moment'
import _lodash from 'lodash'
export default {
   components: {
  },
  computed: {
    ...mapGetters({
      items: store.namespace + '/getInteratedItems',
      scopeInfo: store.namespace + '/getInteratedScopeInfo'
    })
  },
  methods: {
    ...mapActions({
      updateItemPlanDay: store.namespace + '/updateItemPlanDay',
      handlerStartWorkItem:store.namespace+"/handlerStartWorkItem",
      handlerCompleteWorkItem:store.namespace+"/handlerCompleteWorkItem"
    }),
    getItemEnableState: function(item) {
      if (item.item.state === 'S') {
        return false
      } else {
        return true
      }
    },
    getStateOfCircle(State) {
      if (State === 'C') return 'state-circle'
      else if (State === 'S') return 'state-circle ' + 'state-circle__run'
      else if (State === 'E') return 'state-circle ' + 'state-circle__run'
      else return 'state-circle ' + 'state-circle__ok'
    },
    handleChange(value) {
      console.log(value)
    },
    userOperationStartItem(item){
        this.handlerStartWorkItem({ 'itemId': item.item.id})
    },
    userOperationCompleteItem(item){
        this.handlerCompleteWorkItem({'itemId':item.item.id})
    },
    handle: function(item) {
      console.log(item.item.id)
      console.log(this.scopeInfo.id)
      var pathName = item.action
      if (!pathName) {
        this.$message({ 'message': '未知的业务路径！' })
        return false
      }
      if (_lodash.startsWith(pathName, '/')) {
        this.$router.push({
          path: pathName,
          query: { scopeId: this.scopeInfo.id, itemId: item.item.id }
        })
      } else {
        this.$router.push({
          name: pathName,
          params: { scopeId: this.scopeInfo.id, itemId: item.item.id }
        })
      }
    },
    updateItemPlanDayHandler: function(item) {
      this.updateItemPlanDay({ 'itemId': item.item.id, 'dayLong': item.planTimeDay })
    }
  },
  data() {
    return {
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
