<template>
  <el-card class="box-card" style="width:800px">
    <div class="showStyleTable">
      	<h3>{{question.description}}</h3>
        <br/>
      <el-table :data="tableData6" border>
        <el-table-column prop="id" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="被评人" width="180">
        </el-table-column>

        <el-table-column prop="amount3" label="填写意见">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.amount3" size="mini">
              <el-radio label="1">同意</el-radio>
              <el-radio label="2">不同意</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>

      </el-table>
      <br/>
      <el-button type="primary" @click="subForm">提交调查</el-button>
    </div>

  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData6: [
        {
          id: "12987122",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987123",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987124",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987125",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987126",
          name: "王小虎",
          amount3: []
        }
      ]
    };
  },
  computed: {
    question: {
      get() {
        return this.$store.getters["getQss"];
      }
    }
  },
  watch: {
    question: {
      get() {
        return this.$store.getters["getQss"];
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
    subForm() {
      this.$store.dispatch("subForm");
    }
  }
};
</script>

