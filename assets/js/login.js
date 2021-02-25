$(function() {
    // 点击 “去注册账号” 的链接
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    // 点击 “登录” 的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui中获取 form对象
    var form = layui.form;
    // var layer = layui.layer;  感觉没必要就能实现功能

    // 通过 fprm.verify 函数自定义校验规则
    form.verify({
        //  自定义了一个 pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //校验两次密码是否一致的规则
        repwd: function(valuee) {
            // 通过形参拿到确认框中的内容
            // 还需要拿到密码框中的内容
            // 再进行一次等于的判断
            // 如果密码不一致 则return 一个提示消息
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== valuee) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
            //发起Ajax的post请求
            // 简化参数代码
        var date = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [ name=password ]').val()
        }
        $.post('/api/reguser', date,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                // 模拟人的点击跳转登录行为
                $('#link_login').click()
            }
        )
    })

    // 监听登录表单的提交事件
    $('#form-login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()

        //发起Ajax的post请求
        // 简化参数代码
        var box = { username: $('#form-login [name=username]').val(), password: $('#form-login [name=password]').val() }
        $.post('/api/login', box,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }

                layer.msg('登陆成功！');
                // 将登录成功得到的 token 字符串，保存到localStorage中
                // console.log(res.token);
                localStorage.setItem('token', res.token)

                //跳转到后台主页
                location.href = 'index.html'
            })
    })
})