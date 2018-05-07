import Clipboard from './clipboard'

const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = instal / Users / davidcao / Downloads / vue - element - admin - master / src / directive / clipboard / clipboard.jsl
export default Clipboard
