<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别:">
                        <el-select v-model="baseform.sex" placeholder="请选择">
                            <el-option v-for="item in sexType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出生日期:">
                        <el-input v-model="baseform.birth"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="学号:">
                        <el-input v-model="baseform.nid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="考生号:">
                        <el-input v-model="baseform.kid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="民族:">
                        <elx-select @change="change" :value="baseform.minzu"></elx-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="身份证件类型:">
                        <elx-select @change="changeCidTypes" :value="baseform.cidType" :options="cidTypes"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证件号码:">
                        <el-input v-model="baseform.cid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="政治面貌:">
                        <elx-select @change="changeCheckZZMM" :value="baseform.checkZZMM" :options="checkZZMMs"></elx-select>

                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="学生类型:">
                        <elx-select @change="changeCheckXSLX" :value="baseform.checkXSLX" :options="checkXSLXs"></elx-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="学习形式:">
                        <elx-select @change="changeCheckXXXS" :value="baseform.checkXXXS" :options="checkXXXSs"></elx-select>

                    </el-form-item>
                </el-col>
               
            </el-row>
            <el-row>
                 <el-col :span="8">
                    <el-form-item label="院系名称:">
                        <el-input v-model="baseform.yuanxi"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所在年级:">
                        <elx-select @change="changeCheckNJ" :value="baseform.checkNJ" :options="checkNJs"></elx-select>

                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="班级:">
                        <el-input v-model="baseform.banji"></el-input>
                    </el-form-item>
                </el-col>
               
            </el-row>
            <el-row>
                 <el-col :span="8">
                    <el-form-item label="专业大类:">
                        <elx-select @change="changeCheckZYDL" :value="baseform.checkZYDL" :options="checkZYDLs"></elx-select>

                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="专业:">
                        <el-input v-model="baseform.zhuanye"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="攻读学历:">
                        <elx-select @change="changeXueli" :value="baseform.xueli" :options="xuelis"></elx-select>

                    </el-form-item>
                </el-col>
                
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="学制:">
                        <elx-select @change="changeCheckXZ" :value="baseform.checkXZ" :options="checkXZs"></elx-select>

                    </el-form-item>
                </el-col>
               <el-col :span="8">
                    <el-form-item label="入学日期:">
                        <el-input v-model="baseform.ruxueDate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
               <el-col :span="8">
                    <el-form-item label="是否农村学生:">
                        <el-switch v-model="baseform.isNongCun" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>

                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="8">
                    <el-form-item label="是否已毕业:">
                        <el-switch v-model="baseform.isBiYe" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>

                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="baseform.isBiYe">
                    <el-form-item label="毕业日期:">
                        <el-input v-model="baseform.BiYeDate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" ref="btn" size="mini" round @click="onSubmit($event)">保存个人资料</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import select from "./_components/select";
export default {
  data() {
    return {
      baseform: {
        name: "李奥名",
        sex: "1",//性别
        birth: "19900716",//出生日期
        nid: "123",//学号
        kid: "123",//考试号
        minzu: "01",//民族
        cidType: "1",//身份证件类型
        cid: "15034933020",//身份证号码
        checkZZMM: "1",//政治面貌
        checkXSLX: "41",//学生类型
        checkXXXS: "01",//学习形式
        checkXZ: "2.5",//学制
        checkNJ: "7",//年级
        checkZYDL: "01",//专业大类
        ruxueDate:'201606',//入学日期
        xueli: "1", //攻读学历,
        yuanxi: "数学学院",
        banji: "201706",//班级
        zhuanye: "思想政治",//专业
        isNongCun:true,//是否农村学生
        isBiYe:false,//是否毕业
        BiYeDate:'201806'//毕业日期
      },
      sexType: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      cidTypes: [
        {
          value: "1",
          label: "居民身份证"
        },
        {
          value: "2",
          label: "军官证"
        }
      ],
      checkXSLXs: [
        {
          value: "41",
          label: "专科"
        },
        {
          value: "42",
          label: "专科（高职）"
        }
      ],
      checkZZMMs: [
        {
          value: "1",
          label: "中共党员"
        },
        {
          value: "2",
          label: "中共预备党员"
        }
      ],
      checkXXXSs: [
        {
          value: "01",
          label: "全日制"
        },
        {
          value: "02",
          label: "非全日制"
        }
      ],
      checkXZs: [
        //学制
        {
          value: "2",
          label: "2"
        },
        {
          value: "2.5",
          label: "2.5"
        }
      ],
      checkNJs: [
        //年级
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "7",
          label: "延期毕业"
        }
      ],
      checkZYDLs: [
        //专业大类
        {
          value: "01",
          label: "哲学"
        },
        {
          value: "02",
          label: "经济学"
        }
      ],
      xuelis: [
        //攻读学历
        {
          value: "1",
          label: "本科"
        },
        {
          value: "2",
          label: "专科"
        }
      ]
    };
  },
  methods: {
    onSubmit(event) {
       this.$refs['btn'].loading=true

       
        
    },
    change(item) {
      this.baseform.minzu = item;
    },
    changeCidTypes(item) {
      this.baseform.minzu = item;
    },
    changeCheckZZMM(eitem) {
      this.baseform.checkZZMM = item;
    },
    changeCheckXSLX(eitem) {
      this.baseform.checkXSLX = item;
    },
    changeCheckXXXS(eitem) {
      this.baseform.checkXXXS = item;
    },
    changeCheckXZ(eitem) {
      this.baseform.checkXZ = item;
    },
    changeCheckNJ(eitem) {
      this.baseform.checkNJ = item;
    },
    changeCheckZYDL(eitem) {
      this.baseform.checkZYDL = item;
    },
    changeXueli(eitem) {
      this.baseform.xueli = item;
    }
  },
  components: {
    "elx-select": select
  }
};
</script>

<style>
</style>
