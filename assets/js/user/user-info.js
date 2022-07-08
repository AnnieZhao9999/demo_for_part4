$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: [
            /^[\S]{1,6}$/, '昵称为1-6位，且不能出现空格'
        ]
    })
    getUserInfo()
        // 获取用户信息并对user-info页面进行填充
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return res.message
                form.val('userInfo', res.data)
            }
        })
    }

    // 修改用户信息， 并同时修改页面上显示的头像和用户昵称
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: form.val('userInfo'),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)

                layer.msg(res.message)
                window.parent.renderUserInfo()


            }
        })

    })


    // 重置
    $('button[type=reset]').click(function(e) {
        e.preventDefault()
        getUserInfo()
    })


})