// pages/form-step1/form-step1.js
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime')
const { post, get } = require('../../utils/util')
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sexArray: ['男', '女'],
		region: '',
		step: 1,
		langList: [],
		lang: {},
		mianmaoArray: ["中共党员", "中共预备党员", "共青团员", " 民革党员", " 民盟盟员", " 民建会员", " 民进会员", " 农工党党员", "致公党党员", "九三学社社员", " 台盟盟员", "无党派人士", "群众"]
		// index: 1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.subject = options.id
		this.getLang()
		this.getTableInfo()
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
		this.login()
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
	bindPickerChangeMianmao: function (e) {
		this.setData({
			mianmao: this.data.mianmaoArray[e.detail.value]
		})
	},
	formSubmit2: function (e) {
		const self = this
		let originData = e.detail.value
		// if(!originData.zxmc){
		// 	wx.showToast({
		// 		title: '请填写中学名称',
		// 		icon: 'none'
		// 	})
		// 	return false
		// }
		if(!this.data.lang.id){
			wx.showToast({
				title: '请选择外语语种',
				icon: 'none'
			})
			return false
		}
		if(!(/^[0-9]{6}$/).test(originData.yzbm)){
			wx.showToast({
				title: '请输入正确的邮政编码',
				icon: 'none'
			})
			return false
		}
		if(!originData.sjrxm){
			wx.showToast({
				title: '请输入收件人姓名',
				icon: 'none'
			})
			return false
		}
		if(!(/^[0-9]{6}$/).test(originData.sjreyb)){
			wx.showToast({
				title: '请输入正确的收件人邮编',
				icon: 'none'
			})
			return false
		}
		if(!originData.sjrdz){
			wx.showToast({
				title: '请输入收件人地址',
				icon: 'none'
			})
			return false
		}
		let openid = wx.getStorageSync('openid')
		const form1Data = wx.getStorageSync('form1Data')
		const finalData = {
			...form1Data,
			...originData,
			wyyz: this.data.lang.id,
			openid
		}
		post('/api/createUserInfo',finalData).then(data =>{
			if(data.code == 0){
				wx.setStorage({
					key: 'formdata',
					data: data.data
				})
				wx.navigateTo({
					url: '/pages/formdata/formdata'
				})
			}else {
				wx.showToast({
					title: data.msg,
					icon: 'none'
				})
			}
		})
	},
	chooseImg: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const url = await self.upload(tempFilePaths[0])
				self.setData({
					avatar: url
				})
			}
		})
	},
	chooseZhunkaozheng: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const url = await self.upload(tempFilePaths[0])
				self.setData({
					zhunkaozheng: url
				})
			}
		})
	},
	chooseCard: function () {
		const self = this
		this.setData({
			showCard: true
		})
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
	bindRegionChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value.join('-')
		})
	},
	bindLangChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			lang: this.data.langList[e.detail.value]
		})
	},
	getLang: function () {
		const self = this
		get('/api/getLang').then(data =>{
			self.setData({
				langList: data.data
			})
		})
	},
	getTableInfo: function () {
		const self = this
		get('/api/getTableInfo').then(data =>{
			self.setData({
				tableInfo: data.data
			})
		})
	},
	save: function () {
		this.setData({
			showCard: false
		})
	},
	prev: function () {
		this.setData({
			step: 1
		})
	},
	login: function () {
		const self = this
		wx.login({
			//获取code
			success: function (res) {
				var code = res.code; //返回code
				get('/api/getOpenid',{
					code
				}).then(data =>{
					if(data.code == 0){
						let openid = data.data.openid
						wx.setStorageSync('openid',openid)
					}else {
						wx.showToast({
							title: '登录失败',
							icon: 'none'
						})
					}
				})
			},
			fail: (res) =>{
				wx.showToast({
					title: res,
					icon: 'none'
				})
			}
		})

	}
})
