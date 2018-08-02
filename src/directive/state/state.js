

export default {
    inserted(el, binding, vnode) {
        el.style.display = binding.value;
        console.log(binding.arg);
        
        console.log(vnode);
  }
};

