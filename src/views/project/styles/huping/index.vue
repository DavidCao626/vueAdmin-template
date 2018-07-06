<template>
    <page :breadcrumb="false">
        <div slot="title">{{ title }}</div>
        <el-table :data="question.questionLists" style="width: 100%;" size="mini">

            <el-table-column type="expand">
                <template slot-scope="props">

                    <el-form label-position="" inline class="demo-table-expand" size="mini">
                        <template v-for="(item,index) in dataHeader">
                            <template v-if="item.children&&item.children.length>0">

                                <el-form-item :label="item.label+':'">
                                </el-form-item>
                                <template v-for="(i,indexs) in item.children">

                                    <el-form-item :label="i.label">
                                        <span>{{ props.row[i.key] }}</span>
                                    </el-form-item>
                                </template>

                                <br/>
                            </template>
                            <template v-else>
                                <el-form-item :label="item.label">
                                    <span>{{ props.row[i.key] }}</span>
                                </el-form-item>
                            </template>
                        </template>

                    </el-form>
                </template>
            </el-table-column>

            <el-table-column v-for="(item,index) in dataHeader" :key="index" :label="item.label" :width="item.width" :prop="item.key">
                <template v-if="item.children&&item.children.length>0">
                    <el-table-column v-for="(e,index) in item.children" :key="index" :label="e.label" :width="e.width" :prop="e.key">
                    </el-table-column>
                </template>
            </el-table-column>

            </el-table-column>
            <el-table-column label="评审操作" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.name" placeholder="请选择" @change="change(scope.row)">
                        <el-option v-for="(item,index) in scope.row.options" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column label="状态" fixed="right" width="100" :filters="[{ text: '已评审', value: true }, { text: '未处理', value: false }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isDot === true ? 'info' : 'danger'" disable-transitions>
                        {{scope.row.isDot=== true ? '已评审' : '未处理'}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>

        <div class="approval-panel" style="text-align: center;">
            <el-button type="primary" size="mini" @click="subForm">提交</el-button>
        </div>
    </page>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title:{
        type:String,
        default:''
    },
    dataHeader: {
      type: Array,
      default: () => [
        {
          label: "申请人情况",
          key: "",
          width: "",
          value: "",
          children: [
            {
              label: "姓名",
              key: "label",
              width: ""
            },
            {
              label: "学号",
              key: "code",
              width: ""
            }
          ]
        },
        {
          label: "家庭情况",
          prop: "",
          width: "",
          data: "",
          children: [
            {
              label: "状况",
              key: "jtQk",
              width: ""
            },
            {
              label: "收入",
              key: "jtdesc",
              width: ""
            }
          ]
        }
      ]
    }
  },
  computed: {
    question: {
      get() {
        return this.$store.getters["getQssForStyl"];
      }
    }
  },
  watch: {
    question: {
      get() {
        return this.$store.getters["getQssForStyl"];
      },

      handler: function(val) {
        this.$store.dispatch("updateValue", val);
      },
      deep: true
    }
  },
  mounted: function() {
    let taskCode = this.$route.params.taskCode;

    // ajax初始化灌入数据
    this.$store.dispatch("initQuuestion", taskCode);
  },
  methods: {
    filterTag(value, row) {
      //本页过滤状态
      return row.isDot === value;
    },
    change(row) {
      row.isDot = true;
    },
    subForm() {
      this.$store.dispatch("subForm");
    }
  }
};
</script>

<style>
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
</style>
