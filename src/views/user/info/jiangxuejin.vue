<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="160px">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="学生姓名:">
                        <el-input value="王月" ></el-input>
                    </el-form-item>
                </el-col>
              
            </el-row>
            <el-row :gutter="0">
                 <el-col :span="8">
                    <el-form-item label="成绩排名总人数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="成绩排名名次:">
                        <el-input value="52" ></el-input>
                    </el-form-item>
                </el-col>
                    <el-col :span="8">
                    <el-form-item label="备注:">
                        <el-input value="52" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="必修课程及格门数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="必须课程数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否实行总和考评排名:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="综合考评排名名次:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="综合考评排名总人数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="实发金额:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="发放日期:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
              
            </el-row>
          
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" size="mini" round @click="onSubmit">保存奖学金信息</el-button>
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
