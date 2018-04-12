import Vue from 'vue'
import graceContainer from "@/ComponentPackage/GraceVContainer.vue"
import graceTable from "@/ComponentPackage/GraceTable.vue"
import graceForm from "@/ComponentPackage/GraceForm.vue"
import gracePage from "@/ComponentPackage/GracePage.vue"
import graceManager from "@/ComponentPackage/GraceManagerPage.vue"
import graceTabs from "@/ComponentPackage/GraceTabs.vue"
import graceMenus from "@/ComponentPackage/GraceMenus.vue"
import graceHContainer from "@/ComponentPackage/GraceHContainer.vue"
import graceTree from "@/ComponentPackage/GraceTree.vue"

import graceSelect from "@/ComponentPackage/small/GraceSelect.vue"
import graceCheckBox from "@/ComponentPackage/small/GraceCheckBoxGroup.vue"
import graceRadio from "@/ComponentPackage/small/GraceRadioGroup.vue"
import graceCascader from "@/ComponentPackage/small/GraceCascader.vue"
var VueGracePlus = {};
VueGracePlus.install = function(Vue, options) {
	Vue.component("gc-container", graceContainer);
	Vue.component("gc-hcontainer", graceHContainer);
	Vue.component("gc-table", graceTable);
	Vue.component("gc-form", graceForm);
	Vue.component("gc-page", gracePage);
	Vue.component("gc-manager", graceManager);
	Vue.component("gc-tabs", graceTabs);
	Vue.component("gc-menu", graceMenus);
	Vue.component("gc-tree", graceTree);
	Vue.component("gc-s-sel", graceSelect);
	Vue.component("gc-s-check",graceCheckBox);
	Vue.component("gc-s-radio",graceRadio);
	Vue.component("gc-s-cas",graceCascader);
};
export default VueGracePlus;
