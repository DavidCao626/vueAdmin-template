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

var pagehContainer = GStoreFactory.buildVContainer()
var pageManagerStore = GStoreFactory.buildManagerPageStore()
pageManagerStore.addConf('loadData', function() {
  loadData()
})

/**
 *  SelectTableStore start
 */
var selectTableStore = GStoreFactory.buildSelectTable()
selectTableStore.addConf('expands', [{
  label: '问卷描述:',
  attr: 'qt_describe'
}, {
  label: '开始时间:',
  attr: 'qt_startDate'
}, {
  label: '结束时间:',
  attr: 'qt_endDate'
}])
selectTableStore.addConf('isExpand', true)
selectTableStore.addConf('isBorder', false)
selectTableStore.addConf('isRowOperation', true)
selectTableStore.addConf('operations', [{
  'name': 'edit',
  title: '修改',
  operator: function(index, row) {
    vue.updateDialogVisible = true
    updateQuestionnaireFormData.pushData({
      // 问卷名称 发放用户  调查任务开始时间 结束时间
      qtName: row.qt_name,
      qtSurverTasksId: row.qt_surverTasksId,
      qtStartDate: row.qt_startDate,
      qtEndDate: row.qt_endDate,
      qtForUser: row.qt_forUser
    })
  }
}, {
  'name': 'del',
  title: '删除',
  operator: function(index, row) {
    pageManagerStore.store.conf.loaddings = true
    var delRequestConfig = selectTableStore.store.conf.deleteQusetionnaire
    delRequestConfig.params = {
      'Qusetionnaire_id': row.id
    }
    axios(delRequestConfig).then(function(response) {
      loadData()
    }).catch(function(error) {
      pageManagerStore.store.conf.loaddings = false
    })
  }
}])
selectTableStore.addConf('storeLoader', {
  'method': 'get',
  'url': RquestPathConfig.getQusetionnaireUrl
})
selectTableStore.addConf('deleteQuestionnaire', {
  'method': 'get',
  'url': RquestPathConfig.deleteQusetionnaireUrl
})
selectTableStore.addConf('deleteBatchQuestionnaire', {
  'method': 'post',
  'url': RquestPathConfig.deleteBatchQuestionnaireUrl
})

// 增加问卷表单定义
var addQuestionnaireStore = GStoreFactory.buildServiceForm()

var addQuestionnaireStoreData = GStoreFactory.buildServiceFormData()
addQuestionnaireStoreData.pushData({
  qtName: '',
  qtSurverTasksId: '',
  qtStartDate: '',
  qtEndDate: '',
  qtForUser: ''
})
addQuestionnaireStoreData.pushRules({

})

addQuestionnaireStore.addAttr('formData', addQuestionnaireStoreData)
addQuestionnaireStore.addConf('addQuestionnaire', {
  'method': 'post',
  'url': RquestPathConfig.addQuestionnaireURL
})
// 增加问卷表单定义结束

// 定义修改问卷表单
var updateQuestionnaireFormStore = GStoreFactory.buildServiceForm()

var updateQuestionnaireFormData = GStoreFactory.buildServiceFormData()
updateQuestionnaireFormData.pushData({
  // 问卷名称 发放用户  调查任务开始时间 结束时间
  qtName: '',
  qtSurverTasksId: '',
  qtStartDate: '',
  qtEndDate: '',
  qtForUser: ''
})
updateQuestionnaireFormData.pushRules({

})
updateQuestionnaireFormStore.addAttr('formData', updateQuestionnaireFormData)
updateQuestionnaireFormStore.addConf('updateQuestionnaire', {
  'method': 'post',
  'url': RquestPathConfig.updateQuestionnaireUrl
})
// 修改问卷表单结束

/**
 * 快速查询表单定义
 */
var formStore = GStoreFactory.buildServiceForm()
formStore.addConf('isInline', true)

/**
 * 表单数据对象定义
 */
var formStoreData = GStoreFactory.buildServiceFormData()
formStoreData.pushData({
  qt_name: '',
  qt_publicher: ''
})
formStoreData.pushRules({
  name: [{
    required: true,
    message: '请输入活动名称',
    trigger: 'blur'
  }]
})
/**
 * 改造
 */
formStore.addAttr('bindMutual', formStoreData)

/**
 * 全部条件查询的
 */
