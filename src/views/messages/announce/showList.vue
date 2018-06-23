<template>
    <page>
        <div slot="title">公告</div>
        <div class="weui-desktop-layout__main__bd weui-desktop-panel main_bd">
            <div class="weui-desktop-panel__bd">
                <ul class="mp_news_list">
                    <li class="mp_news_item" v-for="(i,index) in announceDate" :key="index">
                        <router-link :to="{path:i.url,params:i.urlParams}">
                            <strong>{{i.title}}
                                <i class="icon_common new"></i>
                            </strong>
                            <span class="read_more">{{i.date}}</span>
                        </router-link>
                    </li>

                </ul>
                <div class="pagination_wrp pageNavigator" v-if="announceDate.length>0">
                    <el-pagination small layout="prev, pager, next" :total="50">
                        <!-- 分页 -->
                    </el-pagination>
                </div>
            </div>
        </div>
    </page>
</template>

<script>
export default {
  data() {
    return {
      announceDate: [
        {
          title: "标题1",
          url: "/messages/announce/show",
          urlParams: { id: 1 },
          date: "2018-06-01"
        },
        {
          title: "标题2",
          url: "/messages/announce/show",
          urlParams: { id: 2 },
          date: "2018-06-01"
        },
        {
          title: "标题3",
          url: "/messages/announce/show",
          urlParams: { id: 3 },
          date: "2018-06-01"
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
