<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="学号:">
                        <el-input v-model="baseform.nid"></el-input>
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
export default {
  data() {
    return {
      baseform: {
        nid: "213", //学号
        jtzz: "内蒙古赤峰", //家庭住址
        uzbm: "01000", //邮政编码
        lxdh: "15034933020", //联系电话
        zzlx: "", //住宅类型
        xsbh: "6302", //校舍编号
        zzdz: "内蒙古呼和浩特" //住宅地址
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
    changeZzlx(value) {
      this.baseform.zzlx = value;
      
    },
    onSubmit(event) {
      this.$refs["btn"].loading = true;
    }
  },
  components: {
    "elx-select": select
  }
};
</script>

<style>
</style>
