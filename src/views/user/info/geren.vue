<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="学号:">
                        <el-input disabled v-model="baseform.nid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="家庭住址:">
                        <el-input v-model="baseform.jtzz"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮政编码:">
                        <el-input v-model="baseform.uzbm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="联系电话:">
                        <el-input v-model="baseform.lxdh"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="住宅类型:">
                        <elx-select @change="changeZzlx" v-model="baseform.zzlx" :options="zzlxType"></elx-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="baseform.zzlx==1">
                    <el-form-item label="校舍编号:">
                        <el-input v-model="baseform.xsbh"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="baseform.zzlx==2">
                    <el-form-item label="住宅地址:">
                        <el-input v-model="baseform.zzdz"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <el-form-item label="上传证件照:">
                        <avatar @cropSuccess="onSuccess() " :imgDataUrl="baseform.imgUrl" url="/upImg.do"></avatar>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" ref="btn" size="mini" round @click="onSubmit($event)">保存基本信息</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import select from "./_components/select";
import avatar from "~/components/Avatar";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";
export default {
      watch: {
    stuNo(newVal, oldVal) {
     this.getDict();
    }
  },
  props: {
    stuNo: {
      type: String,
      default: "0"
    }
  },
  mounted() {
  
    this.getDict();
  },
  data() {
    return {
      baseform: {
        nid: "213", //学号
        jtzz: "内蒙古赤峰", //家庭住址
        uzbm: "01000", //邮政编码
        lxdh: "15034933020", //联系电话
        zzlx: "", //住宅类型
        xsbh: "6302", //校舍编号
        zzdz: "内蒙古呼和浩特", //住宅地址
        imgUrl: null
      },
      zzlxType: [
        {
          value: "1",
          label: "校内"
        },
        {
          value: "2",
          label: "校外"
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      getStuPerInfo: store.namespace + "/getStuPerInfo",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      updateStuPerInfo: store.namespace + "/updateStuPerInfo"
    }),
    getData() {
         var requestData={};
      if(this.stuNo!=0){
        requestData.stuNo = this.stuNo;
      }
      this.getStuPerInfo(requestData).then(response => {
        console.log("getStuBaseInfo", response);
        var res = response.resBody;
        this.baseform.nid = res.stuNo; //学号
        this.baseform.jtzz = res.postalAddress; //家庭住址
        this.baseform.uzbm = res.postalCode; //邮政编码
        this.baseform.lxdh = res.contactNo; //联系电话
        this.baseform.zzlx = res.accommodationType; //住宅类型
        this.baseform.xsbh = res.dormitoryNo; //校舍编号
        this.baseform.zzdz = res.outsideDormitoryAddress; //住宅地址
        if (res.personalPhoto != "") {
          this.baseform.imgUrl = res.personalPhoto;
        }
      });
    },
    getDict() {
      var requestData = {
        dicts: ["accommodation_type"]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.zzlxType = [];
        console.log(["dict", response]);
        res.accommodation_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.zzlxType.push(t1);
        });
      });
        this.getData();
    },
    changeZzlx(value) {
      this.baseform.zzlx = value;
    },
    onSubmit(event) {
      var requestData = {
        postalAddress: this.baseform.jtzz,
        stuNo: this.baseform.nid,
        postalCode: this.baseform.uzbm,
        contactNo: this.baseform.lxdh,
        accommodationType: this.baseform.zzlx,
        dormitoryNo: this.baseform.xsbh,
        outsideDormitoryAddress: this.baseform.zzdz,
        personalPhoto: this.baseform.imgUrl
      };
      this.updateStuPerInfo(requestData).then(response => {
        this.$message.success("修改成功");
        this.$refs["btn"].loading = false;
      });
    },
    onSuccess(imgUrl) {
      //上传成功后图片地址 imgUrl
      this.baseform.imgUrl = imgUrl;
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
