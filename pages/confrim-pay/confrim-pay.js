// pages/confrim-pay/confrim-pay.js
const moment = require("moment")
const app = getApp()
const {post} = require('../../utils/util')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const formdata = wx.getStorageSync('formdata')
		const created_at = formdata.info.created_at
		this.setData({
			formdata,
			created_at
		})
		this.daojishi()
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

	},
	pay: function () {
		const self = this
		post('api/getPayParam',{
			openid: wx.getStorageSync('openid'),
			order_id: this.data.formdata.order_no
		}).then(data =>{
			if(data.code == 0){
				wx.requestPayment({
					timeStamp: data.data.timeStamp,
					nonceStr: data.data.nonceStr,
					package: data.data.package,
					signType: 'MD5',
					paySign: data.data.paySign,
					success (res) {
						// wx.removeStorageSync('')
						wx.setStorageSync('islook',false)
						wx.navigateTo({
							url: `/pages/pay-success/pay-success?no=${self.data.formdata.order_no}&price=${self.data.formdata.price}`
						})
					},
					fail (res) { }
				})
			}else {
				wx.showToast({
					title: data.msg,
					icon: "none"
				})
			}
		})
	},
	daojishi: function () {
		const self = this
		let setTime = setInterval(function () {
			// var startTime = moment(moment(self.data.info.created_at * 1000))
			var startTime = moment(moment(new Date()))
			var endTime = moment(moment(self.data.created_at * 1000).add(10,"m"))
			// var startTime = moment(self.data.info.created_at)
			// var startTime = moment(new Date())
			console.log({
				endTime: moment(endTime).format('YYYY-MM-DD mm:ss'),
				startTime: moment(startTime).format('YYYY-MM-DD mm:ss'),
				x: endTime-startTime,
				y: endTime.diff(startTime, 'seconds')
			})
			// 距离2019-12-07还有多少时分秒
			var hoursLeft = endTime.diff(startTime, 'hours');
			var minutesLeft = endTime.diff(startTime, 'minutes');
			var secondsLeft = endTime.diff(startTime, 'seconds');
			var secondsCount = secondsLeft;
			// 小时剩余时间转分，然后用总剩余分钟数取余，即是倒数分钟数
			minutesLeft = minutesLeft > 60 ? minutesLeft % (hoursLeft * 60) : minutesLeft;
			// 分钟剩余时间转秒，小时剩余时间转秒， 最后用总剩余秒数取余即是倒数秒
			secondsLeft = secondsLeft > 60 ? secondsLeft % (minutesLeft * 60 + hoursLeft * 60 * 60) : secondsLeft;
			console.log({
				minutesLeft,
				secondsLeft
			})
			self.setData({
				minutesLeft,
				secondsLeft
			})
			// $('.timedown').html(PrefixInteger(hoursLeft,2) +':'+PrefixInteger(minutesLeft,2)+':'+PrefixInteger(secondsLeft,2));
			// 倒计时结束时清除计时器执行其它逻辑
			if(secondsCount <= 0) {
				clearInterval(setTime);
			}
			// self.daojishi()
		}, 1000);
	}
})
