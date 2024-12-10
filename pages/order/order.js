// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Detail : 0,
    selectedSeason: '',
    seasonArray: ['冲锋三弹', '冲锋二弹', '冲锋一弹', '传说四弹', '传说三弹', '传说二弹', '传说一弹', '第四弹', '第三弹', '第二弹', '第一弹'],
    seasonContent: {},
    selectList: [],
    seasonAllContent: require('../../res/order_data').seasonAllContent,
    labels: [],
  },

  //自定义函数，处理picker选择和season切换
  ChangeSeason(season) {
    for (let i = 0; i < this.data.seasonAllContent.length; i++) {
      if (this.data.seasonAllContent[i].season == season) {
        this.setData({
          seasonContent: this.data.seasonAllContent[i],
          selectList : [],
          selectedSeason : season
        });
        break;
      }
    }
  },

  bindSeasonChange(e) {
    this.ChangeSeason(e.target.dataset.season)
  },

  handleDetail(e){
    this.setData({
      Detail : e.target.dataset.detail
    })
    console.log(this.data.Detail);
  },

  bindClear(){
    this.ChangeSeason(this.data.selectedSeason)
  },

  handleButtonClick: function (e) {
    let uid = e.target.dataset.uid
    //1.处理选择list
    let index = this.data.selectList.indexOf(uid)
    let list = this.data.selectList
    if (index == -1) {
      this.setData({
        selectList: list.concat(uid)
      })
    } else {
      list.splice(index, 1)
      this.setData({
        selectList: list
      })
    }
    //2.处理selectAria区域按钮状态
    //2.1 处理一星区域
    var sc = JSON.parse(JSON.stringify(this.data.seasonContent))
    for (let i = 0; i < sc.oneStarList.length; i++) {
      if (this.data.selectList.indexOf(sc.oneStarList[i].uid) != -1) {
        sc.oneStarList[i].active = true
      } else {
        sc.oneStarList[i].active = false
      }
    }
    //2.2 处理二星区域
    for (let i = 0; i < sc.twoStarList.length; i++) {
      if (this.data.selectList.indexOf(sc.twoStarList[i].uid) != -1) {
        sc.twoStarList[i].active = true
      } else {
        sc.twoStarList[i].active = false
      }
    }
    //2.3 处理三星区域
    for (let i = 0; i < sc.threeStarList.length; i++) {
      if (this.data.selectList.indexOf(sc.threeStarList[i].uid) != -1) {
        sc.threeStarList[i].active = true
      } else {
        sc.threeStarList[i].active = false
      }
    }
    //2.4 处理四星区域
    for (let i = 0; i < sc.fourStarList.length; i++) {
      if (this.data.selectList.indexOf(sc.fourStarList[i].uid) != -1) {
        sc.fourStarList[i].active = true
      } else {
        sc.fourStarList[i].active = false
      }
    }
    //2.5 处理五星区域
    for (let i = 0; i < sc.fiveStarList.length; i++) {
      if (this.data.selectList.indexOf(sc.fiveStarList[i].uid) != -1) {
        sc.fiveStarList[i].active = true
      } else {
        sc.fiveStarList[i].active = false
      }
    }
    //3.处理displayAria区域按钮状态
    for (let i = 0; i < sc.orderList.length; i++) {
      for (let j = 0; j < sc.orderList[i].orderList.length; j++) {
        if (this.data.selectList.indexOf(sc.orderList[i].orderList[j].uid) != -1 || this.data.selectList.length == 0) {
          sc.orderList[i].orderList[j].active = true
        } else {
          sc.orderList[i].orderList[j].active = false
        }
      }
    }
    this.setData({
      seasonContent : sc
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //处理labels 目前写死数量，可考虑修改为按照数据自适应
    const labels = [];
    for (let i = 50; i >= 1; i--) {
      labels.push(i);
    }
    this.setData({
      labels
    });
    //todo：根据卡盘实体和卡序填充seasonAllContent
    //处理starList:
    //- 根据orderList填充starList内容
    var ac = JSON.parse(JSON.stringify(this.data.seasonAllContent))
    for (let i = 0; i < ac.length; i++) {
      let seasonCardArray = []
      for (let j = 0; j < ac[i].orderList.length; j++) {
        for (let k = 0; k < ac[i].orderList[j].orderList.length; k++) {
          let card = ac[i].orderList[j].orderList[k]
          //构建唯一id
          //let uid = card.star + '-' + card.pmID + '-' + card.pmForm
          let uid = card.uid
          if (card.star == 1) {
            if (seasonCardArray.indexOf(uid) == -1) {
              //初始化starList中对象的active字段，统一设置成false
              let tmpCard = Object.assign({}, card)
              tmpCard.active = false
              ac[i].oneStarList.push(tmpCard)
              seasonCardArray.push(uid)
            }
          } else if (card.star == 2) {
            if (seasonCardArray.indexOf(uid) == -1) {
              //初始化starList中对象的active字段，统一设置成false
              let tmpCard = Object.assign({}, card)
              tmpCard.active = false
              ac[i].twoStarList.push(tmpCard)
              seasonCardArray.push(uid)
            }
          } else if (card.star == 3) {
            if (seasonCardArray.indexOf(uid) == -1) {
              //初始化starList中对象的active字段，统一设置成false
              let tmpCard = Object.assign({}, card)
              tmpCard.active = false
              ac[i].threeStarList.push(tmpCard)
              seasonCardArray.push(uid)
            }
          } else if (card.star == 4) {
            if (seasonCardArray.indexOf(uid) == -1) {
              //初始化starList中对象的active字段，统一设置成false
              let tmpCard = Object.assign({}, card)
              tmpCard.active = false
              ac[i].fourStarList.push(tmpCard)
              seasonCardArray.push(uid)
            }
          } else if (card.star == 5) {
            if (seasonCardArray.indexOf(uid) == -1) {
              //初始化starList中对象的active字段，统一设置成false
              let tmpCard = Object.assign({}, card)
              tmpCard.active = false
              ac[i].fiveStarList.push(tmpCard)
              seasonCardArray.push(uid)
            }
          }
        }
      }
    }
    this.setData({
      seasonAllContent : ac
    })
    //处理seasonContent，默认使用seasonArray中第一个元素
    this.ChangeSeason(this.data.seasonAllContent[0].season)
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