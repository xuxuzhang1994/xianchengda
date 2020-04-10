// pages/save-card/save-card.js
const { get } = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  template: {},
      info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const {info} = this.data
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

  },
    getData: function () {
    const self = this
        get("api/getDownCard",{
	        openid: app.globalData.openid
        }).then(data =>{
          const info = data.data
          self.setData({
              info: data.data,
	          template: {
		          width: '750rpx',
		          height: '1000rpx',
		          background: '#fff',
		          views: [
			          {
				          type: 'text',
				          text: '西安工程大学校招统一考试',
				          css: {
					          top: '20rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '32rpx',
					          // color: 'green',
					          // borderWidth: '1rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '准考证',
				          css: {
					          top: '60rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '36rpx',
					          // color: 'green',
					          // borderWidth: '1rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '准考证号',
				          css: {
					          top: '140rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
					          // color: 'green',
				          },
			          },
			          {
				          type: 'text',
				          text: '考生号',
				          css: {
					          top: '200rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '姓名',
				          css: {
					          top: '260rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '性别',
				          css: {
					          top: '320rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '身份证号',
				          css: {
					          top: '380rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '报考科类',
				          css: {
					          top: '440rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '考室号',
				          css: {
					          top: '500rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '考点名称',
				          css: {
					          top: '560rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '考点地址',
				          css: {
					          top: '620rpx',
					          align: 'center',
					          left: '120rpx',
					          fontSize: '28rpx',
				          },
			          },
			          ////////
			          {
				          type: 'text',
				          text: info.exam_number,
				          css: {
					          top: '140rpx',
					          align: 'center',
					          fontSize: '28rpx',
					          left: '375rpx',
					          // color: 'green',
				          },
			          },
			          {
				          type: 'text',
				          text: info.student_number || '--',
				          css: {
					          top: '200rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.username,
				          css: {
					          top: '260rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.sex == 1? '男':'女',
				          css: {
					          top: '320rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.card_number,
				          css: {
					          top: '380rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.subject,
				          css: {
					          top: '440rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_id,
				          css: {
					          top: '500rpx',
					          left: '300rpx',
					          align: 'center',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '487rpx',
					          left: '370rpx',
					          align: 'center',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '60rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: '座位号',
				          css: {
					          top: '500rpx',
					          left: '450rpx',
					          align: 'center',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.seat_number,
				          css: {
					          top: '500rpx',
					          align: 'center',
					          left: '640rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_name,
				          css: {
					          top: '560rpx',
					          align: 'center',
					          left: '500rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_address,
				          css: {
					          top: '620rpx',
					          align: 'center',
					          left: '500rpx',
					          fontSize: '28rpx',
				          },
			          },
			          ///////
			          {
				          type: 'image',
				          url: info.avatar,
				          align: 'center',
				          css: {
					          width: '175rpx',
					          height: '200rpx',
					          top: '160rpx',
					          left: '540rpx'
				          },
			          },
			          ////
			          {
				          type: 'rect',
				          css: {
					          top: '126rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '540rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '126rpx',
					          left: '220rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '540rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '126rpx',
					          left: '520rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '420rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '126rpx',
					          right: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '540rpx',
				          },
			          },
			          ////
			          {
				          type: 'rect',
				          css: {
					          top: '125rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '718rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '185rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '505rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '245rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '505rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '305rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '505rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '365rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '505rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '425rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '505rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '485rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '718rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '545rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '718rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '605rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '718rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '665rpx',
					          left: '16rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '718rpx',
					          height: '1rpx',
				          },
			          },
			          /////
			          {
				          type: 'text',
				          text: '考试时间表',
				          css: {
					          top: '730rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          /////
			          {
				          type: 'text',
				          text: '日期时间',
				          css: {
					          top: '790rpx',
					          align: 'center',
					          left: '135rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[0]][0].times,
				          css: {
					          top: '850rpx',
					          align: 'center',
					          left: '135rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[0]][1].times,
				          css: {
					          top: '910rpx',
					          align: 'center',
					          left: '135rpx',
					          fontSize: '28rpx',
				          },
			          },
			          /////
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[0]][0].date,
				          css: {
					          top: '790rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[0]][0].subject,
				          css: {
					          top: '850rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[0]][1].subject,
				          css: {
					          top: '910rpx',
					          align: 'center',
					          left: '375rpx',
					          fontSize: '28rpx',
				          },
			          },
			          /////
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[1]][0].date,
				          css: {
					          top: '790rpx',
					          align: 'center',
					          left: '615rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[1]][0].subject,
				          css: {
					          top: '850rpx',
					          align: 'center',
					          left: '615rpx',
					          fontSize: '28rpx',
				          },
			          },
			          {
				          type: 'text',
				          text: info.exam_info[Object.keys(info.exam_info)[1]][1].subject,
				          css: {
					          top: '910rpx',
					          align: 'center',
					          left: '615rpx',
					          fontSize: '28rpx',
				          },
			          },
			          /////
			          {
				          type: 'rect',
				          css: {
					          top: '715rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '240rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '775rpx',
					          left: '255rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '180rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '775rpx',
					          left: '495rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '180rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '715rpx',
					          left: '735rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '1rpx',
					          height: '240rpx',
				          },
			          },
			          /////
			          {
				          type: 'rect',
				          css: {
					          top: '715rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '720rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '775rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '720rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '835rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '720rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '895rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '720rpx',
					          height: '1rpx',
				          },
			          },
			          {
				          type: 'rect',
				          css: {
					          top: '955rpx',
					          left: '15rpx',
					          color: 'rgba(0, 0, 0, 0.5)',
					          width: '720rpx',
					          height: '1rpx',
				          },
			          },
		          ]
	          }
          })
          console.log({data})
        })
    },
	onImgOK(e) {
		this.imagePath = e.detail.path;
		this.setData({
			image: this.imagePath
		})
		console.log(e);
	},

	saveImage() {
		wx.saveImageToPhotosAlbum({
			filePath: this.imagePath,
		});
	},
})
