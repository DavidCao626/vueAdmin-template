<template>
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="110px" class="demo-dynamic">

        <el-row :gutter="20">
            <el-col :span="10">
                <el-form-item prop="email" label="条目名称：" >
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item prop="email" label="是否关联测评：">
                    <el-switch v-model="dynamicValidateForm.email"></el-switch>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item prop="email" label="测评分值：">
                     <el-input-number size="mini" v-model="dynamicValidateForm.email"></el-input-number>
                </el-form-item>
            </el-col>

        </el-row>

        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'" >
            <el-input v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>

        <el-form-item>
          
            <el-button @click="addDomain" plain><i class="el-icon-circle-plus-outline"></i> 新增条目</el-button>
            <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>