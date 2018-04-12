import dataStoreFactory from '@/ElementDataFactory/DataStoreFactory.js'
import validateUtils from 'validate.js'
import GUtils from '@/components/Utils.js'
/**
 * 定义Form需要的默认的属性
 */
var formDefaultStoreConfig = {
  inline: true,
  labelWidth: '80px'
}
/**
 * 定义Select的属性
 */
var selectDefaultConfig = {
  size: 'small'
}

/**
 * 定义上下格式的Container
 */
var vcontainerDefaultConfig = {
  headerHeight: 'auto',
  footerHeight: 'auto',
  prefHeight: 500,
  resultHeight: 0,
  isHeader: true,
  isFooter: true,
  workHeight: '200px'
}

/**
 * 定义水平方向的Container
 */
var hcontainerDefaultConfig = {
  headerHeight: 'auto',
  asideWidth: 'auto',
  prefHeight: 500,
  resultHeight: 0,
  isHeader: true,
  isAside: true,
  workHeight: '200px'
}

/**
 * 可选择的Table定义对象
 */
var selectTableDefaultConfig = {
  showHeader: true,
  size: 'small',
  height: 200,
  isBorder: true,
  width: '100%',
  loadding: false,
  selects: [], // 当前被选中的Row
  selectionChange: () => {},
  sortChange: () => {},
  filterChange: () => {},
  expands: [], // 扩展内容的对象
  isExpand: false, // 是否可展开扩展内容
  isRowOperation: false, // 是否包括单行操作
  operations: [], // 单行操作的对象
  storeLoader: {
    method: 'post',
    url: '/doNoting.do'
  }
}

var FormDefaultConfig = {
  labelPosition: 'left',
  labelWidth: '70px',
  size: 'mini',
  refDefined: 'refForm',
  isInline: true
}

/**
 * 定义默认的分页
 */
var PageDefaultConfig = {
  pageSize: [10, 20, 40, 80, 160],
  defaultPageSize: 80,
  layout: 'total, sizes, prev, pager, next, jumper'
}

/**
 * 定义一个默认的Tabs配置
 */
var TabsDefaultConfig = {
  type: 'border-card',
  activeTab: '1',
  closable: true,
  height: 300,
  panelHeight: 200
}

/**
 * 定义横向导航菜单
 */
var NavMenusDefaultConfig = {
  mode: 'horizontal',
  activeIndex: ''
}

var ManagerPageConfig = {
  buttonSize: 'mini',
  dialogVisiable: false,
  workSpaceHeight: 400,
  serviceForm: {},
  serviceTable: {},
  servicePage: {},
  loaddings: false,
  loadData: function(form, table) {
    // console.log(form,table);
    var requestData = form.bindMutual.data
    // console.log(requestData);
    var requestConfig = table.store.conf.storeLoader
    // console.log(requestConfig);
    requestConfig.data = requestData
    var that = this
    that.store.conf.loaddings = true
    this.__axios(requestConfig).then(function(response) {
      that.store.conf.loaddings = false
      console.log(response)
      table.store.data = response.data
    }).catch(function(error) {
      that.store.conf.loaddings = false
      // console.log(error);
      that.$message({
        showClose: true,
        message: error.message,
        type: 'error'
      })
    })
  }
}

/**
 * 一个FormDataStore
 */
var FormServiceDataStore = function() {
  var rules = {}
  var data = {}
  return {
    data: data,
    rules: rules,
    pushData: function(tdatas) {
      validateUtils.extend(data, tdatas)
    },
    mixData: function(datas) {
      GUtils.mixed(data, datas)
    },
    setVal: function(key, value) {
      data[key] = value
    },
    getVal: function(key) {
		    return data[key]
    },
    pushRules: function(trules) {
      validateUtils.extend(rules, trules)
    },
    pushPage: function() {
      data['page_current_page'] = 1
      data['page_total'] = 0
      data['page_size'] = 80
    }
  }
}

