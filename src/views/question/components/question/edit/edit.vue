<template>
	<div class="question-edit row">
		<el-col :span="4">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<div class="question-type-title">题型选择</div>
				</div>
				<div class="question-type-list">
					<ul>
						<li @click="add('radio')">单选题</li>
						<li @click="add('checkbox')">多选题</li>
						<li @click="add('input')">单行填空题</li>
						<li @click="add('textarea')">多行填空题</li>
					</ul>
				</div>

			</el-card>
		</el-col>
		<el-col :span="20">

			<item :isShow="0">

			</item>

		</el-col>

	</div>
</template>

<script>
import Item from './custom-question-item.vue'
export default {
  name: 'question-edit',
  data() {
    return {}
  },
  mounted: function() {
    // ajax初始化灌入数据
    this.$store.dispatch('initQuuestion')
  },
  methods: {
    add(type) {
      this.$store.dispatch('addQuestion', type)
    }
  },
  components: {
    Item
  }
}
</script>

<style  lang="scss">
$question-edit-input-border-color: #ffffff;
.question-edit {
  .question-type-title {
    margin: 5px;
    text-align: center;
    font-size: 22px;
    .el-input__inner {
      border-color: #ffffff;

      text-align: center;
      font-size: 22px;
    }
    .el-input__inner:hover {
      background-color: #eeeeee;
    }
    .el-input__inner:focus {
      background-color: #ffffff;
      border-color: #409eff;
      resize: vertical;
    }
  }
  .question-type-list li {
    list-style: none;
    line-height: 35px;
  }
  .question-description {
    border: 1px solid #eee;
    padding: 20px;
    textarea {
      border-color: #ffffff;
      resize: none;
      font-size: 16px;
    }
    textarea:hover {
      background-color: #eeeeee;
    }
    textarea:focus {
      border-color: #409eff;
      resize: vertical;
      background-color: #ffffff;
    }
  }

  .question-list-box {
    margin-bottom: 10px;
    .question-list-item {
      border: 1px solid #eee;
      padding: 20px;
      margin-top: 10px;
    }
    .pull-right {
      float: right;
    }
    .el-input__inner {
      border-color: #ffffff;
      width: 60vh;
    }
    .el-input__inner:hover {
      background-color: #eeeeee;
    }
    .el-input__inner:focus {
      background-color: #ffffff;
      border-color: #409eff;
      resize: vertical;
    }
    .question-list-item-header {
      margin-bottom: 15px;
    }
  }
  .foot {
    text-align: center;
  }
}
</style>