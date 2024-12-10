// pages/wiki/wiki.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentSwitch: 'card',
    cardAllInfo: require('../../res/card_data').cardAllInfo,
    cardInfoArray: ['全部', 'Top能量', 'Top体力', 'Top攻击', 'Top特攻', 'Top防御', 'Top特防', 'Top速度'],
    cardInfo: '全部',
    seasonArray: ['全部', '冲锋六弹', '冲锋五弹', '冲锋四弹', '冲锋三弹', '冲锋二弹', '冲锋一弹', '传说四弹', '传说三弹', '传说二弹', '传说一弹', '第四弹', '第三弹', '第二弹', '第一弹', '无'],
    season: '',
    starArray: ['全部', '一星', '二星', '三星', '四星', '五星', '无'],
    star: '',
    typeArray: ['全部', '一般', '火', '水', '电', '草', '冰', '格斗', '毒', '地面', '飞行', '超能力', '虫', '岩石', '幽灵', '龙', '恶', '钢', '妖精'],
    type: '',
    systemArray: ['全部', 'Mega进化', 'Z招式', '合体', '双重冲击', '冲锋连击', '无'],
    system: '',
    displayArray: ['基础信息', '能力值', '招式信息'],
    display: '',
    onlySelected: false,
    moveAllInfo: require('../../res/move').moveAllInfo,
    moveType: '',
    zMoveArray: ['全部', 'Z招式', '普通招式'],
    zMove: '全部'
  },

  handleCardInfoSwitch(e){
    var c = e.target.dataset.cardinfo;
      this.setData({
        cardInfo : c,
      })
    if (c == '全部') {
      this.setData({
        cardAllInfo : require('../../res/card_data').cardAllInfo,
      })
    }
    else if (c == 'Top能量') {
      this.setData({
        cardAllInfo : require('../../res/topEng').topEng,
      })
    }
    else if (c == 'Top体力') {
      this.setData({
        cardAllInfo : require('../../res/topHP').topHP
      })
    }
    else if (c == 'Top攻击') {
      this.setData({
        cardAllInfo : require('../../res/topAtk').topAtk
      })
    }
    else if (c == 'Top特攻') {
      this.setData({
        cardAllInfo : require('../../res/topSPAtk').topSPAtk
      })
    }
    else if (c == 'Top防御') {
      this.setData({
        cardAllInfo : require('../../res/topDfs').topDfs
      })
    }
    else if (c == 'Top特防') {
      this.setData({
        cardAllInfo : require('../../res/topSPDfs').topSPDfs
      })
    }
    else if (c == 'Top速度') {
      this.setData({
        cardAllInfo : require('../../res/topSpd').topSpd
      })
    }
    this.hundleResetAll();
  },

  handleContentSwitch(e) {
    var c = e.target.dataset.content;
    this.setData({
      contentSwitch: c
    })
  },

  handleSeasonSwitch(e) {
    var s = e.target.dataset.season;
    this.setData({
      season: s
    })
    this.hundleFilter()
  },

  handleStarSwitch(e) {
    var s = e.target.dataset.star;
    this.setData({
      star: s
    })
    this.hundleFilter()
  },

  handleTypeSwitch(e) {
    var t = e.target.dataset.type;
    this.setData({
      type: t
    })
    this.hundleFilter()
  },

  handleSystemSwitch(e) {
    var s = e.target.dataset.system;
    this.setData({
      system: s
    })
    this.hundleFilter()
  },

  handleDisplaySwitch(e) {
    var d = e.target.dataset.display;
    this.setData({
      display: d
    })
  },

  handleOnlySelected() {
    var o = true
    if (this.data.onlySelected) {
      o = false
    }
    this.setData({
      onlySelected: o
    })
    this.hundleFilter()
  },

  hundleReset() {
    this.setData({
      season: this.data.seasonArray[0],
      star: this.data.starArray[0],
      type: this.data.typeArray[0],
      system: this.data.systemArray[0],
      display: this.data.displayArray[0],
    })
    this.hundleFilter()
  },

  hundleResetAll(){
    this.setData({
      season: this.data.seasonArray[0],
      star: this.data.starArray[0],
      type: this.data.typeArray[0],
      system: this.data.systemArray[0],
      display: this.data.displayArray[0],
    })
    var cards = JSON.parse(JSON.stringify(this.data.cardAllInfo))
    for (let i = 0; i < cards.length; i++) {
      var card = cards[i];
      card.color = false
      card.active = true
    }
    this.setData({
      cardAllInfo: cards
    })
  },

  hundleDescAlert(){
    wx.showModal({
      title: '说明',
      content: '招式信息根据宝可梦正作资料计算，造成多次伤害的招式（如：连环巴掌）威力显示为单次威力，与实机效果可能有差异！',
    })
  },

  hundleFilter() {
    var cards = JSON.parse(JSON.stringify(this.data.cardAllInfo))
    if (this.data.onlySelected) {
      for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.color) {
          card.active = true
        } else {
          card.active = false
        }
      }
    } else {
      for (let i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.color != true) {
          if (this.data.season != '全部' && this.data.season != card.season) {
            card.active = false
          } else if (this.data.star != '全部' && this.data.star != card.star) {
            card.active = false
          } else if (this.data.type != '全部' && this.data.type != card.type1 && this.data.type != card.type2) {
            card.active = false
          } else {
            card.active = true
          }
          //单独处理system
          if (card.active == true) {
            if (this.data.system != '全部') {
              if (this.data.system == 'Mega进化') {
                if ((card.spsys != 'Mega进化' && card.spsys != 'Mega|双重')) {
                  card.active = false
                }
              } else if (this.data.system == '双重冲击') {
                if ((card.spsys != '双重冲击' && card.spsys != 'Mega|双重')) {
                  card.active = false
                }
              } else if (this.data.system != card.spsys) {
                card.active = false
              }
            }
          }
        } else {
          card.active = true
        }
      }
    }
    this.setData({
      cardAllInfo: cards
    })
  },

  handleColorTap(e) {
    var id = e.target.dataset.id;
    for (let i = 0; i < this.data.cardAllInfo.length; i++) {
      var card = this.data.cardAllInfo[i];
      if (id == card.id) {
        var c = true
        if (card.color) {
          c = false
        }
        this.setData({
          ['cardAllInfo[' + i + '].color']: c
        })
      }
    }
  },

  handleMoveTypeSwitch(e) {
    var t = e.target.dataset.type;
    this.setData({
      moveType: t
    })
    this.hundleMoveFilter()
  },

  handleZMoveSwitch(e) {
    var z = e.target.dataset.zmove;
    this.setData({
      zMove: z
    })
    this.hundleMoveFilter()
  },

  hundleMoveFilter(){
    var moves = JSON.parse(JSON.stringify(this.data.moveAllInfo))
    for (let i = 0; i < moves.length; i++) {
      if (this.data.moveType != '全部' && moves[i].type != this.data.moveType) {
        moves[i].active = false
      }
      else if (this.data.zMove == 'Z招式' && moves[i].zmove != true) {
        moves[i].active = false
      }
      else if (this.data.zMove == '普通招式' && moves[i].zmove != false) {
        moves[i].active = false
      }
      else{
        moves[i].active = true
      }
    }
    this.setData({
      moveAllInfo : moves
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      season: this.data.seasonArray[0],
      star: this.data.starArray[0],
      type: this.data.typeArray[0],
      system: this.data.systemArray[0],
      display: this.data.displayArray[0],
      moveType: this.data.typeArray[0],
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