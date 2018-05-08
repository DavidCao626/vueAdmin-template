<template>
  <page :Breadcrumb="false">
    <div slot="title">节点信息</div>

    <div slot="panel">
      <ProjectProgress>
        <div style="max-width:800px">
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">节点名称：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">内蒙古大学2017贫困建党</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">刘能</div>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">开始时间：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">2018-05-05</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">结束时间：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">2018-08-03</div>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">节点名称：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">内蒙古大学2017贫困建党</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">刘能</div>
            </el-col>
          </el-row>
        </div>
      </ProjectProgress>
    </div>
    <div>
      <div class="components-container">
        <el-dialog v-el-drag-dialog title="审批数据" :visible.sync="dialogTableVisible">
          <div>
            <el-tag v-for="tag in multipleSelection" :key="tag.key" size="medium" closable style="margin: 0 10px 10px 10px"
            @close="handleClose(tag)"
            >
              {{tag.name}}
            </el-tag>
          </div>
          <el-form label-width="100px" label-position="top">
            <el-form-item label="* 审批意见">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="* 是否同意">
              <el-radio-group v-model="data">
                <el-radio label="同意"></el-radio>
                <el-radio label="不同意"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button type="info" plain @click="hideVisible"> 关闭</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="top" type="border-card">
        <el-tab-pane label="待审核数据" name="second">
          <!-- 表格列内容伸缩 -->
          <div class="filter-container" style="float:right;">
            <el-checkbox-group v-model="checkboxVal">
              <el-checkbox label="date">date</el-checkbox>
              <el-checkbox label="name">name</el-checkbox>
              <el-checkbox label="address">address</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 按钮区域 -->
          <div style="margin-bottom:10px;">
            <!-- <el-button  type="default" class="el-icon-circle-chec" plain @click="toggleSelection([tableData3[1], tableData3[2]])">
              全选
            </el-button> -->
            <el-button type="info" class="el-icon-edit-outline" plain @click="showVisible">
              审核
            </el-button>
          </div>
          <div class="clearfix"></div>

          <!-- 数据表 -->
          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" :key='key' fit highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column :key='fruit' v-for='fruit in formThead' :label="fruit">
              <template slot-scope="scope">
                {{scope.row[fruit]}}
              </template>
            </el-table-column>

            <el-table-column :label="Status">
              <el-tag>未审核</el-tag>
            </el-table-column>

          </el-table>
          <!-- 分页 -->
          <div style="margin-top: 20px">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核数据" name="third">

          <!-- 数据表 -->
          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <el-button size="medium" type="text" class="el-icon-refresh" @click="showVisible"> 重审</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div style="margin-top: 20px">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </page>
</template>
<script>
import { ProjectProgress } from '~/views/task/components/Progress'
import elDragDialog from '~/directive/el-dragDialog' // base on element-ui
const defaultFormThead = ['姓名', '账号']
export default {
  directives: { elDragDialog },
  components: { ProjectProgress },
  data() {
    return {
      dialogTableVisible: false,
      data: [],
      activeName: 'second',
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '张大千',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '柳南',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '海牙',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '郭四',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '曹东',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '李密',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      key: 1, // table key
      formTheadOptions: ['date', 'name', 'address'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  methods: {
    handleClose(tag) {
      this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    showVisible() {
      this.dialogTableVisible = true
    },
    hideVisible() {
      this.dialogTableVisible = false
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      )
      this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
