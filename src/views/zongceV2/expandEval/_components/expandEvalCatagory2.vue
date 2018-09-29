<template>
  <span>
    <elx-cascader style="z-index:9999" :options="options " v-model="selectedOptions" :show-all-levels="false" :change-on-select="false" @change="handleChange ">
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
    stuNo:"",
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
      if (this.date&&this.stuNo!="") {
        this.getExpandEvalCatagoryByStuNo({
          stuNo:this.stuNo,
          date: this.date
        }).then(r => {
          this.options = r.resBody;
        });
      }
    },
    stuNo() {
      if (this.date&&this.stuNo!="") {
        this.getExpandEvalCatagoryByStuNo({
          stuNo:this.stuNo,
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
