<template>
    <page>
        <span slot="title">通知中心</span>

        <div slot="panel" class="messages">
            <div class="panel-control">
                <div class="panel-control__flex">
                    <div class="panel-control__flex-left">
                        <el-badge :value="noReadNumber" :max="99" class="item">
                            <el-button size="small" plain>未读</el-button>
                        </el-badge>
                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;

                        <el-button size="small" type="text" style="color:#8d8d8d"> 已收藏({{messagesMarkCount}})</el-button>
                        &nbsp; &nbsp;&nbsp;
                        <el-button size="small" type="text" style="color:#8d8d8d"> 已读({{ReadNumber}})</el-button>

                    </div>
                    <div class="panel-control__flex-right" style="margin-right:20px;">

                        <el-input placeholder="消息标题或内容" style="width:255px;">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
                        </el-input>
                    </div>
                </div>
            </div>

            <div class="panel-body">
                <div style="margin:20px 0 10px;font-size:12px;">
                    今天 (&nbsp;3&nbsp;封)
                </div>
                <el-collapse accordion @change="messageShow()">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;

                            <el-tooltip content="标记已读/未读" placement="left">
                                <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>
                            </el-tooltip>
                            &nbsp;
                            <span class="messages-title">你申请对矛盾文学奖学金未通过校领导审核</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">
                                <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>
                            </el-tooltip>
                            &nbsp;
                            <span class="messages-title">请你尽快与本月底完成2017年上学期我班贫困生评选</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你刚刚点评了王小明同学的家庭贫困内容</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你的2018年上学期学费已经成功缴纳</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <div style="margin:30px 0 10px;font-size:12px;">
                    星期三 ( 3 封)
                </div>
                <el-collapse accordion @change="messageShow()">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title">你申请对矛盾文学奖学金未通过校领导审核</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">
                                <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>
                            </el-tooltip>
                            &nbsp;
                            <span class="messages-title">请你尽快与本月底完成2017年上学期我班贫困生评选</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你刚刚点评了王小明同学的家庭贫困内容</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你的2018年上学期学费已经成功缴纳</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <div style="margin:30px 0 10px;font-size:12px;">
                    更久 ( 285 封)
                </div>
                <el-collapse accordion @change="messageShow()">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title">你申请对矛盾文学奖学金未通过校领导审核</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">
                                <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>
                            </el-tooltip>
                            &nbsp;
                            <span class="messages-title">请你尽快与本月底完成2017年上学期我班贫困生评选</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你刚刚点评了王小明同学的家庭贫困内容</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你的2018年上学期学费已经成功缴纳</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="5">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你的2018年上学期学费已经成功缴纳</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="6">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你的2018年上学期学费已经成功缴纳</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="7">
                        <template slot="title">
                            <template v-if="isScreening==true">
                                <el-checkbox :true-label="12"></el-checkbox>
                            </template>
                            &nbsp;
                            <el-tooltip content="标记已读/未读" placement="top">                                 <div class="circle messages-readState" :class="{'messages-readState__true':isReadForMessage}" @click.stop="readSwitch()"></div>                             </el-tooltip>
                            &nbsp;
                            <span class="messages-title"> 你的2018年上学期学费已经成功缴纳</span>

                            <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span>
                            <span class="messages-time">今天&nbsp;21:20</span>
                            <span class="messages-author">来源&nbsp;:&nbsp;内大学工处</span>
                        </template>
                        <div class="messages-body">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </div>
                    </el-collapse-item>

                </el-collapse>

                <div class="messages-pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 100, 300, 400]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
                <div class="clearfix"><br/></div>
            </div>
        </div>

    </page>
</template>
<script>
export default {
  data() {
    return {
      noReadNumber: 22,
      ReadNumber: 58,
      messagesMarkCount: 8,
      isReadForMessage: false,
      isMarkForMessage: false,
      isScreening: false
    }
  },

  methods: {
    search() {},
    messageShow(itme) {
      console.log('你点开了该消息')
      // ToDo: itme.isReadForMessage = true
      this.noReadNumber--
      this.ReadNumber++
      this.isReadForMessage = true // 真实数据情况下去改变以上item循环元素中对应的值
    },
    readSwitch(itemID) {
      // ToDo: 拿到行内id
      if (this.isReadForMessage) {
        this.isReadForMessage = false
        this.noReadNumber++
        this.ReadNumber--
        this.$message({
          message: '标为已读状态',
          type: 'success'
        })
      } else {
        this.isReadForMessage = true
        this.noReadNumber--
        this.ReadNumber++
        this.$message({
          message: '已取消已读状态',
          type: 'info'
        })
      }
    },
    markSwitch(itemID) {
      // ToDo: 拿到行内id
      if (this.isMarkForMessage) {
        this.isMarkForMessage = false
        this.$message({
          message: '已取消收藏',
          type: 'info'
        })
      } else {
        this.isMarkForMessage = true
        this.$message({
          message: '收藏成功',
          type: 'success'
        })
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.messages {
  color: #8d8d8d;
  &-time {
    float: right;
    margin-right: 20px;
    font-size: 13px;
  }
  &-author {
    float: right;
    margin-right: 20px;
    font-size: 13px;
  }
  &-readState {
    background-color: red;

    &__true {
      background-color: #e4e8eb;
    }
  }
  &-mark {
    float: right;
    margin-right: 20px;
    font-size: 18px;
    color: var(--color-grey-light-2);
    &__true {
      color: rgb(247, 186, 42);
    }
    &__true:before {
      content: "\E637";
    }
  }
  &-pagination {
    margin-top: 30px;
    margin-bottom: 40px;
    float: right;
  }
}
</style>
