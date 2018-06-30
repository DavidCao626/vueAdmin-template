<template>
    <div class="list-block">
        <div class="approval-panel" v-for="(i,index) in 5" :key="index">
            <table cellspacing="0">
                <tr>
                    <th colspan="3" style="text-align: left;padding-left:20px">
                        <input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 编号：00000{{++index}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 业务类别：贫困建档 </th>
                    <th style="text-align: right;">申请时间：2018-06-30&nbsp;&nbsp;</th>
                </tr>
                <tr>
                    <td class="data-head" rowspan="2">申请人信息</td>
                    <td>
                        姓名：王小明
                    </td>
                    <td colspan="1">
                        学号：130128199007161811
                    </td>
                    <td colspan="1">
                        联系电话：15034933020
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        所在班级：内蒙古大学数学学院17级35班
                    </td>
                </tr>

                <tr>
                    <td class="data-head" rowspan="3">家庭情况信息</td>
                    <td>
                        家庭人口数：3口
                    </td>
                    <td colspan="2">
                        家庭个人情况：单亲
                    </td>

                </tr>

                <tr>
                    <td colspan="1">
                        是否低保：是
                    </td>
                    <td colspan="2">
                        是否建档立卡：是
                    </td>
                </tr>
                <tr>
                    <td colspan="1">
                        人均月收入:1500元
                    </td>
                    <td colspan="2">
                        人均月支出:1300元
                    </td>
                </tr>

                <tr>
                    <td class="data-head" rowspan="3">申请信息</td>
                    <td>
                        申请类别：贫困建档
                    </td>
                    <td colspan="2">
                        申请等级：特殊困难
                    </td>

                </tr>

                <tr>
                    <td colspan="3">
                        申请理由：大三的学习生活如期而至，而父亲，也和每年一样，又在挨家挨户的为我的学费奔走……现如今，党和国家的政策是大力发展教育事业，这让我这样的学生看到了生活的希望。我满怀热血感谢党和国家对贫困学生的关心。真诚希望领导给我一次机会，一解我求学之路的燃眉之急。我会以200%的努力好好学习，争取上进！只要自己一有能力，就马上回馈社会，帮助所有有需要的人。特别的是我一定要成为一个能对国家和社会做出特殊和巨大贡献的人。再次真挚的感谢各位领导！此致 敬礼。
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        相关附件：
                        <a>贫困照片.png</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a>村委会证明.png</a>
                    </td>
                </tr>

                <tr>
                    <td class="data-head" rowspan="2">班级评审情况</td>
                    <td>
                        推荐结果：该学生为特殊困难
                    </td>
                    <td colspan="1">
                        推荐人：王越
                    </td>
                    <td colspan="1">
                        推荐人职务：班主任
                    </td>
                </tr>
                <tr>
                    <td colspan="1">
                        班级评议总参与人员数：50人
                    </td>
                    <td colspan="1">
                        支持：38人
                    </td>
                    <td colspan="1">
                        反对：3人
                    </td>
                    <tr>
                        <td class="data-head" rowspan="2">学院评审情况</td>
                        <td>
                            推荐结果：该学生为特殊困难
                        </td>
                        <td colspan="1">
                            推荐人：李涛
                        </td>
                        <td colspan="1">
                            推荐人职务：内蒙古大学数学学院学工办公室主任
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1">
                            学院评议总参与人员数：50人
                        </td>
                        <td colspan="1">
                            支持：49人
                        </td>
                        <td colspan="1">
                            反对：1人
                        </td>
                    </tr>

                    <tr>
                        <td class="data-head" rowspan="1">审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批</td>
                        <td colspan="3">
                            <el-form ref="form" :model="form" label-width="80px" size="mini">

                                <el-form-item label="贫困等级">
                                    <el-select v-model="form.type" placeholder="请选择活动区域">
                                        <el-option label="一般困难" value="shanghai"></el-option>
                                        <el-option label="困难" value="beijing"></el-option>
                                        <el-option label="特殊困难" value="beijing1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="审批意见">
                                    <el-input type="textarea" v-model="form.desc" style="width:90%"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">同&nbsp;&nbsp;意</el-button>
                                    <el-button>驳&nbsp;&nbsp;回</el-button>
                                </el-form-item>
                            </el-form>
                        </td>
                    </tr>
            </table>
        </div>
        <div class="approval-panel">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import store from "../../../_store/index.js";
export default {
  data() {
    return {
      form: {
        type: [],
        desc: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      getStylesConfig: store.namespace + "/getStylesConfig"
    })
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang='scss' scoped>
.el-form-item {
  margin-bottom: 10px;
}
.demo-form-inline .el-form-item {
  margin-bottom: 0px;
}
.approval-panel {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
}
.list-block {
  table,
  td {
    border: 1px solid #ebeef5;
  }
  th {
    background-color: #ebeef5;

    font-weight: 500;
    font-size: 12px;
  }
  td,
  th {
    padding: 5px;
    padding-left: 10px;
    color: #303133;
  }
  table {
    width: 100%;
    font-size: 13px;

    .data-head {
      width: 15%;
      text-align: center;
    }
  }
}
</style>
