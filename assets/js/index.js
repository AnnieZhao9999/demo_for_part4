$(function() {
    let layer = layui.layer
        // 获取用户名
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function(res) {
            console.log(res);
            if (res.status === 0) {
                return render(res)
            }
            layer.msg(res.message)
        }

    })

    function render(res) {
        let name = res.data.nickname || res.data.username
        $('.user').html(name)
        if (res.data.user_pic != null) {
            $('.layui-nav-img').sttr('src', res.data.user_pic).show()
            $('.text-avatar').hide()

        } else {
            $('.layui-nav-img').hide()
            $('.text-avatar').html(name[0].toUpperCase()).show()
        }
    }

    // 退出
    $('.exit').click(function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });

    })



})