export default {
  getVShowValue(vnode) {
    let values = vnode.data.directives.filter(function(s) {
      return s.rawName == "v-show";
    });
  },
  inserted(el, binding, vnode) {
   
    let values = vnode.data.directives.filter(function(s) {
      return s.rawName == "v-show";
    });
    let bool;

    if (values && values.length > 0) {
      bool = values[0].value;
    } else {
      bool = true;
    }
    if (bool) {
      let cnodeNumber =
        vnode.context.ShowStateBit ||
        vnode.context.showStateBit ||
        vnode.context.$root.rootShowStateBit ||
        0; //找到当前所在组件区域rootShowStateBit

      if ((cnodeNumber & binding.value) == 0) {
        el.style.display = "none";
      }
    }
  }
};
