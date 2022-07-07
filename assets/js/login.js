$(function() {


    // 登录和注册框的显示和隐藏
    $('.signUpBtn').click(function() {
        $('.signUp').show()
        $('.logIn').hide()
    })

    $('.logInBtn').click(function() {
        $('.signUp').hide()
        $('.logIn').show()
    })

    // 表单的验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value, item) {
            if (value != $('.signUp [name=password]').val()) {
                return '密码不一致'
            }
        }
    })

    // 注册接口
    $('.signUpForm').on('submit', function(e) {
        e.preventDefault()
        let name = $('.signUp [name=username]').val()
        $.post('/api/reguser', { username: name, password: $('.signUp [name=password]').val() }, function(res) {
            if (res.status === 0) {
                layer.msg('注册成功，请登录', function() {
                    $('.logInBtn').click()
                    $('.logIn [name=username]').val(name)
                })
            }
        })
    })

    // 登录接口
    $('.logInForm').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('登录失败，请重新登录')
                }
                location.href = '/index.html'
                localStorage.setItem('token', res.token)
            }
        })
    })


})