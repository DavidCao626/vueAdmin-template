import dataStoreFactory from "@/ElementDataFactory/DataStoreFactory.js"
import validateUtils from "validate.js"
/**
 * 定义Form需要的默认的属性
 */
var formDefaultStoreConfig = {
	inline: true,
	labelWidth: "80px"
};
/**
 * 定义Select的属性
 */
var selectDefaultConfig = {
	size: 'small'
};

/**
 * 定义上下格式的Container
 */
var hcontainerDefaultConfig = {
	headerHeight: 'auto',
	footerHeight: 'auto',
	prefHeight: 500,
	resultHeight: 0,
	isHeader: true,
	isFooter: true,
	workHeight: '200px'
};

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
	selects: [],
	selectionChange: () => {},
	sortChange: () => {},
	filterChange: () => {},
	expands: [], //扩展内容的对象
	isExpand: false, //是否可展开扩展内容
	isRowOperation: false, //是否包括单行操作
	operations: [], //单行操作的对象
	storeLoader: {
		method: "post",
		url: "/doNoting.do"
	}
};

var FormDefaultConfig = {
	labelPosition: "left",
	labelWidth: "auto",
	size: "mini",
	refDefined: "refForm",
	isInline: true
};

/**
 * 定义默认的分页
 */
var PageDefaultConfig = {
	pageSize: [10, 20, 40, 80, 160],
	defaultPageSize: 80,
	layout: "total, sizes, prev, pager, next, jumper"
}

var ManagerPageConfig = {
	buttonSize: "mini",
	dialogVisiable: false,
	workSpaceHeight: 400,
	serviceForm: {},
	serviceTable: {},
	servicePage: {},
	loaddings: false,
	loadData: function(form, table) {
		//console.log(form,table);
		var requestData = form.bindMutual.data;
			//console.log(requestData);
		var requestConfig = table.store.conf.storeLoader;
			//console.log(requestConfig);
		requestConfig.data = requestData;
		var that = this;
		that.store.conf.loaddings = true;
		this.__axios(requestConfig).then(function(response) {
			that.store.conf.loaddings = false;
			console.log(response);
			table.store.data=response.data;
		}).catch(function(error) {
			that.store.conf.loaddings = false;
			//console.log(error);
			that.$message({
				showClose: true,
				message: error.message,
				type: 'error'
			});
		});
	}
};

/**
 * 一个FormDataStore
 */
var FormServiceDataStore = function() {
	var rules = {};
	var data = {};
	return {
		data: data,
		rules: rules,
		pushData: function(tdatas) {
			validateUtils.extend(data, tdatas);
		},
		pushRules: function(trules) {
			validateUtils.extend(rules, trules);
		},
		pushPage: function() {
			data["page_current_page"] = 1;
			data["page_total"] = 0;
			data["page_size"] = 80;
		}
	}
};

/**
 * 定义其它Element已有组件的默认属性，需要全部都定义进来
 */

export default {
	name: 'elementComponentStoreFactory',
	/**
	 * 考虑到同一个页面需要生成多个组件的对象体，所以这里应该是方法
	 */
	buildFormStore: function() {
		return dataStoreFactory.newInstance(formDefaultStoreConfig);
	},
	buildSelectStore: function() {
		return dataStoreFactory.newInstance(selectDefaultConfig);
	},
	buildHContainer: function() {
		return dataStoreFactory.newInstance(hcontainerDefaultConfig);
	},
	buildSelectTable: function() {
		return dataStoreFactory.newInstance(selectTableDefaultConfig);
	},
	buildServiceForm: function() {
		var formStore = dataStoreFactory.newInstance(FormDefaultConfig);
		formStore.addAttribute("bindMutual", FormServiceDataStore());
		return formStore;
	},
	buildServiceFormData: function() {
		return FormServiceDataStore();
	},
	buildPageStore: function() {
		return dataStoreFactory.newInstance(PageDefaultConfig);
	},
	buildManagerPageStore: function() {
		return dataStoreFactory.newInstance(ManagerPageConfig);
	}
}