<style lang="scss" scoped>
.state_empty_hd {
  margin-top: 40px;
  .desc {
    padding: 0 60px;
  }
}
.content {
  &__flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__box {
    border: 1px solid var(--color-grey-light-3);
    padding: 20px;
    margin: 20px;
    text-align: center;
    line-height: 1.6;
    border-radius: 5px;
    min-height: 150px;
    .img__box {
      height: 150px;
      margin-bottom: 15px;
    }
    img {
      height: 150px;
    }
  }
  &__box:hover {
    border: 1px solid var(--color-primary);
  }
}
</style>


<template>
    <page :Breadcrumb="false">
        <span slot="title">方案可管理时间配置</span>
        <div slot="panel">

            <div class="content">
                <br/>
                <el-form label-width="80px" :model="formData">
                    <el-form-item label="开始时间">
                        <el-row>
                            <el-col :span="8">
                                <el-input v-model="formData.startTime" type="number" placeholder="开始时间"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-row>
                            <el-col :span="8">
                                <el-input v-model="formData.endTime" type="number" placeholder="开始时间"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="">
                        格式:如 开始时间 为 9月1日,则输入0901
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </page>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  components: {},
  computed: {},

  data() {
    return {
      formData: {
        startTime: "",
        endTime: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getAppraiseAllowConfigTime:
        store.namespace + "/getAppraiseAllowConfigTime",
      saveAppraisalAllowConfigTime:
        store.namespace + "/saveAppraisalAllowConfigTime"
    }),
    getData() {
      this.getAppraiseAllowConfigTime({}).then(response => {
        this.formData.startTime = response.resBody.startTime;
        this.formData.endTime = response.resBody.endTime;
      });
    },
    onSubmit() {
      var requestData = this.formData;
      this.saveAppraisalAllowConfigTime(requestData).then(response => {
        this.$message.success("保存成功");
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
    });
  }
};
</script>

