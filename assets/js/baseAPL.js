// 注意每次 调用get（） post（）  ajax（）的时候
// 先调用 ajaxPrefilter 这个函数
// 在这个函数中 可以拿到我们给的ajax提供的配置对象   方便日后管理  方便更改根目录

$.ajaxPrefilter(function(options) {
    // 发起真正的 ajax 之前， 同一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})