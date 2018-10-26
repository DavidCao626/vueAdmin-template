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
          <el-form-item label="联系电话:">
            <el-input v-model="baseform.lxdh"></el-input>
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
          <el-form-item label="家庭住址:">
            <el-cascader v-model="baseform.jtzzCascader" :options="provinceData" @active-item-change="handleItemChange" :props="props"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="家庭详细住址:">
            <el-input v-model="baseform.jtzz"></el-input>
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
          <el-form-item label="校区:">
            <el-select v-model="baseform.xq" placeholder="">
              <el-option v-for="item in schoolAreaData" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
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

      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="紧急联系人:">
            <el-input v-model="baseform.jjlxrxm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="紧急联系电话:">
            <el-input v-model="baseform.jjlxrdh"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <!-- <el-row>
        <el-col :span="3">
          <el-form-item label="上传证件照:">
            <avatar @cropSuccess="onSuccess() " :imgDataUrl="baseform.imgUrl" url="/upImg.do"></avatar>
          </el-form-item>
        </el-col>
      </el-row> -->
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
    this.getProvinceData();
  },
  data() {
    return {
      provinceData: [],
      baseform: {
        nid: "213", //学号
        jtzz: "内蒙古赤峰", //家庭住址
        uzbm: "01000", //邮政编码
        lxdh: "15034933020", //联系电话
        zzlx: "", //住宅类型
        xsbh: "6302", //校舍编号
        zzdz: "内蒙古呼和浩特", //住宅地址
        imgUrl: null,
        jtzzCascader: [],
        xq: null,
        jjlxrxm: "",
        jjlxrdh: ""
      },
      props: {
        value: "code",
        label: "name"
      },
      schoolAreaData: [],
      zzlxType: []
    };
  },
  methods: {
    ...mapActions({
      getStuPerInfo: store.namespace + "/getStuPerInfo",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      updateStuPerInfo: store.namespace + "/updateStuPerInfo",
      queryProvince: store.namespace + "/queryProvince",
      queryCityByProvinceCode: store.namespace + "/queryCityByProvinceCode",
      queryAreaByCityCode: store.namespace + "/queryAreaByCityCode",
      queryStreetByAreaCode: store.namespace + "/queryStreetByAreaCode",
      queryVillageByStreetCode: store.namespace + "/queryVillageByStreetCode"
    }),
    handleItemChange(val) {
      console.log(["handleItemChange方法参数", val]);
      if (val.length == 1) {
        //点的第一级
        var ob = this.provinceData.find(el => {
          return el.code == val[val.length - 1];
        });
        if (ob.children.length == 0) {
          this.queryCityByProvinceCode({
            provinceCode: val[val.length - 1]
          }).then(response => {
            ob.children = response.resBody;
          });
        }
      } else if (val.length == 2) {
        var ob1 = this.provinceData.find(el => {
          return el.code == val[val.length - 2];
        });
        var ob2 = ob1.children.find(el => {
          return el.code == val[val.length - 1];
        });
        if (ob2.children.length == 0) {
          this.queryAreaByCityCode({
            cityCode: val[val.length - 1]
          }).then(response => {
            ob2.children = response.resBody;
          });
        }
      } else if (val.length == 3) {
        var ob1 = this.provinceData.find(el => {
          return el.code == val[val.length - 3];
        });
        var ob2 = ob1.children.find(el => {
          return el.code == val[val.length - 2];
        });
        var ob3 = ob2.children.find(el => {
          return el.code == val[val.length - 1];
        });
        if (ob3.children.length == 0) {
          this.queryStreetByAreaCode({
            areaCode: val[val.length - 1]
          }).then(response => {
            ob3.children = response.resBody;
          });
        }
      } else if (val.length == 4) {
        var ob1 = this.provinceData.find(el => {
          return el.code == val[val.length - 4];
        });
        var ob2 = ob1.children.find(el => {
          return el.code == val[val.length - 3];
        });
        var ob3 = ob2.children.find(el => {
          return el.code == val[val.length - 2];
        });
        var ob4 = ob3.children.find(el => {
          return el.code == val[val.length - 1];
        });
        if (ob4.children.length == 0) {
          this.queryVillageByStreetCode({
            streetCode: val[val.length - 1]
          }).then(response => {
            ob4.children = response.resBody;
          });
        }
      }
    },
    getData() {
      var requestData = {};
      if (this.stuNo != 0) {
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
        this.baseform.xq = res.campus;
        this.baseform.jjlxrxm = res.emergencyContactName;
        this.baseform.jjlxrdh = res.emergencyContactPhone;

        if (res.personalPhoto != "") {
          this.baseform.imgUrl = res.personalPhoto;
        }
        if(res.postalAddressCodeArr){
          this.baseform.jtzzCascader = res.postalAddressCodeArr;
          this.provinceData = res.shareData;
        }
      });
    },
    getProvinceData() {
      this.queryProvince({}).then(response => {
        this.getData();
        var arr = response.resBody;
        this.provinceData = arr;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["accommodation_type", "school_area"]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.schoolAreaData = [];
        res.school_area.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.schoolAreaData.push(t1);
        });

        this.zzlxType = [];
        console.log(["dict", response]);
        res.accommodation_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.zzlxType.push(t1);
        });
      });
    },
    changeZzlx(value) {
      this.baseform.zzlx = value;
    },
    onSubmit(event) {
      var requestData = {
        postalAddressCode: this.baseform.jtzzCascader[
          this.baseform.jtzzCascader.length - 1
        ],
        postalAddress: this.baseform.jtzz,
        stuNo: this.baseform.nid,
        campus: this.baseform.xq,
        postalCode: this.baseform.uzbm,
        contactNo: this.baseform.lxdh,
        accommodationType: this.baseform.zzlx,
        dormitoryNo: this.baseform.xsbh,
        outsideDormitoryAddress: this.baseform.zzdz,
        personalPhoto: this.baseform.imgUrl,
        emergencyContactName: this.baseform.jjlxrxm,
        emergencyContactPhone: this.baseform.jjlxrdh
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
