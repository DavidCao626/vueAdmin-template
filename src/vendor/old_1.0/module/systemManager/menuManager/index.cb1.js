import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import axios from 'axios'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import roleCheck from '@/module/revolution-vue/customer-proxy/CheckBoxGroupAndGroup/RoleCheckResolver.js'
import nroleCheck from '@/module/revolution-vue/customer-proxy/CheckBoxGroupAndGroup/RoleCheckResolverClone.js'
import reqPath from '@/API/System/SystemManagerApi.js'
import {
  Loading
} from 'element-ui'

Vue.use(GraceComponent)
var pagehContainer = GStoreFactory.buildHContainer()
var loadingVars
var treeStore = GStoreFactory.buildTreeStore()

treeStore.addConf('defaultProps', {
  'children': 'children',
  'label': 'title',
  'isLeaf': 'leaf'
})
treeStore.setLazy(function(node, resolve) {
  if (!node) {
    GUtils.msgInfo('请选择某一个节点后操作！')
    return
  }
  var pserial = node.data.serial
  if (node.level == 1) {
    pserial = node.data.root_no
  }
  GUtils.post(reqPath.queryChildMenu, {
    'p_serial': pserial
  }, function(data) {
    console.log(data)
    resolve(data.resBody)
  })
})

var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
  'title': ''
})
formDataStore.pushData({
  'id': ''
})
formDataStore.pushData({
  'serial': ''
})
formDataStore.pushData({
  'p_serial': '000'
})
formDataStore.pushData({
  'type': 'L'
})
formDataStore.pushData({
  'f_serial': []
})
formDataStore.pushData({
  'available': 'Y'
})
formDataStore.pushData({
  'role_val': []
})
formDataStore.pushData({
  'icon': ''
})
formDataStore.pushData({
  'path_attr': ''
})
formDataStore.pushData({
  'sort_val': ''
})
var formStore = GStoreFactory.buildServiceForm(formDataStore)
formStore.addConf('isInline', false)
formStore.addConf('labelPosition', 'right')
formStore.addConf('labelWidth', '120px')
var f_type = GStoreFactory.buildSmallSelectStore(formDataStore.data, 'type')
var f_icon = GStoreFactory.buildSmallSelectStore(formDataStore.data, 'icon')
var f_available = GStoreFactory.buildSmallRadioStore(formDataStore.data, 'available')
var f_role_val = GStoreFactory.buildSmallCheckBoxStore(formDataStore.data, 'role_val')
f_role_val.addConf('isButton', false)
var f_vis_list = GStoreFactory.buildSmallSelectStore(formDataStore.data, 'sort_val')

var nchild_formDataStore = GStoreFactory.buildServiceFormData()
nchild_formDataStore.pushData({
  'title': ''
})
nchild_formDataStore.pushData({
  'serial': ''
})
nchild_formDataStore.pushData({
  'p_serial': ''
})
nchild_formDataStore.pushData({
  'type': 'L'
})
nchild_formDataStore.pushData({
  'f_serial': []
})
nchild_formDataStore.pushData({
  'available': 'Y'
})
nchild_formDataStore.pushData({
  'role_val': ['0', '1']
})
nchild_formDataStore.pushData({
  'icon': ''
})
nchild_formDataStore.pushData({
  'path_attr': ''
})
var nchild_formStore = GStoreFactory.buildServiceForm(nchild_formDataStore)
nchild_formStore.addConf('isInline', false)
nchild_formStore.addConf('labelPosition', 'right')
nchild_formStore.addConf('labelWidth', '120px')
var n_f_type = GStoreFactory.buildSmallSelectStore(nchild_formDataStore.data, 'type')
var n_f_icon = GStoreFactory.buildSmallSelectStore(nchild_formDataStore.data, 'icon')
var n_f_available = GStoreFactory.buildSmallRadioStore(nchild_formDataStore.data, 'available')
var n_f_role_val = GStoreFactory.buildSmallCheckBoxStore(nchild_formDataStore.data, 'role_val')
n_f_role_val.addConf('isButton', false)
/**
 * 通过一个请求，对页面的组件进行数据初始化
 */
