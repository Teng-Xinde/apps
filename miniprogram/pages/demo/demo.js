// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  testData:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // wx.cloud.callFunction({
    //   name: 'getPlaylist'
    // }).then((res) => {
    //   // console.log(res)
    //   this.setData({
    //    res:res.result
    //   })
    // })
    
    console.log('testData 开始:' + this.data.testData)
    this.setData({
      testData: 1
    }, () => {
      //测试异步方法 setData
      console.log('回调执行')
    })
    console.log('testData 设置后:' + this.data.testData)

    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 10000; j++) {

      }
    }
    console.log('testData 长耗时:' + this.data.testData)


  },
  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'music'
      },
    }).then((res) => {
      console.log(res)
    })
  },
  getMovieInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then((res) => {
      console.log(res)
    })
  },

  getTeamOne() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'uName1'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        uName1:res.result.data.movieName
      })
    })
  },
  getTeamTwo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'uName2'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        uName2:res.result.data.movieName
      })
    })
  },
  getTeamThree() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'uName3'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        uName3:res.result.data.movieName
      })
    })
  },
  getTeamFour() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'uName4'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        uName4:res.result.data.movieName
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})