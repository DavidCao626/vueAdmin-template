<template>
	<div>
		<div class="question-box">
			<div class="question-show">

				<item-results></item-results>
			</div>
		</div>
	</div>
</template>

<script>
import ItemResults from './question/edit/custom-question-item-results.vue'
export default {
  name: 'question-results',
  data() {
    return {}
  },
  mounted: function() {
    this.$store.dispatch('getResultsQuuestion')
  },
  components: {
    'item-results': ItemResults
  }
}
</script>

<style scoped>
.question-box {
  height: 100vh;
  background-image: url(https://image.wjx.cn/images/newimg/index/banner.jpg);
  background-size: cover;
  background-position: center;
}
.question-show {
  padding: 15vh;
  width: 88vh;
  margin: 0 auto;
}
</style>