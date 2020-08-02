import axios from 'axios';
import {getToken} from '@/utils/token'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://139.196.42.209:5004/api/';
//请求拦截器
axios.interceptors.request.use(function(config){
    //在发送请求前
    config.headers['token'] = getToken();
    return config;
},function(error){
    //请求错误
   return Promise.reject(error) 
});

//响应拦截器
axios.interceptors.response.use(function(response){
    //响应数据
    if(response.data.code !==20000){
        Message({
            message: response.data.message,
            type: 'warning',
            duration:2000
          });
    }
    return response;
},function(error){
    Message({
        message: error.message,
        type: 'error',
        duration:2000
      });
    //响应数据错误
   return Promise.reject(error) 
});

export default axios;   //直接返回axios;