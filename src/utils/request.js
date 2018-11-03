import axios from "axios";
import store from "../store";
import { getToken } from "~/utils/auth";
import { Message, Loading } from "element-ui";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 7 * 1000, // 请求超时时间
  headers: {
    "Specify-Request-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});
var intres = 10;
// request拦截器
let loading;
const reqInterceptor = service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    loading = Loading.service({ text: "数据加载中..." });
    console.log([(intres += 1), "请去数据：", config]);
    //
    return config;
  },
  error => {
    loading.close();
    console.log(error); // for debug
    Promise.reject(error);
  }
);

const resInterceptor = service.interceptors.response.use(
  response => {
    console.log([(intres -= 1), "返回数据：", response]);
    loading.close(); //关闭加载前，记得重新定义实例

    if (response.data.respStatus > 0) {
      loading.close(); 
      return Promise.resolve(response.data.body);
    } else {
      loading.close();
      Message({
        message: response.data.body.message,
        type: "error"
      });
      return Promise.reject(response.data.body);
    }
  },
  error => {
    loading.close(); //关闭加载前，记得重新定义实例
    console.log(error);
    Message({ message: error.message, type: "error" });
    return Promise.reject(error);
  }
);
//  service.interceptors.request.eject(reqInterceptor);
//  service.interceptors.response.eject(resInterceptor);

// respone拦截器
// service.interceptors.response.use(
//   response => {
//   /**
//   * code为非20000是抛错 可结合自己业务进行修改
//   */
//     const res = response.data
//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload()// 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject('error')
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     console.log('err' + error)// for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service;
