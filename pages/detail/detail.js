// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    time:'',
    source:'',
    body:'',
    isShowLogo: false,
    isComment: true,
  },
  Confirm: function(e){
    var val = e.detail.value;
    console.log(val);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
 
    wx.request({
      url: 'http://c.m.163.com/nc/article/'+id+'/full.html',
      success: function(res){
        var data = res.data[id];
        that.setData({
          title: data.title,
          time: data.ptime,
          source: data.source,
          isShowLogo: true,
          isComment: false
        })

        // 替换内容中的图片注释
        var body = data.body;
        for(var i=0; i<data.img.length;i++){
          body = body.replace(data.img[i].ref,'<img src="'+ data.img[i].src +'"/>');
        }
        that.setData({ body: body })
        // console.log(body)
        WxParse.wxParse('body', 'html', body, that, 5);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})