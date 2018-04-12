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
pageManagerStore.addConf('styleObject', {
  'width': '60%',
  'margin-left': '17%',
  'padding': '30px',
  'border': 'solid #999999 1px'
})
var pageManagerData = GStoreFactory.buildServiceFormData()
pageManagerData.pushData({

})
pageManagerData.pushRules(

)
pageManagerStore.addAttr('pageManagerData', pageManagerData)

var questionFormStore = GStoreFactory.buildServiceForm()
var questionFormData = GStoreFactory.buildServiceFormData()
questionFormData.pushData({

  questionnaireId: '1001', // 问卷id
  title: '问卷名称',
  describe: '为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
  surverTasksId: '1',
  forUser: '22',
  question: [{
    id: 1,
    context: '你是男孩女孩?????',
    type: 'r',
    mustdo: false,
    max: 999,
    answer: [{
      'ban': false,
      'id': 1,
      'text': '男'
    },
    {
      'ban': false,
      'id': 2,
      'text': '女'
    }
    ]
  },
  {
    id: 2,
    context: '你是男孩女孩?(此题最多选2项)',
    type: 'c',
    max: 2,
    mustdo: false,

    answer: [{
      'ban': false,
      'id': 3,
      'text': '男'
    },
    {
      'ban': false,
      'id': 4,
      'text': '女'
    },
    {
      'ban': true,
      'id': 5,
      'text': '不男不女'
    }, {
      'ban': false,
      'id': 6,
      'text': '不知道'
    }
    ]
  },
  {
    id: 3,
    context: '你是男孩女孩?????',
    type: 'r',
    max: 999,
    mustdo: false,

    answer: [{
      'ban': true,
      'id': 1,
      'text': '男'
    },
    {
      'ban': false,
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
    max: 999,

    answer: [{
      'ban': false,
      'id': 1,
      'text': '男'
    },
    {
      'ban': false,
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
    max: 999,

    answer: [{
      'ban': false,
      'id': 1,
      'text': '男'
    },
    {
      'ban': false,
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
    max: 999,

    answer: [{
      'ban': false,
      'id': 1,
      'text': '男'
    },
    {
      'ban': false,
      'id': 2,
      'text': '女'
    }
    ]
  }
  ]

})
questionFormData.pushRules({

})
questionFormStore.addAttr('formData', questionFormData)

var userAnswerFormStore = GStoreFactory.buildServiceForm()
var userAnswerFormData = GStoreFactory.buildServiceFormData()
userAnswerFormData.pushData({

  questionnaireId: '1001', // 问卷id
  surverTasksId: '1',
  forUser: '22',
  userAnswers: [{
    questionId: 1,
    type: 'r',
    userAnswer: ''
  }, {
    questionId: 2,
    type: 'c',
    userAnswer: []
  }, {
    questionId: 3,
    type: 'r',
    userAnswer: ''
  }, {
    questionId: 4,
    type: 'r',
    userAnswer: ''
  }, {
    questionId: 5,
    type: 'c',
    userAnswer: []
  }, {
    questionId: 6,
    type: 'r',
    userAnswer: ''
  }]

})
userAnswerFormData.pushRules({

})
userAnswerFormStore.addAttr('formData', userAnswerFormData)

var vue = new Vue({
  el: '#bodybox',
  data: {
    questionFormStore: questionFormStore,
    pageManagerStore: pageManagerStore,
    userAnswerFormStore: userAnswerFormStore
  },
  methods: {
    test: function() {
      console.log(['userAnswerFormStore', userAnswerFormStore])
    }
  },
  beforeCreate: function() {
    alert('beforeCreate')
    // 加载题目及答案
    // 为用户答案建立form
  }
})
