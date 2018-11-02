<template>
  <div>
    <div class="weui-desktop-home-notice">
      <div class="weui-desktop-home-notice__info">
        <i class="el-icon-tickets" v-if="title=='公告栏'"></i>
        <i class="el-icon-document" v-else></i>
        <router-link :to="{path:titleUrl}" class="weui-desktop-home-notice__title title">
          {{ title }}
        </router-link>
      </div>
      <div class="weui-desktop-home-notice__extra">
        <router-link :to="{path:titleUrl}" class="weui-desktop-home-notice__readmore">
          更多
        </router-link>
      </div>
    </div>
    <hr class="line" />
    <div>
      <ul class="olli">
        <template v-for="(i,index) in data">
          <router-link :to="{path:i.url,query:i.urlParams}">
            <li>{{i.title}}
              <small v-html="orgLabelFormatter(i.orgLabel)">&nbsp;&nbsp;&nbsp;{{i.date}}
              </small>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "公告栏"
    },
    titleUrl: {
      type: String,
      default: "/"
    },
    orgTypeList: {
      type: Array,
      function() {
        return [];
      }
    },
    titleUrlParams: {
      type: Object,
      default: function() {
        return {};
      }
    },
    data: {
      type: Array,
      default: function() {
        return [
          {
            title: "默认标题",
            url: "/",
            date: "",
            urlParams: {},
            orgLabel: ""
          }
        ];
      }
    }
  },
  methods: {
    orgLabelFormatter(label) {
      var a = this.orgTypeList;
      for (var i = 0; i < a.length; i++) {
        if (a[i].type == label) {
          return a[i].name;
        }
      }
      return label;
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.line {
  margin-top: 5px;
  margin-bottom: 5px;
}
.olli {
  margin: 0 20px;
  line-height: 35px;
  font-size: 14px;
  color: #666;
  & small {
    color: #999;
    float: right;
    font-size: 14px;
    margin-right: -20px;
  }
}
.title {
  font-size: 16px;
}
</style>
