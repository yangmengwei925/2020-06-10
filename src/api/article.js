import request from '@/utils/request'

//登录
export function login(data){
    // return request({
    //     method:'post',
    //     url:'user/login',
    //     data
    // })
    return request.post('user/login',data);
}

//退出
export function logout(){
    return request({
        method:'post',
        url:'user/logout'
    })
}

//提交贷款申请
export function createLoan(data){
    return request({
        method:'post',
        url:'loan/create',
        data
    })
}

//申请管理 -查询
export function loanList(data){
    return request({
        method:'get',
        url:'loan/list',
        params:data
    })
}

//申请管理 -提交
export function submitToApprove(data){
    return request({
        method:'post',
        url:'loan/submitToApprove',
        data
    })
}

//申请管理 -删除
export function loanDelete(data){
    return request({
        method:'delete',
        url:'loan/delete/'+data.id,
    })
}

//申请管理 -编辑
export function loanUpdate(data){
    return request({
        method:'put',
        url:'loan/update',
        data
    })
}