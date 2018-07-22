<template>
    <page>
        <div slot="title">
            修改学生信息
        </div>
        <div slot="panel">
            <!-- <el-row style="margin-bottom: 10px;">账号信息：</el-row> -->
            <el-row>
                <el-col :span="3">
                    <avatar></avatar>
                </el-col>
                <el-col :span="20">
                    <el-form ref="baseform" size="mini" :model="form" label-width="100px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="登录账号:">
                                    <el-input value="user1" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="昵称:">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="当前身份:">
                                    <el-input value="学生" disabled></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="Email:">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="移动电话:">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="QQ号码:">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20">
                                <el-form-item>
                                    <el-button @click="onSubmit" type="primary" plain>
                                        <i class="el-icon-circle-check"></i> 保存账号信息</el-button>
                                    <el-button>修改登录密码</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <br/>
            <!-- <el-row style="margin-bottom: 10px;">在校信息：</el-row> -->
            <el-tabs type="card" size="mini">
                <el-tab-pane label="个人资料">
                    <baseform></baseform>
                </el-tab-pane>
                <el-tab-pane label="家庭信息"><jiating></jiating></el-tab-pane>
               

                <el-tab-pane label="奖学金信息"><jiangxuejin></jiangxuejin></el-tab-pane>
                <el-tab-pane label="助学金信息"><zhuxuejin></zhuxuejin></el-tab-pane>

                <el-tab-pane label="学校资助信息"><zizhu></zizhu></el-tab-pane>
                <el-tab-pane label="社会资助信息"><shehuizizhu></shehuizizhu></el-tab-pane>

                <el-tab-pane label="困难学生认定信息"><kunnan></kunnan></el-tab-pane>
            </el-tabs>
        </div>

    </page>
</template>
<script>
import avatar from "~/components/Avatar";
import jiating from "./jiating.vue";
import baseform from "./base.vue";
import biye from "./biye.vue";
import jiangxuejin from "./jiangxuejin.vue";
import zhuxuejin from "./zhuxuejin.vue";
import zizhu from "./zizhu.vue";
import shehuizizhu from "./shehuizizhu.vue";
import kunnan from "./kunnan.vue";

export default {
  data() {
    return {
      activeName: "second",
      form: {
        name: ""
      }
    };
  },
  components: {
    avatar,biye,
    jiangxuejin,
    zhuxuejin,
    zizhu,
     shehuizizhu,
      kunnan,
    baseform,
    jiating
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {}
  }
};
</script>