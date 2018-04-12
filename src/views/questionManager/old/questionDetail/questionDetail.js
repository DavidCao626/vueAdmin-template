import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import RquestPathConfig from '@/module/questionManager/QuestionnaireConfig.js'
import axios from 'axios'
Vue.use(GraceComponent)

var pageManagerStore = GStoreFactory.buildServiceForm()
var pageManagerData = GStoreFactory.buildServiceFormData()
pageManagerData.pushData({
  options: [{
    value: 'r',
    label: '单选题'
  }, {
    value: 'c',
    label: '多选题'
  }],
  tempOpt: [{
    label: '不限',
    value: '0'
  }]
})
pageManagerData.pushRules(

)
pageManagerStore.addAttr('pageManagerData', pageManagerData)

// ======问题内容表单定义
var questMainFormStore = GStoreFactory.buildServiceForm()
var questMainFormData = GStoreFactory.buildServiceFormData()
questMainFormData.pushData({
  'question': [{
    id: 1,
    context: '你是男孩女孩?????',
    type: 'r',
    mustdo: false,
    max: '',
    answer: [{
      'ban': '',
      'id': 1,
      'text': '男'
    },
    {
      'ban': '',
      'id': 2,
      'text': '女'
    }
    ]
  }, {
    id: 2,
    context: '你是男孩女孩?',
    type: 'c',
    max: '',
    mustdo: false,

    answer: [{
      'ban': '',
      'id': 3,
      'text': '男'
    },
    {
      'ban': '',
      'id': 4,
      'text': '女'
    },
    {
      'ban': '',
      'id': 5,
      'text': '不男不女'
    }, {
      'ban': '',
      'id': 6,
      'text': '不知道'
    }
    ]
  }, {
    id: 3,
    context: '你是男孩女孩?????',
    type: 'r',
    max: '',
    mustdo: false,

    answer: [{
      'ban': '',
      'id': 1,
      'text': '男'
    },
    {
      'ban': '',
      'id': 2,
      'text': '女'
    }
    ]
  },
  {
    id: 4,
    context: '你是男孩女孩?????',
    type: 'r',
    mustdo: false,
    max: '',

    answer: [{
      'ban': '',
      'id': 1,
      'text': '男'
    },
    {
      'ban': '',
      'id': 2,
      'text': '女'
    }
    ]
  },
  {
    id: 5,
    context: '你是男孩女孩?????',
    type: 'c',
    mustdo: false,
    max: '',

    answer: [{
      'ban': '',
      'id': 1,
      'text': '男'
    },
    {
      'ban': '',
      'id': 2,
      'text': '女'
    }
    ]
  },
  {
    id: 6,
    context: '你是男孩女孩?????',
    type: 'r',
    mustdo: false,
    max: '',

    answer: [{
      'ban': '',
      'id': 1,
      'text': '男'
    },
    {
      'ban': '',
      'id': 2,
      'text': '女'
    }
    ]
  }
  ]
})
questMainFormData.pushRules({

  context: [{
    required: true,
    message: '题目不能为空',
    trigger: 'blur'
  }, {
    max: 100,
    message: '题目长度不能超过100个字符',
    trigger: 'blur'
  }],
  text: [{
    required: true,
    message: '选项内容不能为空',
    trigger: 'blur'
  }, {
    max: 20,
    message: '选项内容不能超过20个字符',
    trigger: 'blur'
  }]

})
questMainFormStore.addAttr('questFormData', questMainFormData)
questMainFormStore.addConf('saveQuestConfig', {
  'method': 'post',
  'url': RquestPathConfig.saveQuestUrl
})
questMainFormStore.addConf('delQuestConfig', {
  'method': 'get',
  'url': RquestPathConfig.delQuestUrl
})

// ======问题内容表单定义结束

// ======头部表单定义
var headFormStore = GStoreFactory.buildServiceForm()
var headFormData = GStoreFactory.buildServiceFormData()
headFormData.pushData({
  title: '问卷名称',
  describe: '描述'
})
headFormData.pushRules({
  title: [{
    required: true,
    message: '标题不能为空',
    trigger: 'blur'
  }, {
    max: 20,
    message: '标题长度不能超过20个字符',
    trigger: 'blur'
  }],
  describe: [{
    max: 500,
    message: '标题长度不能超过500个字符',
    trigger: 'blur'
  }]

})
headFormStore.addAttr('headFormData', headFormData)
// ======头部表单定义结束

// ======增加问题表单定义
var addQuestFormStore = GStoreFactory.buildServiceForm()
var addQuestFormData = GStoreFactory.buildServiceFormData()
addQuestFormData.pushData({
  id: '',
  context: '',
  type: 'r',
  max: '',
  answer: [{

    'ban': '',
    'id': 1,
    'text': ''
  },
  {
    'ban': '',
    'id': 2,
    'text': ''
  }
  ]

})
addQuestFormData.pushRules({

})
addQuestFormStore.addAttr('addQuestFormData', addQuestFormData)
addQuestFormStore.addConf('addQuestConfig', {
  'method': 'post',
  'url': RquestPathConfig.addQuestConfigUrl
})
// ======增加问题表单定义结束

