<template>
    <div>
        <slot name="header">
            <div class="approval-panel" style="">
                <div style="float: right;    margin-top: 4px;">
                    <el-button-group>
                        <el-button plain size="mini">
                            <i class="el-icon-sort-down"></i>
                        </el-button>

                        <el-button plain size="mini">

                            <i class="el-icon-sort-up"></i>
                        </el-button>
                    </el-button-group>
                </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                    <el-form-item label="业务类别">
                        <el-select v-model="formInline.region" placeholder="筛选类别">
                            <el-option label="全部" value="shanghai"></el-option>
                            <el-option label="贫困建档" value="beijing"></el-option>
                            <el-option label="助学金" value="beijing2"></el-option>
                            <el-option label="奖学金" value="beijing3"></el-option>
                            <el-option label="学生资助" value="beijing4"></el-option>
                            <el-option label="其他" value="beijing5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="相关项目">
                        <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入相关项目名称" @select="handleSelect"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="上报机构">
                        <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入相关项目名称" @select="handleSelect"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="申请人学号">
                        <el-input v-model="formInline.user" placeholder="申请人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </slot>
        <table cellspacing="0">
            <tr>
                <th style="width:20px"></th>
                <th>申请人信息</th>
                <th>家庭情信息</th>
                <th style="width:120px">申请信息</th>
                <th>互评结果</th>
                <th>组评结果</th>
                <th style="width:320px">推荐操作</th>
            </tr>
            <tr v-for="i in lis" key="i">

                <td @click="i.isShow=!i.isShow">
                    <i class="el-icon-arrow-right" v-if="i.isShow"></i>
                    <i class="el-icon-d-arrow-right" v-else></i>
                </td>

                <template v-if="i.isShow">
                    <td>

                        <p>{{i.name}} {{i.cid}}</p>
                    </td>
                    <td>
                        <p>家庭人数{{i.jtNumber}}口，{{i.jtQk}}，{{i.jtisDb=='是'?'低保户':''}}，{{i.jtisDb=='是'?'已建档立卡':''}}，人均月收入{{i.jtsr}}元，月支出{{i.jtzc}}元</p>
                    </td>
                    <td>{{i.sqType}}</td>
                    <td>
                        <p>互评{{i.huping}}，互评总参与{{i.hupingCount}}人，同意{{i.hupingOk}}人，反对{{i.hupingNo}}人。</p>
                    </td>
                    <td>
                        组评{{i.zuping}}，组评总参与{{i.zupingCount}}人，同意{{i.zupingOk}}人，反对{{i.zupingNo}}人。
                    </td>
                </template>
                <template v-else>
                        <td >

                            <el-row>
                                姓名:{{i.name}} </el-row>
                            <el-row>
                                学号:{{i.cid}}
                            </el-row>
                        </td>
                        <td>
                            <el-row>
                                <el-col :span="12">家庭人数:{{i.jtNumber}}口</el-col>
                                <el-col :span="12"> 家庭情况：{{i.jtQk}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">是否低保户：{{i.jtisDb}}</el-col>
                                <el-col :span="12">是否建档立卡：{{i.jtisjdlk}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">人均月收入：{{i.jtsr}}元</el-col>
                                <el-col :span="12">月支出：{{i.jtzc}}元</el-col>
                            </el-row>
                        </td>
                        <td>{{i.shenqin}}</td>
                        <td>
                            <el-row>
                                <el-col :span="12">互评情况：{{i.huping}}</el-col>
                                <el-col :span="12">参与总人数：{{i.hupingCount}}人</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">同意：{{i.hupingOK}}人</el-col>
                                <el-col :span="12">反对：{{i.hupingNo}}人</el-col>
                            </el-row>
                        </td>
                        <td>
                            <el-row>
                                <el-col :span="12">组评情况：{{i.zuping}}</el-col>
                                <el-col :span="12">参与总人数：{{i.zupingCount}}人</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">同意：{{i.zupingOk}}人</el-col>
                                <el-col :span="12">反对：{{i.zupingNo}}人</el-col>
                            </el-row>
                        </td>

                </template>
                <td>
                    <el-radio-group v-model="i.banjipingshen" size="mini">
                        <el-radio-button label="不困难"></el-radio-button>
                        <el-radio-button label="一般困难"></el-radio-button>
                        <el-radio-button label="困难"></el-radio-button>
                        <el-radio-button label="特殊困难"></el-radio-button>
                    </el-radio-group>
                </td>

            </tr>

        </table>
        <div class="approval-panel">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      radio5: "",
      lis: [
        {
          id: 0,
          isShow: true, //控制单条显示状态
          name: "乌兰巴布尔",
          cid: "13123132",
          jtNumber: "3",
          jtQk: "单亲",
          jtisDb: "是",
          jtisjdlk: "是",
          jtsr: "3000",
          jtzc: "2800",
          sqType: "贫困建档",
          shenqin: "特殊困难",
          banjipingshen: "特殊困难",
          huping: "通过",
          hupingCount: 123,
          hupingOk: 88,
          hupingNo: 8,
          zuping: "通过",
          zupingCount: 123,
          zupingOk: 88,
          zupingNo: 8
        },
        {
          id: 1,
          isShow: true, //控制单条显示状态
          name: "乌兰巴布尔",
          cid: "13123132",
          jtNumber: "3",
          jtQk: "单亲",
          jtisDb: "是",
          jtisjdlk: "是",
          jtsr: "3000",
          jtzc: "2800",
          sqType: "贫困建档",
          shenqin: "特殊困难",
          banjipingshen: "特殊困难",
          huping: "通过",
          hupingCount: 123,
          hupingOk: 88,
          hupingNo: 8,
          zuping: "通过",
          zupingCount: 123,
          zupingOk: 88,
          zupingNo: 8
        },
        {
          id: 2,
          isShow: true, //控制单条显示状态
          name: "乌兰巴布尔",
          cid: "13123132",
          jtNumber: "3",
          jtQk: "单亲",
          jtisDb: "是",
          jtisjdlk: "是",
          jtsr: "3000",
          jtzc: "2800",
          sqType: "贫困建档",
          shenqin: "特殊困难",
          banjipingshen: "特殊困难",
          huping: "通过",
          hupingCount: 123,
          hupingOk: 88,
          hupingNo: 8,
          zuping: "通过",
          zupingCount: 123,
          zupingOk: 88,
          zupingNo: 8
        }
      ]
    };
  }
};
</script>

<style>
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
table {
  width: 100%;
  font-size: 13px;
  text-align: left;
  /* border: 1px solid #ebeef5; */
}
th {
  background-color: #ebeef5;
  font-weight: 500;
  font-size: 13px;
}
td,
th {
  padding: 10px;
  color: #303133;
}
td {
  padding: 10px;
  height: 30px;
  background-color: #ffffff;
  border-bottom: #ebeef5 1px solid;
}
.showLine{
      background-color: #ebeef5;
}
</style>
