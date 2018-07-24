<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="学生姓名:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
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

            </el-row>

            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="身份证件类型:">
                        <elx-select @change="changeCidTypes" v-model="baseform.cidType" :options="cidTypes"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证件号码:">
                        <el-input v-model="baseform.cid"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="0">
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
            <el-row>
                <el-col :span="8">
                    <el-form-item label="政治面貌:">
                        <elx-select @change="changeCheckZZMM" v-model="baseform.checkZZMM" :options="checkZZMMs"></elx-select>

                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="民族:">
                        <elx-select @change="change" v-model="baseform.minzu" :options="minzulist" ></elx-select>
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
                <el-col :span="3">
                    <el-form-item label="上传证件照:">
                        <avatar @cropSuccess="onSuccess() " url="/upImg.do"></avatar>
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
import avatar from "~/components/Avatar";
export default {
  data() {
    return {
      baseform: {
        name: "李奥名",
        sex: "1", //性别
        birth: "19900716", //出生日期
        nid: "123", //学号
        kid: "123", //考试号
        minzu: "01", //民族
        cidType: "1", //身份证件类型
        cid: "15034933020", //身份证号码
        checkZZMM: "1", //政治面貌
        isNongCun: true, //是否农村学生
        BiYeDate: "201806", //毕业日期
        Zjz: "" //证件照
      },
      minzulist: [
        {
          value: "01",
          label: "汉族"
        },
        {
          value: "02",
          label: "蒙古族"
        },
        {
          value: "03",
          label: "回族"
        },
        {
          value: "04",
          label: "藏族"
        },
        {
          value: "05",
          label: "维吾尔族"
        }
      ],
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

      checkZZMMs: [
        {
          value: "1",
          label: "中共党员"
        },
        {
          value: "2",
          label: "中共预备党员"
        }
      ]
    };
  },
  methods: {
    onSuccess(imgUrl) {
      //上传成功后图片地址 imgUrl
      this.baseform.imgUrl = imgUrl;
    },
    onSubmit(event) {
      this.$refs["btn"].loading = true;
      //保存表单
    },
    change(item) {
      this.baseform.minzu = item;
    },
    changeCidTypes(item) {
      this.baseform.cidTypes = item;
    },
    changeCheckZZMM(eitem) {
      this.baseform.checkZZMM = item; //政治面貌
    }
  },
  components: {
    "elx-select": select,
    avatar
  }
};
</script>

<style>
</style>
