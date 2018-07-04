<template>
    <page>
        <div slot="title">
            班级预审
        </div>
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
        <div>
            <el-table :data="data" style="width: 100%;" size="mini">
                <el-table-column type="expand">
                    <template slot-scope="props">

                        <el-form label-position="" inline class="demo-table-expand" size="mini">

                            <el-form-item label="姓名:">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>

                            <el-form-item label="学号:">
                                <span>{{ props.row.cid }}</span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="家庭情况:">
                                <span>{{ props.row.jtQk }}</span>
                            </el-form-item>
                            <el-form-item label="家庭人口">
                                <span>{{ props.row.jtNumber }}</span>
                            </el-form-item>

                            <el-form-item label="是否低保户:">
                                <span>{{ props.row.jtisDb }}</span>
                            </el-form-item>
                            <el-form-item label="是否建档立卡:">
                                <span>{{ props.row.jtisjdlk }}</span>
                            </el-form-item>

                            <el-form-item label="家庭收入:">
                                <span>{{ props.row.jtsr }}</span>
                            </el-form-item>
                            <el-form-item label="家庭支出:">
                                <span>{{ props.row.jtzc }}</span>
                            </el-form-item>
                            <br/>

                            <el-form-item label="互评参与总数:">
                                <span>{{ props.row.hupingCount }}</span>
                            </el-form-item>
                            <el-form-item label="互评同意人数:">
                                <span>{{ props.row.hupingOk }}</span>
                            </el-form-item>
                            <el-form-item label="互评反对人数:">
                                <span>{{ props.row.hupingNo }}</span>
                            </el-form-item>
                            <br/>

                            <el-form-item label="组评参与总数:">
                                <span>{{ props.row.zupingCount }}</span>
                            </el-form-item>
                            <el-form-item label="组评同意人数:">
                                <span>{{ props.row.zupingOk }}</span>
                            </el-form-item>
                            <el-form-item label="组评反对人数:">
                                <span>{{ props.row.zupingNo }}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="申请人">
                    <el-table-column label="姓名" prop="name">
                    </el-table-column>
                    <el-table-column label="学号" prop="cid">
                    </el-table-column>

                </el-table-column>

                <el-table-column label="家庭情况" prop="jtQk">
                </el-table-column>
                </el-table-column>
                <el-table-column label="申请贫困等级" prop="shenqin">
                </el-table-column>
                <el-table-column label="班级互评结果" prop="huping">
                </el-table-column>
                <el-table-column label="班级组评结果" prop="zuping">
                </el-table-column>
                <el-table-column label="班主任评审" width="400" fixed="right">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.banjipingshen" size="mini">
                            <el-radio label="不困难"></el-radio>
                            <el-radio label="一般困难"></el-radio>
                            <el-radio label="困难"></el-radio>
                            <el-radio label="特殊困难"></el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>

                <el-table-column label="状态" fixed="right" prop="isDot" width="100" :filters="[{ text: '已处理', value: true }, { text: '未处理', value: false }]" :filter-method="filterTag" filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isDot === true ? 'info' : 'danger'" disable-transitions>
                            {{scope.row.isDot=== true ? '已处理' : '未处理'}}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="approval-panel">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>

        <div class="approval-panel" style="text-align: center;">
            <el-button type="primary" size="mini" @click="onSubmit">全部保存</el-button>
            <el-button size="mini">提交</el-button>
        </div>
    </page>
</template>

<script>
export default {
    methods: {
      filterTag(value, row) {
          //本页过滤状态
        return row.isDot === value;
      }
    },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      data: [
        {
          id: 0,
          isDot: false,
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
          isDot: true,
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
          isDot: true,
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
.showLine {
  background-color: #ebeef5;
}
</style>
