<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="真实姓名:">
                        <el-input value="王月" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出生日期:">
                        <el-input value="1990071618" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="学号:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="考生号:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="民族:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="身份证件类型:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证件号码:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="政治面貌:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="学生类型:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="学习形式:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="院系名称:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="所在年级:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="班级:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="专业大类:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="专业:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="攻读学历:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="入学日期:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否农村学生:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="在校状态:">
                        已毕业
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" size="mini" round @click="onSubmit">保存个人资料</el-button>
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