var moreItemFormStore = GStoreFactory.buildServiceForm()
moreItemFormStore.addConf('isInline', false)
moreItemFormStore.addConf('labelWidth', '80px')
moreItemFormStore.addConf('labelPosition', 'right')
moreItemFormStore.addAttr('bindMutual', formStoreData)

/**
 * 表单定义结束
 */
var pageStore = GStoreFactory.buildPageStore()
formStoreData.pushPage()
/* formStoreData.pushData({
	"page_total": 230
});*/
pageStore.addAttr('bindMutual', formStoreData)

/**
 * 改造，定义默认的名称，不需要进行名称录入
 */
pageManagerStore.addAttr('serviceForm', formStore)
pageManagerStore.addAttr('serviceTable', selectTableStore)
pageManagerStore.addAttr('servicePage', pageStore)

pageManagerStore.addConf('operations', [{
  name: 'ex',
  title: '导入',
  operator: function(servcieTable, serviceForm) {

  }
}, {
  name: 'vh',
  title: '批量删除',
  operator: function(servcieTable, serviceForm) {
    var arr = selectTableStore.store.conf.selects // 选中的
    console.log(['批量删除的arr', arr])
    var reArr = []
    for (var i = 0; i < arr.length; i++) {
      reArr.push(arr[i].id)
    }
    var deleteBatchConfig = selectTableStore.store.conf.deleteBatchQuestionnaire
    deleteBatchConfig.data = {
      'array': reArr
    }
    axios(deleteBatchConfig).then(function(response) {
      loadData()
    }).catch(function(error) {
      pageManagerStore.store.conf.loaddings = false
    })
  }
}])

var tabsStore = GStoreFactory.buildTabsStore()
tabsStore.pushAll([{
  'name': '101',
  'title': '学生管理',
  'link': 'form.html'
}, {
  'name': '102',
  'title': '学院管理'
}])
tabsStore.addConf('activeTab', '101')

/**
 * 要解决这个问题
 */
var vue = new Vue({
  el: '#bodyBox',
  data: {
    pageHCon: pagehContainer,
    pmanager: pageManagerStore,
    serviceForm: formStore,
    serviceTable: selectTableStore,
    moreForm: moreItemFormStore,
    tabsStore: tabsStore,
    addQuestionnaireStore: addQuestionnaireStore,
    addDialogVisible: false,
    updateQuestionnaireFormStore: updateQuestionnaireFormStore,
    updateDialogVisible: false
  },
  mounted: function() {
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    addTab: function() {
      tabsStore.addTab({
        'name': '301',
        'title': '学生会管理'
      })
    },
    addQuestionnaire: function() {
      this.addDialogVisible = false

      var addQuestionnaireConfig = this.addQuestionnaireStore.store.conf.addQuestionnaire
      addQuestionnaireConfig.data = this.addQuestionnaireStore.formData.data
      axios(addQuestionnaireConfig).then(function(response) {
        loadData()
      }).catch(function(error) {
        pageManagerStore.store.conf.loaddings = false
      })
    },
    updateQuestionnaire: function() {
      this.updateDialogVisible = false
      var updateQuestionnaireConfig = this.updateQuestionnaire.store.conf.updateQuestionnaire
      updateQuestionnaireConfig.data = this.updateQuestionnaire.formData.data
      axios(updateQuestionnaireConfig).then(function(response) {
        loadData()
      }).catch(function(error) {
        pageManagerStore.store.conf.loaddings = false
      })
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
      this.pmanager.store.conf.workSpaceHeight = val - 4
      this.tabsStore.store.conf.height = val - 2
    }
  }
})

function loadData() {
  var requestConfig = selectTableStore.store.conf.storeLoader
  //	console.log(["requestConfig11111", requestConfig]);
  var requestData = formStore.bindMutual.data
  requestConfig.data = requestData
  var that = vue
  pageManagerStore.store.conf.loaddings = true
  axios(requestConfig).then(function(response) {
    pageManagerStore.store.conf.loaddings = false

    selectTableStore.store.data = response.data.responseContent.body.questionnaireData
    console.log(['page_total', response.data.responseContent.body.page_total])
    formStoreData.pushData({
      'page_total': response.data.responseContent.body.page_total
    })
  }).catch(function(error) {
    pageManagerStore.store.conf.loaddings = false
    that.$message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
  })
}
