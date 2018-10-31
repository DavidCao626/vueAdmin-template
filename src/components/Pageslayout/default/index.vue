<template>
    <div class="Page-dafault">

        <template v-if="$slots.title">

            <div class="weui-desktop-layout__main__hd" style="padding:6px 10px 5px 15px;    border-bottom: 1px solid rgb(220, 220, 220)">
                <div v-if="this.$root.$route['meta'].hidden  && this.Breadcrumb " style="float: right;margin-top: 3px;">
                    <Breadcrumb></Breadcrumb>
                </div>
                <template v-if="$slots.Breadcrumb" style=" float: right;margin-top: 3px;">
                    <slot name="Breadcrumb">

                    </slot>
                </template>

                <div class="weui-desktop-page__title " style=" float: left;margin-top: 4px;  font-size: 16px;">
                    <slot name="title">

                    </slot>

                </div>
                <div>
                    <el-button-group style="margin-left:15px;margin-top:0px;">
                        <el-button icon="el-icon-arrow-left" size="mini" style="padding: 5px 8px;" type="primary" @click="go()"></el-button>
                        <el-button disabled icon="el-icon-arrow-right el-icon--right" size="mini" style="padding: 5px 8px;" type="primary"></el-button>
                    </el-button-group>
                </div>
                <!-- <el-tabs>
                   
                    <el-tab-pane label="用户管理" name="first">{{route}}</el-tab-pane>
                    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs> -->

                <template v-if="$slots.tabs">
                    <slot name="tabs">

                    </slot>
                </template>
                <div class="extra_info" v-if="$slots.extra">
                    <slot name="extra">
                        <el-button icon="el-icon-arrow-left" circle @click="go(-1)"></el-button>
                    </slot>
                </div>
            </div>

        </template>

        <template v-if="$slots.panel">
            <div class=" weui-desktop-panel i-cursor ">
                <slot name="panel">
                </slot>
            </div>
        </template>

<slot></slot>

</div>
</template>
<script>
import Breadcrumb from "~/components/Breadcrumb";
export default {
  name: "Page-dafault",
  props: {
    Breadcrumb: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    route() {
      return "123123123";
    }
  },
  methods: {
    go(i) {
      this.router.go(i);
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    go() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.extra_info {
  margin-bottom: 20px;
  text-align: right;
  margin-top: -50px;
  line-height: 40px;
}
</style>
