// pages/fapiao/fapiao.js
const { post, get } = require('../../utils/util')
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sexArray: ['个人','企业'],
		region: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	formSubmit: function (e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		const originData = e.detail.value
		if(this.data.index == undefined){
			wx.showToast({
				title: '请选择类型',
				icon: 'none'
			})
			return false
		}
		if(!originData.username ){
			wx.showToast({
				title: '请填写姓名',
				icon: 'none'
			})
			return false
		}
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(originData.mobile)){
			wx.showToast({
				title: '请填写正确电话号码',
				icon: 'none'
			})
			return false
		}
		if(!this.data.region){
			wx.showToast({
				title: '请选择地址',
				icon: 'none'
			})
			return false
		}
		if(!originData.area ){
			wx.showToast({
				title: '请填写详细地址',
				icon: 'none'
			})
			return false
		}
		var re=/^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
		if(!re.test(originData.email) ){
			wx.showToast({
				title: '请填写正确邮箱地址',
				icon: 'none'
			})
			return false
		}
		post('/api/fapiao',{
			type: this.data.sexArray[originData.sex],
			username: originData.username,
			mobile: originData.mobile,
			area: this.data.region + originData.area,
			email: originData.email,
			openid: app.globalData.openid,
		}).then(data =>{
			if(data.code == 0){
				wx.showToast({
					title: '提交成功',
				})
				setTimeout(function () {
					wx.switchTab({
						url: `/pages/index/index`
					})
				},5000)
			}else {
				wx.showToast({
					title: data.msg,
					icon: "none"
				})
            }
		})
	},
	bindRegionChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value.join('-')
		})
	},
	bindKeyInput: function (e) {
		this.setData({
			inputValue: e.detail.value.replace(' ','')
		})
	},
	bindKeyInput2: function (e) {
		this.setData({
			inputValue2: e.detail.value.replace(' ','')
		})
	},
})
