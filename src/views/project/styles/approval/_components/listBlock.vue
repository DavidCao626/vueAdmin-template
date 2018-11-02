<template>
    <div class="list-block">
        <div class="approval-panel" v-for="(i,index) in lists" :key="index">
            <table cellspacing="0">

                <tr>
                    <th colspan="3" style="text-align: left;padding-left:20px">
                        <input type="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 编号：{{i.id}}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         业务类别：{{i.sqType}} </th>
                    <th style="text-align: right;">申请时间：{{i.sqTime}}&nbsp;&nbsp;</th>
                </tr>
                <template v-if="checkboxVal.indexOf('shenqinren')>=0">
                    <tr>
                        <td class="data-head" rowspan="2">申请人信息</td>
                        <td>
                            姓名：{{i.name}}
                        </td>
                        <td colspan="1">
                            学号：{{i.cid}}
                        </td>
                        <td colspan="1">
                            联系电话：{{i.phone}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            所在班级：{{i.class}}
                        </td>
                    </tr>
                </template>
                <template v-if="checkboxVal.indexOf('jiating')>=0">
                    <tr>
                        <td class="data-head" rowspan="3">家庭情况信息</td>
                        <td>
                            家庭人口数：{{i.jtNumber}}口
                        </td>
                        <td colspan="2">
                            家庭个人情况：{{i.jtQk}}
                        </td>

                    </tr>

                    <tr>
                        <td colspan="1">
                            是否低保：{{i.jtisDb}}
                        </td>
                        <td colspan="2">
                            是否建档立卡：{{i.jtisjdlk}}
                        </td>
                    </tr>
                    <tr>


                        <td colspan="1">
                            人均月收入:{{i.jtsr}}元
                        </td>
                        <td colspan="2">
                            人均月支出:{{i.jtzc}}元
                        </td>
                    </tr>

                </template>
                <template v-if="checkboxVal.indexOf('shenqin')>=0">
                    <tr>
                        <td class="data-head" rowspan="3">申请信息</td>
                        <td>
                            申请类别：{{i.sqType}}
                        </td>
                        <td colspan="2">
                            申请等级：{{i.sqdengji}}
                        </td>

                    </tr>

                    <tr>
                        <td colspan="3">
                            申请理由：{{i.sqLiyou}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            相关附件：
                            <a v-for="(item,index) in i.sqFujian" :key="index" :url="item.url">{{item.name}}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                         
                        </td>
                    </tr>
                </template>
                <template v-if="checkboxVal.indexOf('banjipingshen')>=0">
                    <tr>
                        <td class="data-head" rowspan="2">班级评审情况</td>
                        <td>
                            推荐结果：该学生为{{i.classJieguo}}
                        </td>
                        <td colspan="1">
                            推荐人：{{i.classTujianRen}}
                        </td>
                        <td colspan="1">
                            推荐人职务：{{i.classTujianRenZhiwu}}
                        </td>
                    </tr>
                    

                    <tr>
                        <td colspan="1">
                            班级评议总参与人员数：{{i.classPingYiCountNumber}}人
                        </td>
                        <td colspan="1">
                            支持：{{i.classPingYiOk}}人
                        </td>
                        <td colspan="1">
                            反对：{{i.classPingYiNo}}人
                        </td>
                    </tr>
                </template>
                <template v-if="checkboxVal.indexOf('xueyuanpingshen')>=0">
                    <tr>
                        <td class="data-head" rowspan="2">学院评审情况</td>
                        <td>
                            推荐结果：该学生为{{i.xueyuanJieguo}}
                        </td>
                        <td colspan="1">
                            推荐人：{{i.xueyuanTujianRen}}
                        </td>
                        <td colspan="1">
                            推荐人职务：{{i.xueyuanTujianRenZhiwu}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1">
                            学院评议总参与人员数：{{i.xueyuanPingYiCountNumber}}人
                        </td>
                        <td colspan="1">
                            支持：{{i.xueyuanPingYiOk}}人
                        </td>
                        <td colspan="1">
                            反对：{{i.xueyuanPingYiNo}}人
                        </td>
                    </tr>
                </template>
                <tr>
                    <td class="data-head" rowspan="1">审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批</td>
                    <td colspan="3">
                        <el-form ref="form" :model="i.form" label-width="80px" size="mini">

                            <el-form-item label="贫困等级">
                                <el-select v-model="i.form.type" placeholder="请选择活动区域">
                                    <el-option label="一般困难" value="一般困难"></el-option>
                                    <el-option label="困难" value="困难"></el-option>
                                    <el-option label="特殊困难" value="特殊困难"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审批意见">
                                <el-input type="textarea" v-model="i.form.desc" style="width:90%"></el-input>
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../../../_store/index.js";
export default {
  data() {
    return {
      lists: [
        {
          id: 0,
          sqtime: "2018-08-01",
          name: "王小明",
          cid: "13123132",
          phone: "15034933020",
          class: "内蒙古大学数学系1班",
          jtNumber: "3",
          jtQk: "单亲",
          jtisDb: "是",
          jtisjdlk: "是",
          jtsr: "3000",
          jtzc: "2800",
          sqType: "贫困建档",
          sqdengji: "特殊困难",
          sqLiyou:
            "大三的学习生活如期而至，而父亲，也和每年一样，又在挨家挨户的为我的学费奔走……现如今，党和国家的政策是大力发展教育事业，这让我这样的学生看到了生活的希望。",
          sqFujian: [
            { name: "贫困照片.png", url: "http://baidu.com/1.jpg" },
            { name: "贫困照片2.png", url: "http://baidu.com/2.jpg" }
          ],
          classJieguo: "特殊困难",
          classTujianRen: "鄂王",
          classTujianRenZhiwu: "班主任",
          classPingYiCountNumber: "39",
          classPingYiOk: "23",
          classPingYiNo: "2",
          xueyuanJieguo: "特殊困难",
          xueyuanTujianRen: "鄂王",
          xueyuanTujianRenZhiwu: "内蒙古大学数学学院学工办公室主任",
          xueyuanPingYiCountNumber: "69",
          xueyuanPingYiOk: "63",
          xueyuanPingYiNo: "2",
          form: {
            type: [],
            desc: ""
          }
        }, {
          id: 1,
          sqtime: "2018-08-01",
          name: "王小明",
          cid: "13123132",
          phone: "15034933020",
          class: "内蒙古大学数学系1班",
          jtNumber: "3",
          jtQk: "单亲",
          jtisDb: "是",
          jtisjdlk: "是",
          jtsr: "3000",
          jtzc: "2800",
          sqType: "贫困建档",
          sqdengji: "特殊困难",
          sqLiyou:
            "大三的学习生活如期而至，而父亲，也和每年一样，又在挨家挨户的为我的学费奔走……现如今，党和国家的政策是大力发展教育事业，这让我这样的学生看到了生活的希望。",
          sqFujian: [
            { name: "贫困照片.png", url: "http://baidu.com/1.jpg" },
            { name: "贫困照片2.png", url: "http://baidu.com/2.jpg" }
          ],
          classJieguo: "特殊困难",
          classTujianRen: "鄂王",
          classTujianRenZhiwu: "班主任",
          classPingYiCountNumber: "39",
          classPingYiOk: "23",
          classPingYiNo: "2",
          xueyuanJieguo: "特殊困难",
          xueyuanTujianRen: "鄂王",
          xueyuanTujianRenZhiwu: "内蒙古大学数学学院学工办公室主任",
          xueyuanPingYiCountNumber: "69",
          xueyuanPingYiOk: "63",
          xueyuanPingYiNo: "2",
          form: {
            type: [],
            desc: ""
          }
        }
      ]
    };
  },
  props: {
    checkboxVal: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      getStylesConfig: store.namespace + "/getStylesConfig"
    })
  },
  methods: {
    onSubmit() {
      console.log(this.checkboxVal);
    }
  }
};
</script>

<style lang='scss' scoped>
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
