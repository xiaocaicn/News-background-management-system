$(function () {
    // 1.0 给form表单注册submit事件
    form_submit();
})
function form_submit() {
    // 1.0 给form表单注册submit事件
    $('#login_form').on('submit', function (e) {
        // 2.0 阻止form表单默认提交事件
        e.preventDefault();

        // 3.0 序列化表单中用户名和密码数据为查询字符串格式数据
        let params = $('#login_form').serialize();

        let index = null;
        // 4.0 发出ajax请求
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'POST',
            data: params,
            beforeSend: function () {
                // 弹出正在登陆中提示.....
                index = layer.load();
            },
            complete: function () {
                // 关闭正在登陆中提示.....                    
                layer.close(index);
            },
            success: function (resData) {
                // 5.0 服务器响应处理
                // 5.0.1 如果服务器响应状态码不等于200，则表示处理有异常，将异常信息告知用户
                if (resData.code !== 200) {
                    layer.msg(resData.msg);
                    return;//阻止后面代码继续执行
                }

                /*
                5.0.2 服务器响应状态码为200，表示登录成功，服务器响应数据格式：
                将token的值保存到localStorage中
                    {
                        "code":200,
                        "msg":"登录成功",
                        "token":"xxx"
                    }
                */
                localStorage.setItem('bigNews_token', resData.token);

                // 5.0.3 跳转到首页
                window.location = './index.html'
            }
        })
    })
}