/**
 * 定义树形的数据配置对象
 */

var TreeDataStore = {
  rootName: '系统菜单',
  rootId: '-1',
  rootNo: '000',
  clickExpanded: false,
  isCheckBox: false,
  defaultExpands: [],
  defaultCheckeds: [],
  defaultProps: {
    children: 'children',
    label: 'label',
    isLeaf: 'leaf'
  },
  isLazy: false,
  /**
	 * 点击下拉箭头，加载时
	 * @param {Object} node
	 * @param {Object} resolve
	 */
  load: function(node, resolve) {
    return resolve([])
  },
  boost: true,
  /**
	 * 点击按钮时
	 * @param {Object} data
	 * @param {Object} node
	 * @param {Object} tree
	 */
  nodeClick: function(data, node, tree) {
    console.log([data, node, tree])
  },
  emptyText: '',
  filterText: ''
}

var smallSelectStore = {
  filterable: true,
  placeholder: '请选择',
  modelRef: {},
  modelKey: '',
  size: 'small',
  changeHandler: function(val) {}
}

var smallCheckBoxStore = {
  isButton: true,
  isBorder: false,
  modelRef: {},
  modelKey: '',
  size: 'small',
  min: 0,
  max: 99,
  disabled: false
}

var smallCascaderStore = {
  placeholder: '',
  size: 'small',
  modelRef: {},
  modelKey: '',
  disabled: false,
  filterable: true,
  isSelectChange: true,
  disabled: false,
  expandTrigger: 'click',
  props: {
    value: 'value',
    label: 'label',
    children: 'children',
    disabled: 'disabled'

  },
  lazy: false,
  displayAll: true
}

var smallRadioStore = {
  isButton: true,
  isBorder: false,
  modelRef: {},
  modelKey: '',
  size: 'small',
  disabled: false
}

/**
 * 定义其它Element已有组件的默认属性，需要全部都定义进来
 */

