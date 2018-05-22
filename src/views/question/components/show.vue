<template>

  <div class="question-box">
    <div class="question-show">
     	<item :isShow="1">

			</item>

    </div>

  </div>

</template>

<script>
import Item from "./question/edit/custom-question-item.vue";
export default {
  name: "question-show",
  data() {
    return {
      tableData6: [
        {
          id: "12987122",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987123",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987124",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987125",
          name: "王小虎",
          amount3: []
        },
        {
          id: "12987126",
          name: "王小虎",
          amount3: []
        }
      ]
    };
  },
  mounted: function() {
    // ajax初始化灌入数据
    this.$store.dispatch("initQuuestion");
  },
  components: {
    Item
  }
};
</script>
<style scoped lang="scss">
· .question-box {
  height: 100vh;
  background-image: url(https://image.wjx.cn/images/newimg/wjx-exam/webchat/new/banner-wechat-ks.jpg);
  background-size: cover;
  background-position: bottom;
}
.question-show {
  padding: 15vh;
  width: 90vh;
  margin: 0 auto;
}
.showStyleTable {
}
</style>