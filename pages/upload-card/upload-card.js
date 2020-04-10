// pages/upload-card/upload-card.js
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
const { post, get } = require('../../utils/util')
const app = getApp()
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
		const card_a = wx.getStorageSync('card_a')
		const card_b = wx.getStorageSync('card_b')
		this.setData({
			card_a,
			card_b
		})
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
	chooseCard1: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_a = await self.upload(tempFilePaths[0])
				self.setData({
					card_a
				})
				wx.setStorageSync('card_a',this.data.card_a)
			}
		})
	},
	chooseCard2: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_b = await self.upload(tempFilePaths[0])
				self.setData({
					card_b
				})
				wx.setStorageSync('card_b',this.data.card_b)
			}
		})
	},
	upload: function (filePath) {
		return new Promise(resolve => {
			wx.uploadFile({
				url: 'https://baoming.goboosoft.com/api/uploadPic',
				filePath: filePath,
				name: 'file_name',
				// header: 'header',
				formData: {
					openid: app.globalData.openid,
				},
				success (res){
					const data = JSON.parse(res.data)
					console.log({res})
					if(data.code == 0){
						resolve(data.data.file_url)
					}
				},
			})
		})
	},
	save: function () {
		wx.setStorageSync('card_a',this.data.card_a)
		wx.setStorageSync('card_b',this.data.card_b)
		const pages = getCurrentPages(); //当前页面
		// const beforePage = pages[]; //前一页
		wx.navigateBack({
			delta: 1
		})
	},
})
