$(function () {
    // 实现登录逻辑
    $('#login_form').submit(function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();

        // 2.0 通过jquery方法自动获取表单数据
        let parms = $('#login_form').serialize(); // username=&password=
        var index ;
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'post',
            data: parms,
            beforeSend:function(){
                // 弹出加载层
               index = layer.load();
            },
            // 完成以后关闭弹出层
            complete:function(){
                layer.close(index);  
            },
            success: function (resData) {
                // resData的结构：{code:200,msg:'',token:'xxxx'}
                // 判断如果状态不等于200则提示错误
                if (resData.code != 200) {
                    alert(resData.msg);
                    return;
                }

                // 将token保存到本地存储中
                localStorage.setItem('bignews_token',resData.token);

                // 跳转到首页
                window.location = './index.html';
            }
        })
    })
})