<template>
    <div>
         <div class="weui-desktop-page__title" style="font-size:18px">项目基本信息</div>
        <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">

            <el-form-item label="项目名称:">
                <p>{{form.name}}</p>
            </el-form-item>
            <el-form-item label="业务类型:">
                <form-disabled-select v-model="form.tyleId"></form-disabled-select>
            </el-form-item>
            <el-form-item label="项目开始时间:">
                <p>{{form.date1}}</p>
            </el-form-item>
            <el-form-item label="项目结束时间:">

                <el-row :gutter="0">
                    <el-col :span="2">
                        <p>{{form.endDate}}</p>
                    </el-col>
                    <el-col :span="3">
                        <p>剩余
                            <strong style="color:red">{{form.endDateCount}}</strong> 天结束</p>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="mini" plain>延期</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="项目内容:">
                <p>{{form.desc}}</p>
            </el-form-item>

            <el-form-item label="项目附件:">
                <p v-for="(file,index) in form.files" :key="index">{{file.name}}</p>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import formData from '../../addProcess/components/Data'
import formDisabledSelect from '../../addProcess/components/disabledSelect'
export default {
  components: {
    formData,
    formDisabledSelect
  },
  data() {
    return {
      form: {
        name: '2018年上学期2017级贫困学生建档项目',
        tyleId: '001', // 业务类别id
        date1: '2018-06-1',
        endDate: '2018-09-1',
        endDateCount: '90',
        delivery: true,
        files: [{ name: '2018年上学期2017级贫困学生建档项目.doc' }, { name: '新版学工系统建档操作手册.doc' }],
        desc:
          '“2018年上学期2017级贫困学生建档项目开始了，请各级学院老师提前做好准备！”'
      }
    }
  },
  methods: {

  }
}
</script>