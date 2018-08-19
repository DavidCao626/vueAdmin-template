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
    <page>
        <span slot="title">选择跳转</span>
        <div slot="panel">
            <div class="state_empty_hd">
                <p class="desc">选择您的业务内容:</p>
            </div>
            <div class="content__flex">
                <template v-for="member in list">

                    <div class="content__box" @click="onClick(member.url)">

                        <!-- <img src="/src/assets/img/student-man.svg" /> -->
                        <div class="img__box">
                            <svg-icon class="sidebar-item__icon" :icon-class="member.icon" />
                        </div>
                        <h3>{{member.name}}</h3>

                        <!-- <p>任期时间: 2017-6 ~ 2018-10</p> -->

                    </div>
                </template>
            </div>
        </div>

    </page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: {},
  methods: {},

  data() {
    return {
      list: [
        { name: "选项一标题", url: "http://baidu.com", icon: "info-line" },
        { name: "选项二标题", url: "http://163.com", icon: "icon" }
      ]
    };
  },
  methods:{
      onClick(url){
          alert(url)
          //路由逻辑
      }
  }
};
</script>

