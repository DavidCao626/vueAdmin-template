<template>
    <div>
        <page>
            <div slot="title">审批工作台</div>
            <div slot="tabs">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="待审核" name="first">

                    </el-tab-pane>
                    <el-tab-pane label="已审核" name="second">
                    </el-tab-pane>
                    <el-tab-pane label="全部" name="third">
                    </el-tab-pane>
                    <el-tab-pane label="已归档" name="fourth">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </page>
        <div class="approval-panel" style="margin-top:-25px">
            <div style="float: right;    margin-top: 4px;">
                <el-button-group>
                    <el-button plain size="mini">
                        <i class="el-icon-sort-down"></i>
                    </el-button>
                    <el-button plain size="mini">
                        <i class="el-icon-date"></i>
                    </el-button>
                    <el-button plain size="mini" @click="switchListStyle">
                        <i class="el-icon-minus" v-if="listTypeStatus"></i>
                        <i class="el-icon-menu" v-else></i>
                    </el-button>

                    <el-tooltip class="item" effect="light" placement="bottom">
                        <div slot="content">
                            <el-checkbox-group v-model="checkboxVal">
                                <el-checkbox v-for="(fruit,index) in getStylesConfig.listStyle.tableTodoHeader" :key='index' v-model="fruit.checked" :label="fruit.prop">{{fruit.label}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <el-button plain size="mini">
                            <i class="el-icon-setting"></i>
                        </el-button>
                    </el-tooltip>
                </el-button-group>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="业务类别">
                    <el-select v-model="formInline.region" placeholder="筛选类别">
                        <el-option label="全部" value="shanghai"></el-option>
                        <el-option label="贫困建档" value="beijing"></el-option>
                        <el-option label="助学金" value="beijing2"></el-option>
                        <el-option label="奖学金" value="beijing3"></el-option>
                        <el-option label="学生资助" value="beijing4"></el-option>
                        <el-option label="其他" value="beijing5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="相关项目">
                    <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入相关项目名称" @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item label="上报机构">
                    <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入相关项目名称" @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item label="申请人学号">
                    <el-input v-model="formInline.user" placeholder="申请人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查 询</el-button>
                </el-form-item>
            </el-form>

        </div>
        <keep-alive>
            <component :is="listType" :checkboxVal="checkboxVal"></component>
        </keep-alive>

    </div>
</template>

<script>
import listBlock from "./_components/listBlock";
import listLine from "./_components/listLine";
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../../_store/index.js";
export default {
  components: {
    listBlock,
    listLine
  },
  computed: {
    ...mapGetters({
      getStylesConfig: store.namespace + "/getStylesConfig"
    })
  },
  data() {
    return {
      checkboxVal: [],
      listTypeStatus: true,
      listType: "listLine",
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
      restaurants: [],
      state4: "",
      timeout: null
    };
  },
  watch: {
    listTypeStatus() {
      switch (this.listTypeStatus) {
        case true:
          this.listType = "listLine";
          break;
        case false:
          this.listType = "listBlock";
          break;
      }
    }
  },
  methods: {
    onSubmit() {},
    switchListStyle() {
      this.listTypeStatus = !this.listTypeStatus;
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    getDefaultListItems() {
      //获取默认到选中项目
      this.getStylesConfig.listStyle.tableTodoHeader.forEach(element => {
        if (element.checked) {
          this.checkboxVal.push(element.prop);
        }
      });
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.getDefaultListItems();
  }
};
</script>

<style lang="scss" scoped>
.demo-form-inline .el-form-item {
  margin-bottom: 0px;
}
.approval-panel {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
}

</style>

