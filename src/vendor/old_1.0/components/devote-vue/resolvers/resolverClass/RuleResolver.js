import _lodash from "lodash"
import resolverDecorator from "../ResolverDecorator.js"
import validator from "../validate/validate.js"
var resolver = {
	_fields: {
		_rule_message: false
	},
	_resolver_name: "FormRuleResolver",
	_rules: [],
	addRule: function(rule) {
		this._rules.push(rule);
	},
	validate: function(result,itemModel) {
		return this._validateElement(result,itemModel);
	},
	_validateElement: function(result,itemModel) {
		var rules=this.getRules();
	    if(this.itemResolver && this.itemKey) {
	    	var that=this;
	    	_lodash.forEach(this.itemResolver.itemRules[this.itemKey],function(rule){
	    		rules.push(rule);
	    	});
		}
	    if(!rules || rules.length<1){
	    	return true;
	    }
		var that = this;
		var vaildated = true;
		_lodash.forEach(rules, function(rule) {
			var validateResult = true;
			if(_lodash.isFunction(rule)){
				validateResult=rule.call(that,that._fields._value,itemModel);
			}else{
				var method=validator[rule.type];
				validateResult=method.call(rule,that._fields._value,itemModel,validator);
			}
			if(validateResult != true) {
				result.push(validateResult);
				that._fields._rule_message = validateResult;
				vaildated = false;
				return vaildated;
			}
		});
		if(vaildated) {
			that._fields._rule_message = false;
		}
		return vaildated;
	},
	getRules: function() {
		return this._rules;
	},
	isRule: true
};
resolver = resolverDecorator.decorateResolver(resolver)
export default resolver;