//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isShowPinDao:false,
    height:100,
    promptHidden: false,
    isShowLogo: false,
    channels: [
      { name: '推荐', id: 'tuijian', data: [] },
      { name: '热点', id: 'redian', data: [] },
      { name: '本地', id: 'bendi', data: [] },
      { name: '社会', id: 'shehui', data: [] },
      { name: '娱乐', id: 'yule', data: [] },
      { name: '军事', id: 'junshi', data: [] },
      { name: '科技', id: 'keji', data: [] },
      { name: '汽车', id: 'qiche', data: []},
    ],
    feed_length:'',
    prompt:'',
    //当前的激活的频道
    activeChannel: 'tuijian'
  },
  // 点击切换栏目
  ChangeChannels: function(e){
    // 获取当前点击的频道id
    var id = e.currentTarget.dataset.id;
    // 设置当前正在浏览的频道id
    this.setData({ activeChannel: id })
    var index = e.currentTarget.dataset.index;
    // 检测当前的频道是否有数据
    var val = this.data.channels[index].data;
    // 如果没有请求
    if(val <= 0){
      this.getCateInfo(index);
    }
  },
  // 滑动求换频道
  swiperChangeChannel: function(e){
    // 获取当前的事件元素itemId
    var id = e.detail.currentItemId;

    this.setData({ activeChannel: id });

    // 获取当前频道的下标
    // 获取不到data-index的索引，可以使用该方法
    var itemId = e.detail.currentItemId;
    var index = 0;
    for(var i=0;i<this.data.channels.length;i++){
      if(this.data.channels[i].id == itemId){
        index = i;
      }
    }
    // 检测当前的频道是否有数据
    var val = this.data.channels[index].data;
    // 如果没有请求
    if(val <= 0){
      this.getCateInfo(index);
    }
  },
  // 跳转详细页
  toDetail: function(e){
    var index = e.currentTarget.dataset.index;
    var channels = this.data.channels.data;
    var indexList = channels[index];
    console.log(index);
  },
  // 其他栏目请求
  getCateInfo: function(index){
    var that = this;
    that.setData({  isShowLogo: false });
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
      success: function(res){
        // console.log(res.data.data);
        var key = 'channels['+ index +'].data';
        that.setData({ 
          isShowLogo: true,
          [key]: res.data.data,
          promptHidden: false,
          'feed_length': res.data.data.length,
          'prompt': res.data.data[0].prompt + '!'
        });
        setTimeout(function(){
          that.setData({ promptHidden: true })
        },2000)
      }
    })
  },  
  // 推荐请求
  getInfo: function(){
    var that = this;
    that.setData({  isShowLogo: false });
    wx.request({
      url: 'http://c.m.163.com/nc/article/headline/data/10-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
      success: function(res){
        // console.log(res.data.data);
        wx.hideNavigationBarLoading();
        that.setData({ 
          isShowLogo: true,
          'channels[0].data': res.data.data,
          promptHidden: false,
          'feed_length': that.data.feed_length + res.data.data.length,
          'prompt': res.data.data[0].prompt + '!'
        });
        setTimeout(function(){
          that.setData({ promptHidden: true })
        },2000)
      }
    })
  },
  lower: function(){
    var that = this;
    wx.showNavigationBarLoading();
    that.getInfo();
      
  },
  onLoad: function () {
    var that = this;
    // 去掉最底部多出的高度
    var height = wx.getSystemInfoSync().windowHeight - 45 - 1;
    that.setData({
      height: height
    })
    that.getInfo();
  },
  // 关闭标签
  close: function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
  },
  // 显示遮掩层
  showPinDao: function(){
     this.setData({ isShowPinDao: true})
  },

  // 关闭遮掩层
  hidePinDao: function(){
    this.setData({ isShowPinDao: false })
  },
  // 删除我的频道
  delMypindao: function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
  },
  // 添加我的引导
  addMypindao: function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
  }
 
})
