import state from "./state";

const install = function (Vue) {
    Vue.directive("state-show", state);
}

if (window.Vue) {
    window.state = state;
    Vue.use(install); // eslint-disable-line
}

state.install = install;
export default state;
