<template>
    <div>

    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.params.toPath) {
        vm.$router.go(-1);
      } else {
        var param = JSON.parse(JSON.stringify(to.params));
        delete param.toPath;
        vm.$router.push({
          path: to.params.toPath,
          query: param
        });
      }
    });
  }
};
</script>


<style  scoped>
</style>

