import axios from 'axios'
import validateUtils from "validate.js"
var VueUtilsPlus = {};

function isObject(arg) {
	return typeof arg === 'object' && arg !== null;
}
/**
 * 对Vue进行部分扩展
 * @param {Object} Vue
 * @param {Object} options
 */
VueUtilsPlus.install = function(Vue, options) {
	Vue.prototype.changeData = function() {
		alert('执行成功');
	};
	Vue.prototype.__extend = function(origin, add) {
		if(!add || !isObject(add)) return origin;

		var keys = Object.keys(add);
		var i = keys.length;
		while(i--) {

			origin[keys[i]] = add[keys[i]];
		}
		return origin;
	};
	Vue.prototype.__extendAll = function(origin, add) {
		if(!add || !isObject(add)) return origin;

		var keys = Object.keys(add);
		var i = keys.length;
		while(i--) {
			if(add.hasOwnProperty(keys[i])) {
				//console.log([keys[i], typeof origin[keys[i]]]);
				var sourceKeyType = typeof origin[keys[i]];
				if(sourceKeyType === 'undefined' || sourceKeyType !== 'object') {
					origin[keys[i]] = add[keys[i]];
				} else {
					this.__extendAll(origin[keys[i]], add[keys[i]]);
				}
			}
		}
		return origin;
	};
	Vue.prototype.__selector = function(ele, selector) {
		var resultElement = null;
		if(typeof ele === "undefined") {
			resultElement = document.createElement("div");
		} else {
			resultElement = ele.querySelector(selector);
		}
		return resultElement;
	};
	Vue.prototype.__axios = axios; //把axios扩展为Vue的组件
	Vue.prototype.__getDeepObjectValue=function(path){
		//console.log(["deep",this]);
		return validateUtils.getDeepObjectValue(this.$data, path);
	};
	Vue.prototype.__putDeepObjectValue=function(path,val){
		var pointRef=this.$data;
		var deepObjs=path.split(":");
		for(var i=0,len=deepObjs.length-1;i<len;i++){
			pointRef=pointRef[deepObjs[i]];
			if(typeof pointRef==="undefined"){
				return false;
			}
		}
		pointRef[deepObjs[deepObjs.length-1]]=val;
		return true;
	}
};
export default VueUtilsPlus;