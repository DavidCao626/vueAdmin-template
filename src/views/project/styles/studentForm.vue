<template>
    <div>
        <page style="width: 1000px;margin: 0 auto;" :Breadcrumb="0">
            <!-- <div slot="title">学生业务申请</div> -->
            <div slot="panel">
                <h2>{{formTitle}}</h2>
                <hr/>
                <h4 v-if="formDesc">
                    填写要求：
                    <div>{{formDesc}}</div>
                </h4>
                <h4 v-if="formFiles.length>0">
                    下载附件：
                    <div>
                        <a v-for="(i,index) in formFiles" :key="index" :href="i.url">{{i.name}} &nbsp;&nbsp; </a>
                    </div>
                </h4>
            </div>
        </page>
        <page style="width: 1000px;margin: 0 auto;">
            <div slot="panel">
                <h3 style="font-weight:400">一、填写申请信息</h3><hr/>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="学生姓名">
                                <el-input v-model="form.username" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="学号">
                                <el-input v-model="form.number" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="21">
                            <el-form-item label="所在班级">
                                <el-input v-model="form.class" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="业务类别">
                                <el-input v-model="form.type" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="申请子业务类别">
                                <el-select v-model="form.typeValue" placeholder="请选择">
                                    <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="21">
                            <el-form-item label="申请理由">
                                <el-input type="textarea" rows="3" v-model="form.desc"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="21">
                            <el-form-item label="相关附件">
                                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="form.fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-form>

            </div>
        </page>
        <page style="width: 1000px;margin: 0 auto;">
            <div slot="panel">
                <h3 style="font-weight:400">二、填写家庭情况</h3><hr/>
                <el-form ref="form" :model="form" label-width="120px" size="small">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="家庭人口数">
                                <el-input v-model="form.familyNumber" type="Number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="家庭情况">
                                <el-radio-group v-model="form.familyStatus">
                                    <el-radio-button label="双亲"></el-radio-button>
                                    <el-radio-button label="单亲"></el-radio-button>
                                    <el-radio-button label="孤儿"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="是否低保">
                                <el-switch v-model="form.isSubsistenceAllowance"></el-switch>
                            </el-form-item>
                        </el-col>

                        <el-col :span="10" :offset="1">
                            <el-form-item label="是否建档立卡">
                                <el-switch v-model="form.isRecord"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="人均月收入">
                                <el-input v-model="form.income"  type="Number" placeholder="单位（元）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="人均月支出">
                                <el-input v-model="form.spending"  type="Number" placeholder="单位（元）"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>

            </div>
        </page>
        <page style="width: 1000px;margin: 0 auto;">
            <div slot="panel">
                <div style="text-align:center">
                    <h4 v-if="formDays>=0"  style="text-align:center">截止最后提交日期 还有 <strong style="color:red;">{{formDays}}</strong> 天</h4>
                    <h4 v-else  style="text-align:center;color:red;">申请表单已到最后截止日期，不能提交。如有问题请联系相关老师。</h4>
                    <br>
                    <el-button  v-if="formDays>=0"  type="primary" @click="onSubmit">提交申请</el-button>
                    <el-button>返回取消</el-button>
                </div>
            </div>
        </page>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formTitle: "2017年贫困建档07级项目" + "申请表",
      formDesc: "2017年贫困建档开始了，请按照要求填表。截止日期2018年-06-01。", //项目公告
      formFiles: [
        //项目附件表
        {
          name: "2017年贫困建档07级项目流程描述",
          url: "2017年贫困建档07级项目流程描述.doc"
        },
        {
          name: "2017年贫困建档07级项目流程描述2",
          url: "2017年贫困建档07级项目流程描述2.doc"
        }
      ],
      formDays: 30, //填表可用天数
      form: {
        username: "王小明",
        number: "130128199007161811",
        class: "内蒙古大学数学学院03级35班", //个人信息不能更改 控件已经disabled
        type: "贫困建档申请", //业务类别
        options: [
          //子业务类别选项
          {
            value: "01",
            label: "一般贫困"
          },
          {
            value: "02",
            label: "贫困"
          },
          {
            value: "03",
            label: "特别贫困"
          }
        ],
        typeValue: "", //子业务类别选中值
        desc: "", //申请理由
        delivery: false,
        fileList: [], //申请附件
        familyNumber: "3", //家庭人口
        familyStatus: "双亲", //家庭情况
        isSubsistenceAllowance: 0, //是否低保
        isRecord: 0, //是否建档立卡
        income: 0, //收入
        spending: 0 //支出
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
h2,
h4 {
  text-align: center;
  font-weight: 400;
}
h4 {
  color: #999;

  text-align: left;
}
</style>
