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
    <span slot="title">选择跳转</span>
    <div slot="panel">

      <div class="content">
        <br/>
        <el-form label-width="80px" :model="formLabelAlign" >

          <el-form-item label="活动区域">
            <el-select v-model="form" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-select v-model="form" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </page>
</template>

<script>
export default {
  components: {},
  computed: {},
  methods: {},

  data() {
    return {
      form: "",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //路由逻辑
    }
  }
};
</script>

