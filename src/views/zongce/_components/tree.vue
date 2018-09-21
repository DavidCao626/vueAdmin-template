<template>
    <ul class="tree">
        <template v-for="(i,index) in data">
            <li>
                <i :class="showIcon(i)" @click="cShow(i)" v-show="i.mutuals.length>0"></i>

                {{ index+1 }}、{{ i.name }}</li>
            <li v-if="i.isShow">
                <ul>
                    <li v-for="e in i.mutuals" :key="e.code">{{ e.name }}
                        <div style="display: inline-block;padding: 5px 20px 5px 20px;background-color: #eee;font-size:14px">
                            分值：
                            <el-input-number size="small" v-model="e.ratio"></el-input-number>
                        </div>
                    </li>
                </ul>
            </li>
        </template>
    </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  computed: {},
  watch: {
    data() {
      this.data.forEach(element => {
        this.$set(element, "isShow", true);
      });
    }
  },
  methods: {
    showIcon(i) {
      return i.isShow
        ? "el-icon-remove-outline"
        : "el-icon-circle-plus-outline";
    },
    cShow(i) {
      i.isShow = !i.isShow;
      console.log(i.isShow);

      return i.isShow;
    }
  }
};
</script>

<style scoped>
.tree {
  list-style: none;
  font-size: 16px;
  font-weight: bold;
  color: #5a6872;
}

.tree li {
  position: relative;
}
.tree ul {
  list-style: none;
  padding-left: 4px;
}
.tree ul li {
  padding: 17px 0px 16px 32px;
  height: 75px;
  font-weight: 400;
}
.tree ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(50% - 1px);
  height: 3px;
  width: 28px;
  background-color: #e2e8f2;
}
.tree ul li::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: #e2e8f2;
}
.tree ul li:last-child::after {
  height: calc(50%);
}
.tree ul li:last-child::before {
  border-radius: 0 0 0 4px;
}
</style>