<template>
	<el-card class="box-card">

		<div slot="header" class="clearfix">
			<div class="question-type-title">
				<span class="bg-blue">问卷结果统计：</span> {{qssResults.taskName}}

			</div>
		</div>
		<div class="question-description">
			<span>本次计调查总共：{{qssResults.targetNumber}}人</span>&nbsp;&nbsp;
			<span>当前参与总共：{{qssResults.participationNumber}}人</span>&nbsp;&nbsp;
			<span>弃权总共：{{qssResults.abstentionNumber}}人</span>

		</div>
		<div class="question-description">

			<div v-for="(node,key) in qssResults.nodeList">
				<span>Q{{key+1}} {{node.nodeName}} (参与{{node.participationNumber}}人)</span>

				<div v-for="itmes in node.itemList">

					<span style="">{{itmes.itemTitle}}</span>
					<div class="Percentage-parent">
						<div class="Percentage-child" :style="{width:getPercent(node.participationNumber,itmes.participationNumber)}">

						</div>
						<div class="Percentage-text">
							{{getPercent(node.participationNumber,itmes.participationNumber)}}
						</div>
					</div>
				</div>

				<br/>
			</div>

		</div>

	</el-card>

</template>

<script>
	export default {
	  data() {
	    return {
	      //	b:0
	    }
	  },
	  name: 'question-custome-item',
	  props: {
	    isShow: {
	      type: Number,
	      default: 0
	    }
	  },
	  computed: {
	    qssResults: {
	      get() {
	        return this.$store.getters['getQssResults']
	      }
	    }
	  },
	  methods: {
	    getPercent: function(total, num) {
	      num = parseFloat(num)
	      total = parseFloat(total)
	      if (isNaN(num) || isNaN(total)) {
	        return '-'
      }
	
	      return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00 + '%')
    }
	  }

	}
</script>

<style>
	.Percentage-text {
		display: inline-block;
		float: right;
		font-size: 11px;
		color: green;
		margin-right: 2px;
		margin-top: 2px;
	}
	
	.Percentage-parent {
		width: 250px;
		height: 15px;
		background-color: #eee;
		margin: 10px;
	}
	
	.Percentage-child {
		width: 0%;
		height: 100%;
		background-color: green;
	}
</style>