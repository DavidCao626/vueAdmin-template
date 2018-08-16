<template>
    <div>
        <page>
            <div slot="title">学生申请</div>
            <div slot="panel">
                <el-form :model="formData" label-width="100px">
                    <el-form-item label="测评项目">
                        <el-select v-model="formData.projectId" placeholder="">
                            <el-option v-for="item in projectList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科目项">
                        <el-select v-model="formData.applyItemId" placeholder="">
                            <el-option v-for="item in subjectList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分值项">
                        <el-select v-model="formData.applyScoreId" placeholder="">
                            <el-option v-for="item in scoreItemList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input-number v-model="formData.quantity" :min="1"  label="数量"></el-input-number>
                    </el-form-item>
                    <el-form-item label="申请理由">
                        <el-input v-model="formData.applyReason" rows="3" type="textarea" placeholder="请输入申请原因"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </page>
        <page>
            <div slot="panel">
                <el-row>
                    <el-col :span="7" justify="center">
                        <el-button ref="next" @click="onSubmit">提交</el-button>
                    </el-col>
                </el-row>
            </div>
        </page>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        projectId: 1,
        applyItemId: 1,
        applyScoreId: 1,
        quantity: 1,
        applyReason: ""
      },
      projectList: [{ label: "假的", value: 1 },{ label: "假的2", value: 2 }],
      subjectList: [{ label: "假的", value: 1 }],
      scoreItemList: [{ label: "假的", value: 1 }]
    };
  },
  methods: {
    onSubmit() {},
    test($event,val){
        console.log([$event,val])
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  }
};
</script>

<style>
</style>