var vu = new Vue({
  el: '#bodybox',

  data: {
    pageManagerStore: pageManagerStore,
    addQuestFormStore: addQuestFormStore,
    headFormStore: headFormStore,
    questMainFormStore: questMainFormStore,
    activeIndex: '99999',
    dialogFormVisible: false,
    adialogFormVisible: false,
    addflag: false,
    test: true,
    tempIndex: 0,
    QuestionnaireId: '1' // 问卷id
  },
  computed: {
    tempAnswer: function() {
      var answer = JSON.parse(JSON.stringify(this.addQuestFormStore.addQuestFormData.data.answer))
      return answer
    }
  },
  methods: {
    activeshow: function(index) {
      this.activeIndex = index
    },
    activeClose: function(formName1, index) {
      this.$refs[formName1][0].validate((valid) => {
        if (valid) {
          this.activeIndex = '99999'
          // 这里保存某个问题
          var saveData = this.questMainFormStore.questFormData.data.question[index]
          console.log(['saveData', saveData])
          var saveData = {
            question: saveData,
            QuestionnaireId: this.QuestionnaireId
          }
          var saveConfig = this.questMainFormStore.store.conf.saveQuestConfig
          saveConfig.data = saveData
          axios(saveConfig)
            .then(function(response) {
              // loadData();

              // 保存成功后
            })
            .catch(function(error) {
              console.log(error)
            })
          QuestionnaireId
        } else {
          return false
        }
      })
    },
    gaoji: function(index) {
      this.dialogFormVisible = true
      var opt = [{
        label: '不限',
        value: 999
      }]
      var opta = {}
      this.questMainFormStore.questFormData.data.question[index].answer.length
      for (var i = 0; i < this.questMainFormStore.questFormData.data.question[index].answer.length; i++) {
        opta.label = i + 1
        opta.value = i + 1
        opt.push(opta)
        opta = {}
      }
      this.pageManagerStore.pageManagerData.data.tempOpt = opt
    },
    addgaoji: function() {
      this.adialogFormVisible = true
      var opt = [{
        label: '不限',
        value: 999
      }]
      var opta = {}
      this.addQuestFormStore.addQuestFormData.data.answer.length
      for (var i = 0; i < this.addQuestFormStore.addQuestFormData.data.answer.length; i++) {
        opta.label = i + 1
        opta.value = i + 1
        opt.push(opta)
        opta = {}
      }
      this.pageManagerStore.pageManagerData.data.tempOpt = opt
    },
    addquestop: function() {
      var addqop = {}
      addqop.id = this.addQuestFormStore.addQuestFormData.data.answer.length + 1
      addqop.text = ''
      this.addQuestFormStore.addQuestFormData.data.answer.push(
        addqop
      )
    },
    addop: function(index) {
      var oplength = this.questMainFormStore.questFormData.data.question[index].answer.length
      var opdata = {}
      opdata.id = oplength + 1
      opdata.text = ''
      this.questMainFormStore.questFormData.data.question[index].answer.push(
        opdata
      )
    },
    addquest: function() {
      this.addflag = true
    },
    addsave: function(addForm) {
      this.$refs[addForm][0].validate((valid) => {
        if (valid) {
          var saveQuestionConfig = this.addQuestFormStore.store.conf.addQuestConfig
          saveQuestionConfig.data = {
            QuestionnaireId: this.QuestionnaireId,
            question: this.addQuestFormStore.addQuestFormData.data
          }
          axios(saveQuestionConfig).then(function(response) {
            // 增加问题成功后
            this.addflag = false
            var quest = {}
            quest.id = this.questMainFormStore.questFormData.data.question.length + 1
            quest.context = this.addQuestFormStore.addQuestFormData.data.context
            quest.answer = this.tempAnswer
            quest.type = this.addQuestFormStore.addQuestFormData.data.type
            this.questMainFormStore.questFormData.data.question.push(quest)
          })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    addcancle: function() {
      this.addflag = false
    },
    testbutton: function() {
      console.log(this)
      if (this.test) {
        this.test = false
      } else {
        this.test = true
      }
    },
    deleteas: function(index, oindex) {
      this.questMainFormStore.questFormData.data.question[index].answer.splice(oindex, 1)
    },
    delquestion: function(index) {
      var delquestionConfig = this.questMainFormStore.store.conf.delQuestConfig
      delquestionConfig.data = {
        questionId: this.questMainFormStore.questFormData.data.question[index].id
      }
      axios(delquestionConfig).then(function(response) {
        // 删除成功后
        this.questMainFormStore.questFormData.data.question.splice(index, 1)
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    deleteaddas: function(index) {
      this.addQuestFormStore.addQuestFormData.data.answer.splice(index, 1)
    }
  }
})
