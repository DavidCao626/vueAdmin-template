<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="是否农村五保户:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否低保户:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否孤儿:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="是否单亲家庭子女:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否残疾人子女:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否父母丧失劳动能力:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="是否家中有大病患者:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="本人是否残疾:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="残疾类别:">
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否建档立卡贫困家庭:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="是否低收入家庭:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否军烈属或优抚子女:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭人均收入:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="家庭主要收入来源:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭是否遭受自然灾害:">
                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="16">
                    <el-form-item label="自然灾害具体情况描述:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭是否遭受突发意外事件:">

                        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="16">
                    <el-form-item label="突发意外事件具体描述:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭欠债金额:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="家庭欠债原因:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="家庭人口数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="劳动力人口数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="家庭成员失业人数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="赡养人口数:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="其他信息:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="是否农村低保户:">
                      <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否农村特困供养:">
                       <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="其他:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="认定困难级别名称:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="认定时间:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="认定原因:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="24">
                    <el-form-item label="班级认定意见:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="24">
                    <el-form-item label="年级认定意见:">
                        <el-input v-model="baseform.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" size="mini" round @click="onSubmit">保存家庭信息</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      baseform: {
        name: ""
      },
      value2: false,
      options: [
        {
          value: "视力残疾",
          label: "视力残疾"
        },
        {
          value: "听力残疾",
          label: "听力残疾"
        },
        {
          value: "智力残疾",
          label: "智力残疾"
        },
        {
          value: "其他残疾",
          label: "其他残疾"
        }
      ],
      value: ""
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>

<style>
</style>
