export default {
  inserted(el, binding, vnode) {
    let cnodeNumber =
      vnode.context.ShowStateBit ||
      vnode.context.$root.rootShowStateBit ||
          0; //找到当前所在组件区域rootShowStateBit

    if ((cnodeNumber & binding.value) == 0) {
      el.style.display = "none";
    }
  }
};
