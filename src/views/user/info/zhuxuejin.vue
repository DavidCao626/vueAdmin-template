<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="资助学生姓名:">
                        <el-input value="王月" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="资助标准:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="应发金额:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="实发金额:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="发放日期:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
               

            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="申请理由:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

              
            </el-row>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="备注说明:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

              
            </el-row>
           
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" size="mini" round @click="onSubmit">保存助学金信息</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      baseform: {
        name: ""
      }
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>

<style>
</style>