GUtils.post(reqPath.queryDecortor, {
  'decoras': ['menuTypeDecorator', 'iconDecorator']
}, function(data) {
  GUtils.assembleComponent(data.resBody, 'isUse', f_available, {
    'name': 'dict_desc',
    'val': 'dict_key'
  })
  GUtils.assembleComponent(data.resBody, 'SystemRoleStore', f_role_val, {
    'name': 'lable',
    'val': 'val'
  })
  GUtils.assembleComponent(data.resBody, 'menu_type', f_type, {
    'name': 'dict_desc',
    'val': 'dict_key'
  })
  GUtils.assembleComponent(data.resBody, 'iconStore', f_icon, {
    'name': 'name',
    'val': 'val'
  })
  GUtils.assembleComponent(data.resBody, 'isUse', n_f_available, {
    'name': 'dict_desc',
    'val': 'dict_key'
  })
  GUtils.assembleComponent(data.resBody, 'SystemRoleStore', n_f_role_val, {
    'name': 'lable',
    'val': 'val'
  })
  GUtils.assembleComponent(data.resBody, 'menu_type', n_f_type, {
    'name': 'dict_desc',
    'val': 'dict_key'
  })
  GUtils.assembleComponent(data.resBody, 'iconStore', n_f_icon, {
    'name': 'name',
    'val': 'val'
  })
})
treeStore.addConf('nodeClick', function(data, node, tree) {
  if (node.data.root_no && node.data.root_no == '000') {
    index.nchildEnable = false
    index.updateEnable = true
    index.nchild_formDataStore.data.p_serial = '000'
    index.activeName = 'second'
    index.nchild_menu_name = node.data.title
  } else {
    index.nchildEnable = false
    index.updateEnable = false
    index.nchild_formDataStore.data.p_serial = node.data.serial
    index.nchild_menu_name = node.data.title
    GUtils.post(reqPath.queryMenu, {
      'serial': node.data.serial
    }, function(data) {
      var result = data.resBody.menu
      index.formDataStore.data.title = result.title
      index.formDataStore.data.serial = result.serial
      index.formDataStore.data.type = result.type
      index.formDataStore.data.available = result.available
      index.formDataStore.data.icon = result.icon
      index.formDataStore.data.path_attr = result.pathAttr
      index.formDataStore.data.p_serial = result.pserial
      index.formDataStore.data.sort_val = result.sortVal
      index.formDataStore.data.role_val = data.resBody.roles
      f_vis_list.cleanData()
      GUtils.assembleComponent(data.resBody, 'visList', f_vis_list, {
        'name': 'title',
        'val': 'sortVal'
      })
    })
  }
})

roleCheck.getResolver()._v_bind(formDataStore.data, 'role_val')
nroleCheck.getResolver()._v_bind(nchild_formDataStore.data, 'role_val')

var index = new Vue({
  el: '#bodyBox',
  data: {
    pageHCon: pagehContainer,
    treeStore: treeStore,
    formStore: formStore,
    formDataStore: formDataStore,
    f_type: f_type,
    f_available: f_available,
    f_role_val: f_role_val,
    f_icon: f_icon,
    f_vis_list: f_vis_list,
    nchild_formDataStore: nchild_formDataStore,
    nchild_formStore: nchild_formStore,
    n_f_type: n_f_type,
    n_f_available: n_f_available,
    n_f_role_val: n_f_role_val,
    n_f_icon: n_f_icon,
    activeName: '',
    nchildEnable: true,
    updateEnable: true,
    nchild_menu_name: ''
  },
  components: {
    'role_check': roleCheck,
    'nrole_check': nroleCheck
  },
  beforeCreate: function() {
 //   loadingVars = Loading.service({
   //   fullscreen: true
  //  })
  },
  mounted: function() {
    setTimeout(() => {
     // loadingVars.close()
    }, 2000)
    var that = this
    var height = GUtils.getClientHeight()
    pagehContainer.store.conf.prefHeight = height
  },
  methods: {
    addMenu: function() {
      GUtils.post(reqPath.addMenu, nchild_formDataStore.data, function(data) {
        console.log(data)
      }, function(error) {
        console.log(error)
      })
      this.$msssage.success('操作成功')
    },
    updateMenu: function() {
      GUtils.post(reqPath.updateMenu, formDataStore.data, function(data) {
        f_vis_list.cleanData();
        GUtils.assembleComponent(data.resBody, "visList", f_vis_list, {
          name: "title",
          val: "sortVal"
        });
      }, function(error) {
        console.log(error)
      })
       this.$msssage.success('操作成功')
    },
    updateNodeChild: function() {
      var selectNode = this.treeStore.store.conf.selectedNode
      // console.log(this.treeStore.conf.selectedNode);
    }
  },
  watch: {
    'pageHCon.store.conf.resultHeight': function(val) {
      // console.log(val);
    }
  }
})
