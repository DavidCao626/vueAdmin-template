import validateUtils from "validate.js"
/**
 * 构造函数
 * @param {Object} conf_arg
 * @param {Object} data_arg
 */
var DataStoreBuilder = function(conf_arg, data_arg) {
	var defaultConf = {
	};
	var dataArray = [];
	this.store = {
		conf: defaultConf,
		data: dataArray
	}
	if(conf_arg) {
		validateUtils.extend(this.store.conf, conf_arg);
		//console.log([this.store.conf,conf_arg]);
	}
	if(data_arg) {
		this.pushAll(data_arg);
	}
};

/**
 * 静态创建的方法
 * @param {Object} conf
 */
DataStoreBuilder.newInstance = function(conf) {
	return new DataStoreBuilder(conf);
}

/**
 * 返回对象本身的数据集
 */
DataStoreBuilder.prototype.getStore = function() {
		return this.store;
}
	/**
	 * 添加对象的属性
	 * 绑定后，对象不可以进行二次指向，能够防止对象绑定后指向其它地址
	 * 推荐使用
	 * @param {Object} name
	 * @param {Object} component
	 * @param {Object} writable
	 */
DataStoreBuilder.prototype.addAttribute = function(name, component) {
	if(this.hasOwnProperty(name)) {
		var val=this[name];
		if(validateUtils.isObject(component) && validateUtils.isObject(val)){
			validateUtils.extend(val,component);
		}else{
			this[name]=component;
		}
	}
	this[name]=component;
	return this;
}

/**
 * 批量添加属性对象
 * 绑定后，对象不可以进行二次指向，能够防止对象绑定后指向其它地址
 * 推荐使用
 * @param {Object} components
 */
DataStoreBuilder.prototype.addAttributes = function(components) {
	for(var comkey in components) {
		if(components.hasOwnProperty(comkey)) {
			this.addAttr(comkey, components[comkey]);
		}
	}
	return this;
}
/**
 * 为对象添加一个属性
 * 绑定的组件可以修改指向地址
 * 为了避免对象数据地址被变更后，无法操作，不推荐使用
 * @param {Object} name
 * @param {Object} component
 */
DataStoreBuilder.prototype.addAttr = function(name, component) {
	this[name] = component;
	return this;
}

/**
 * 批量添加属性
 * 绑定的组件可以修改指向地址
 * 为了避免对象数据地址被变更后，无法操作，不推荐使用
 * @param {Object} components
 */
DataStoreBuilder.prototype.addAttrs = function(components) {
	validateUtils.extend(this, components);
	return this;
}


/**
 * 更新现有的Conf属性值
 * @param {Object} name
 * @param {Object} value
 */
DataStoreBuilder.prototype.updateConf=function(name,value){
	if(this.store.conf.hasOwnProperty(name)){
		this.store.conf[name] = value;
	}
}

/**
 * 添加或更新对象的自我配置
 * @param {Object} name
 * @param {Object} value
 */
DataStoreBuilder.prototype.addConf = function(name, value) {
	if(this.store.conf.hasOwnProperty(name)) {
		this.store.conf[name] = value;
	} else {
		Object.defineProperty(this.store.conf, name, {
			writable: true
		});
		this.store.conf[name] = value;
	}
	return this;
}

/**
 * 批量更改conf,通过extend的方式走
 * @param {Object} config
 */
DataStoreBuilder.prototype.addConfig = function(config) {
	validateUtils.extend(this.store.conf, config);
}

/**
 * 批量更新数据链对象
 * @param {Object} datas
 */
DataStoreBuilder.prototype.pushData = function(datas) {
	this.store.data.push(datas);
	return this;
}


/**
 * 赋值对象
 * @param {Object} datas
 */
DataStoreBuilder.prototype.pushDataByFormat=function(datas){
		var source=datas;
		var reversalFormat={};
		for(var fk in format){
			reversalFormat[format[fk]]=fk;
		}
		//console.log(["formatKey",reversalFormat]);
		var target={};
		for(var k in source){
			if(source.hasOwnProperty(k)){
				if(reversalFormat.hasOwnProperty(k)){
					//console.log(k,reversalFormat[k]);
					target[reversalFormat[k]]=source[k];
				}else if(format.hasOwnProperty(k)){
					continue;
				}else{
					target[k]=source[k];
				}
			}
		}
		this.store.data.push(target);
}


/**
 * 清楚所有数据对象
 * @param {Object} datas
 */
DataStoreBuilder.prototype.cleanData = function(datas) {
	this.store.data = [];
	return this;
}
/**
 * 获取某一个键值
 * @param {Object} key
 */
DataStoreBuilder.prototype.getComponent=function(key){
	return this[key];
}
/**
 * 批量加载数据对象
 * @param {Object} data
 */
DataStoreBuilder.prototype.pushAll = function(data) {
	for(var i = 0, len = data.length; i < len; i++) {
		this.store.data.push(data[i]);
	}
	return this;
}


/**
 * 通过一个格式化的对应关系赋值
 * @param {Object} data
 * @param {Object} format
 */
DataStoreBuilder.prototype.pushAllByFormat=function(data,format){
	for(var i = 0, len = data.length; i < len; i++) {
		var source=data[i];
		var reversalFormat={};
		for(var fk in format){
			reversalFormat[format[fk]]=fk;
		}
		var target={};
		for(var k in source){
			if(source.hasOwnProperty(k)){
				if(reversalFormat.hasOwnProperty(k)){
					target[reversalFormat[k]]=source[k];
				}else if(format.hasOwnProperty(k)){
					continue;
				}else{
					target[k]=source[k];
				}
			}
		}
		this.store.data.push(target);
	}
	return this;
};


/**
 * 通过一个格式化的方法赋值
 * @param {Object} data
 * @param {Object} format
 */
DataStoreBuilder.prototype.pushAllByFormater=function(data,formater){
	for(var i = 0, len = data.length; i < len; i++) {
		var source=data[i];
		var target=formater.call(this,source);
		this.store.data.push(target);
	}
	return this;
};



/**
 * 通过路径查找自己的下级属性
 * @param {Object} path
 */
DataStoreBuilder.prototype.getDeepObjectValue = function(path) {
		return validateUtils.getDeepObjectValue(this, path);
}
	/**
	 * 通过路径查找对象的属性，静态方法
	 * @param {Object} obj
	 * @param {Object} path
	 */
DataStoreBuilder.getDeepObjectValue = function(obj, path) {
	return validateUtils.getDeepObjectValue(obj, path);
}

DataStoreBuilder.dataTrack=function(){
	var level=0;
	var track=[];
	return {
		push:function(le,ref){
			track[le]=ref;
		},
		getParent:function(le){
			return track[le];
		}
	};
}




export default DataStoreBuilder;