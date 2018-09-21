<template>
  <span>
    <!-- <el-row>
            <el-col :span="8">
                <elx-select placeholder="请选择" @change="changeValue1">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :config="item" :value="item.value">
                    </el-option>
                </elx-select>
            </el-col>
            <el-col :span="8" v-if="selectedOptions1">
                <elx-select placeholder="请选择" @change="handleChange2">
                    <el-option v-for="item in selectedOptions1.children" :key="item.value" :label="item.label" :config="item" :value="item.value">
                    </el-option>
                </elx-select>
            </el-col>
            <el-col :span="8" v-if="selectedOptions2">
                <elx-select placeholder="请选择" @change="handleChange3 ">
                    <el-option v-for="item in selectedOptions2.children" :key="item.value " :label="item.label " :config="item" :value="item.value">
                    </el-option>
                </elx-select>
            </el-col>
        </el-row> -->
    <elx-cascader :options="options " v-model="selectedOptions" :show-all-levels="false" :change-on-select="true" @change="handleChange ">
    </elx-cascader>
  </span>

</template>


<script>
import expandEval from "../../_mixin/expandEval.js";
import api from "../../_mixin/api.js";

export default {
  mixins: [expandEval, api],
  props: {
    schoolYearId: 0,
    date: ""
  },
  data() {
    return {
      options: [],
      selectedOptions: [],
      selectedOptions1: { children: [] },
      selectedOptions2: { children: [] },
      selectedOptions3: { children: [] }
    };
  },
  watch: {
    date() {
      if (this.date) {
        this.getExpandEvalCatagoryByDate({
          date: this.date
        }).then(r => {
          this.options = r.resBody;
        });
      }
    }
  },
  methods: {
    handleChange(value, l, o) {
      this.$emit("handleChange", o);
      console.log(o);
    },
    handleChange1(value, l, o) {
      this.selectedOptions1 = o;
      this.$emit("onChange1", this.selectedOptions1);
      console.log(o);
    },
    handleChange2(value, l, o) {
      this.selectedOptions2 = o;
      this.$emit("onChange2", this.selectedOptions2);
      console.log(o);
    },
    handleChange3(value, l, o) {
      this.selectedOptions3 = o;
      this.$emit("onChange3", this.selectedOptions3);
      console.log(o);
    }
  },
  mounted() {
    if (this.schoolYearId) {
      this.getExpandEvalCatagoryBySchoolYearId({
        schoolYearId: this.schoolYearId
      }).then(r => {
        this.options = r.resBody;
      });
    }
  }
};
</script>
<style>
</style>
