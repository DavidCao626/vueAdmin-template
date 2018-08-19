<template>
  <div>
    <page>
      <div slot="title">
        评测填表模版
      </div>
      <div slot="extra">
        <el-input placeholder="请输入搜索内容" style="width:280px" v-model="selectInput" class="input-with-select">
          <elx-select v-model="select" style="width:80px" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="1"></el-option>
            <el-option label="学号" value="2"></el-option>
          </elx-select>
        </el-input>
      </div>
      <div class="approval-panel">
        <p>{{ data.info }}</p>
      </div>
      <div class="approval-panel" style="margin-top:20px;margin-bottom:20PX;" v-for="(i,index) in data.children">
        <div class="item-head">
          <div class="item-head-title">{{ index+=1 }}、{{ i.name }}</div>
          <div class="item-head-des">
            <template v-for="(item,index) in i.extendsName">
              {{ item.key }}:{{ item.value }} &nbsp;
            </template>
          </div>
        </div>
        <div class="item-body">
          <ul>
            <li v-for="(item,index) in i.extendsItem" :key="index">
              {{ item.key }}：
              <el-input-number size="mini" v-model="item.value" :min="0" :max="100"></el-input-number>&nbsp;分
              <small>最高100分</small>
            </li>
          </ul>
        </div>
      </div>

      <div class="approval-panel  footer-toolbar clearfix">
        <div class="footer-toolbar__pagination">
          <el-button type="primary">提交</el-button>
        </div>
      </div>
    </page>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import _ from "lodash";
export default {
  data() {
    return {
      select: "1",
      selectInput: "",
      oldchildren: [],
      value1: 30,
      data: {
        title: "", //名称
        info:
          "加强民主评议政风行风工作，对于纠正部门和行业不正之风、促进依法行政、推进党风廉政建设、优化发展环境具有重要作用。近年来，承蒙社会各界的高度关注和广大人民群众的热情参与，我县政风行风评议工作取得较好成效，希望继续关注和积极参与我县评议工作，请您根据被评议单位在依法履职、规范服务、办事效率、转变作风等方面的情况，给予客观公正评价。为有效杜绝恶意评议，评议为不满意单位不得超过60%，即63个单位，否则不予提交评议结果。本次测评采用了限制IP投票，每个固定IP在72小时内限投参与一次。网上评议起止日期为2017年9月18日0:00至2017年10月18日24:00", //描述信息
        children: [
          {
            name: "张三",
            extendsName: [
              {
                key: "学号",
                value: "105644"
              },
              {
                key: "年龄",
                value: "21"
              },
              {
                key: "性别",
                value: "男"
              },
              {
                key: "民族",
                value: "蒙古族"
              }
            ],
            extendsItem: [
              {
                key: "思想",
                value: 0
              },
              {
                key: "政治",
                value: 0
              },
              {
                key: "成绩",
                value: 0
              },
              {
                key: "心理",
                value: 0
              }
            ]
          },
          {
            name: "李四",
            extendsName: [
              {
                key: "学号",
                value: "105645"
              },
              {
                key: "年龄",
                value: "21"
              },
              {
                key: "性别",
                value: "男"
              },
              {
                key: "民族",
                value: "蒙古族"
              }
            ],
            extendsItem: [
              {
                key: "思想",
                value: 0
              },
              {
                key: "政治",
                value: 0
              },
              {
                key: "成绩",
                value: 0
              },
              {
                key: "心理",
                value: 0
              }
            ]
          },
          {
            name: "张三",
            extendsName: [
              {
                key: "学号",
                value: "105646"
              },
              {
                key: "年龄",
                value: "21"
              },
              {
                key: "性别",
                value: "男"
              },
              {
                key: "民族",
                value: "蒙古族"
              }
            ],
            extendsItem: [
              {
                key: "思想",
                value: 0
              },
              {
                key: "政治",
                value: 0
              },
              {
                key: "成绩",
                value: 0
              },
              {
                key: "心理",
                value: 0
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    }
  },
  watch: {
    selectInput() {
      let temValues;
      if (this.oldchildren && this.oldchildren.length == 0) {
        this.oldchildren = this.data.children;
      }

      this.data.children = this.oldchildren;
      if (this.select == "1") {
        temValues = this.data.children.filter(item => {
          return item.name.indexOf(this.selectInput) != -1;
        });
      } else {
        temValues = this.data.children.filter(item => {
          let keyitme = item.extendsName.filter(i => i.key == "学号");
          return keyitme[0].value.indexOf(this.selectInput) != -1;
        });
      }
      if (temValues.length == 0) {
         this.data.children = temValues;
         return;
      }
      if (this.selectInput != "") {
        this.data.children = temValues;
      } else {
        this.data.children = this.oldchildren;
      }
    }
  }
};
</script>

<style scoped>
.item-head {
}
.item-head-title {
  float: left;
  font-weight: 500;
  font-size: 16px;
}
.item-head-des {
  float: left;
  color: var(--color-grey-light-2);
  height: 16px;
  line-height: 16px;
  margin-top: 5px;
  margin-left: 15px;
}
.item-body {
  clear: both;
  margin-left: 15px;
  padding: 10px;
}
.item-body li {
  list-style: none;
  line-height: 36px;
}
.footer-toolbar__pagination {
  float: left;
}
</style>