export default {
  name: 'elementComponentStoreFactory',
  buildSelectStore: function() {
    return dataStoreFactory.newInstance(selectDefaultConfig)
  },
  /**
	 * 构造一个上下结构的Container
	 */
  buildVContainer: function() {
    return dataStoreFactory.newInstance(vcontainerDefaultConfig)
  },
  /**
	 * 构造一个左右结构的Container
	 */
  buildHContainer: function() {
    return dataStoreFactory.newInstance(hcontainerDefaultConfig)
  },
  /**
	 * 构造一个可选择操作数据的table
	 */
  buildSelectTable: function() {
    return dataStoreFactory.newInstance(selectTableDefaultConfig)
  },
  /**
	 * 构建一个页面用的Form
	 */
  buildServiceForm: function(formDataStore) {
    var formStore = dataStoreFactory.newInstance(FormDefaultConfig)
    if (formDataStore) {
      formStore.addAttribute('bindMutual', formDataStore)
    } else {
      formStore.addAttribute('bindMutual', FormServiceDataStore())
    }
    return formStore
  },

  /**
	 * 构建一个管理页面用的Form数据块
	 */
  buildServiceFormData: function() {
    return FormServiceDataStore()
  },

  /**
	 * 构建的的分页的结构
	 */
  buildPageStore: function() {
    return dataStoreFactory.newInstance(PageDefaultConfig)
  },
  /**
	 * 构建管理页面的Store
	 */
  buildManagerPageStore: function() {
    return dataStoreFactory.newInstance(ManagerPageConfig)
  },
  /**
	 * 默认的TabsStoreConfig
	 */
  buildTabsStore: function() {
    var tabsStoreObj = dataStoreFactory.newInstance(TabsDefaultConfig)
    tabsStoreObj.isExits = function(idx) {
      for (var i = 0, len = tabsStoreObj.store.data.length; i < len; i++) {
        if (tabsStoreObj.store.data[i].name == idx) {
          return true
        }
      }
      return false
    }
    tabsStoreObj.addTab = function(tab) {
      tabsStoreObj.addConf('activeTab', tab.name)
      tabsStoreObj.pushData(tab)
    }
    return tabsStoreObj
  },
  buildRowMeunStore: function() {
    return dataStoreFactory.newInstance(NavMenusDefaultConfig)
  },
  buildTreeStore: function() {
    var treeStore = dataStoreFactory.newInstance(TreeDataStore)
    treeStore.setLazy = function(callback) {
      treeStore.store.conf.isLazy = true
      treeStore.store.conf.load = callback
    }
    return treeStore
  },
  /**
	 * 构建一个SelectStore
	 * @param {Object} formStore
	 * @param {Object} key
	 */
  buildSmallSelectStore: function(formStore, key) {
    var selectStore = dataStoreFactory.newInstance(smallSelectStore)
    if (formStore) {
      selectStore.addConf('modelRef', formStore)
      selectStore.addConf('modelKey', key)
    }
    selectStore.bindModel = function(form, vkey) {
      selectStore.addConf('modelRef', form)
      selectStore.addConf('modelKey', vkey)
    }
    return selectStore
  },
  /**
	 * 构建一个CheckBoxStore
	 * @param {Object} formStore
	 * @param {Object} key
	 */
  buildSmallCheckBoxStore: function(formStore, key) {
    var checkStore = dataStoreFactory.newInstance(smallCheckBoxStore)
    if (formStore) {
      checkStore.addConf('modelRef', formStore)
      checkStore.addConf('modelKey', key)
    }
    checkStore.bindModel = function(form, vkey) {
      checkStore.addConf('modelRef', form)
      checkStore.addConf('modelKey', vkey)
    }
    return checkStore
  },
  buildSmallRadioStore: function(formStore, key) {
    var radioStore = dataStoreFactory.newInstance(smallRadioStore)
    if (formStore) {
      radioStore.addConf('modelRef', formStore)
      radioStore.addConf('modelKey', key)
    }
    radioStore.bindModel = function(form, vkey) {
      radioStore.addConf('modelRef', form)
      radioStore.addConf('modelKey', vkey)
    }
    return radioStore
  },
  buildSmallCascaderStore: function(formStore, key) {
    var cascaderStore = dataStoreFactory.newInstance(smallCascaderStore)
    if (formStore) {
      cascaderStore.addConf('modelRef', formStore)
      cascaderStore.addConf('modelKey', key)
    }
    cascaderStore.bindModel = function(form, vkey) {
      cascaderStore.addConf('modelRef', form)
      cascaderStore.addConf('modelKey', vkey)
    }
    cascaderStore.setLazy = function(callBack, loadDefaultStack) {
      if (!loadDefaultStack || !callBack) {
        console.warn(['cascader', '必须设置加载函数与默认值的数据加载'])
        return
      }
      cascaderStore.addConf('filterable', false)
      cascaderStore.addConf('isSelectChange', false)
      cascaderStore.addConf('lazy', true)
      cascaderStore.addConf('loadChild', callBack)
      cascaderStore.addConf('defaultStack', loadDefaultStack)
      cascaderStore.addConf('track', dataStoreFactory.dataTrack())
    }
    return cascaderStore
  },
  searchCascaderDataNode: function(val, store, filter) {
    var data = store.data
    console.log(val)
    var len = val.length
    if (len < 1) {
      return data
    }
    if (len == 1) {
      var track = store.conf.track.getParent(len - 1)
      if (typeof track === 'undefined') {
        store.conf.track.push(len - 1, data)
      }
    }
    var parent = store.conf.track.getParent(len - 1)
    for (var i = 0, ilen = parent.length; i < ilen; i++) {
      var result = filter.call(this, parent[i], val, store)
      if (result) {
        store.conf.track.push(len, result)
        return result
      }
    }
    return store.data
  }
}
