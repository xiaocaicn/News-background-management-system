let baseUrl = 'http://localhost:8080/api/v1';

function myAjax(type,url,data,callback) {
    $.ajax({
        type: type,
        url: baseUrl + url,
        data: data,
        // contentType:false,
        //     //取消帮我们格式化数据，是什么就是什么
        //     processData:false,
        headers: {
            "Authorization": localStorage.getItem('bignews_token')
        },
        success: function (resData) {
            callback(resData);
        }
    })
}

// 1.0 对象数据提交的ajax方法
function obj_type_ajax(type,url,data,callback){
    $.ajax({
        type: type,
        url: baseUrl + url,
        data: data,
        headers: {
            "Authorization": localStorage.getItem('bignews_token')
        },
        success: function (resData) {
            // console.log(resData);
            // 判断服务器响应回来的数据如果是未登录的话，则跳转到登录页面
            if(resData.code == 403){ //表示未登录              
                // window.parent.location = '../admin/login.html';
                // window.parent.location = '../admin/login.html';
                window.parent.location = './login.html';
                return;
            }
            callback(resData);
        }
    })
}

// 2.0 formdata数据类型的ajax方法
function formData_type_ajax(type,url,data,callback){
    $.ajax({
        type: type,
        url: baseUrl + url,
        data: data,
        contentType:false,
        processData:false,
        headers: {
            "Authorization": localStorage.getItem('bignews_token')
        },
        success: function (resData) {
            // console.log(resData);
            // 判断服务器响应回来的数据如果是未登录的话，则跳转到登录页面
            if(resData.code == 403){ //表示未登录              
                // window.parent.location = '../admin/login.html';
                // window.parent.location = '../admin/login.html';
                window.parent.location = './login.html';
                return;
            }
            callback(resData);
        }
    })
}