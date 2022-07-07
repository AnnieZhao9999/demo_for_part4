$.ajaxPrefilter(function(options) {
    // console.log(options.url)
    // 拼接url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
    // 为需要取数据的接口设置headers，进行身份认证
    if (options.url.indexOf('/my') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 为需要权限的接口设置complete回调函数，不能直接通过url打开页面
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status !== 0) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }



})