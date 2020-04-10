//index.js
//获取应用实例
const app = getApp()
const { get } = require('../../utils/util')

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
	years.push(i)
}

for (let i = 1; i <= 12; i++) {
	months.push(i)
}

for (let i = 1; i <= 31; i++) {
	days.push(i)
}

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		video: '',
		schollInfo: '',
		loading: true,
		years: years,
		year: date.getFullYear(),
		months: months,
		month: 2,
		days: days,
		day: 2,
		value: [9999, 1, 1],
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function () {
		this.login()
		this.getVersion()
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse){
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	onShow: function() {
		const self = this
		wx.setTabBarStyle({
			selectedColor: '#459bfe',
		})
		wx.getStorage({
			key: "islook",
			success: (res) =>{
				self.setData({
					islook: res.data
				})
			},
			complete:() =>{
				self.getData()
			}
		})
	},
	getUserInfo: function(e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	goDetail: function (event) {
		console.log({event})
		const { index } = event.currentTarget.dataset
		let url = ''
		let exam_info = 0
		if(index == 0){
			url = "/api/getschooldes";
		}
		if(index == 1){
			url = "/api/getremark";
		}
		if(index == 2){
			wx.navigateTo({
				url: '../zhuanye-list/zhuanye-list'
			})
			return
		}
		if(index == 3){
			exam_info = 1
			url = "/api/getremark";
		}
		if(index == 4){
			wx.navigateTo({
				url: '../history/history'
			})
			return
		}
		if(index == 5){
			url = "/api/getschooldes";
		}
		wx.setStorage({
			key: "url",
			data: url
		})
		wx.navigateTo({
			url: '../rich-text/rich-text?exam_info=' + exam_info
		})
	},
	getData: function () {
		const self = this
		get('/api/getinfo',{
			openid: wx.getStorageSync('openid')
		}).then(data =>{
			if(data.code == 0){
				self.setData({
					video: data.data.video,
					video_pic: data.data.video_pic,
					schollInfo: data.data.school,
					loading: false
				})
				if(data.data.bm_state && !self.data.islook){
					wx.showTabBarRedDot({
						index: 2
					})
				}else {
					wx.hideTabBarRedDot({
						index: 2
					})
				}
				wx.setStorage({
					key: "zy_video",
					data: data.data.zy_video
				})
				wx.setStorage({
					key: "zy_video_pic",
					data: data.data.zy_video_pic
				})
				wx.setStorage({
					key: "search_url",
					data: data.data.search_url
				})
			}
			console.log({data})
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
						app.globalData.openid = openid
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
	},
	getVersion: function () {
		const self = this
		get('/api/getVersion',{
			version: 1
		}).then(data =>{
			if(data.code == 0){
				let is_show = data.data.is_show
				self.setData({
					is_show
				})
			}
		})
	}
})
