// pages/formdata/formdata.js
const { get,post } = require("../../utils/util")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		langList: [],
		shengArray: [],
		mingzuArray: [],
		sexArray: ['男', '女'],
		info:{},
		mianmaoArray: ["中共党员", "中共预备党员", "共青团员", " 民革党员", " 民盟盟员", " 民建会员", " 民进会员", " 农工党党员", "致公党党员", "九三学社社员", " 台盟盟员", "无党派人士", "群众"]

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const formdata = wx.getStorageSync('formdata')
		this.setData({
			formdata,
			info: formdata.info || {}
		})
		this.getLang()
		this.getProivnnce()
		this.getMz()
		console.log({formdata})

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
	checkData: function(){
		let {info,mianmaoArray} = this.data
		if(!info.username){
			wx.showToast({
				title: '请填写姓名',
				icon: 'none'
			})
			return false
		}
		if(!info.sex){
			wx.showToast({
				title: '请填写性别',
				icon: 'none'
			})
			return false
		}
		if(!info.mz){
			wx.showToast({
				title: '请填写民族',
				icon: 'none'
			})
			return false
		}
		if(info.mianmao == undefined){
			wx.showToast({
				title: '请填写政治面貌',
				icon: 'none'
			})
			return false
		}
		if(info.wyyz == undefined){
			wx.showToast({
				title: '请选择外语语种',
				icon: 'none'
			})
			return false
		}
		if(!info.province){
			wx.showToast({
				title: '请选择生源地',
				icon: 'none'
			})
			return false
		}
		if(!info.student_number){
			wx.showToast({
				title: '请填写考生号',
				icon: 'none'
			})
			return false
		}
		if(!info.exam_avatar){
			wx.showToast({
				title: '请上传准考证',
				icon: 'none'
			})
			return false
		}
		if(!info.card_number){
			wx.showToast({
				title: '请填写身份证号',
				icon: 'none'
			})
			return false
		}
		if(!info.card_a){
			wx.showToast({
				title: '请上传身份证',
				icon: 'none'
			})
			return false
		}
		if(!info.card_b){
			wx.showToast({
				title: '请上传身份证',
				icon: 'none'
			})
			return false
		}
		if(!info.address){
			wx.showToast({
				title: '请填写详细地址',
				icon: 'none'
			})
			return false
		}
		if(!info.lxdh1){
			wx.showToast({
				title: '请填写联系电话1',
				icon: 'none'
			})
			return false
		}
		if(!info.lxdh2){
			wx.showToast({
				title: '请填写联系电话2',
				icon: 'none'
			})
			return false
		}
		if(!info.username){
			wx.showToast({
				title: '请填写姓名',
				icon: 'none'
			})
			return false
		}
		// if(!info.student_number){
		// 	wx.showToast({
		// 		title: '请上传准考证',
		// 		icon: 'none'
		// 	})
		// 	return false
		// }

		// if(!info.yzbm){
		// 	wx.showToast({
		// 		title: '请输入邮政编码',
		// 		icon: 'none'
		// 	})
		// 	return false
		// }
		// if(!info.sjrxm){
		// 	wx.showToast({
		// 		title: '请输入收件人姓名',
		// 		icon: 'none'
		// 	})
		// 	return false
		// }
		// if(!info.sjreyb){
		// 	wx.showToast({
		// 		title: '请输入收件人邮编',
		// 		icon: 'none'
		// 	})
		// 	return false
		// }
		// if(!info.sjrdz){
		// 	wx.showToast({
		// 		title: '请输入收件人地址',
		// 		icon: 'none'
		// 	})
		// 	return false
		// }
		return true
	},
	getMz: function () {
		const self = this
		get('/api/getMz').then(data =>{
			self.setData({
				mingzuArray: data.data
			})
		})
	},
	getLang: function () {
		const self = this
		get('/api/getLang').then(data =>{
			const lang = data.data.find(item => item.id == self.data.info.wyyz)
			self.setData({
				langList: data.data,
				lang
			})
		})
	},
	go: function () {
		let {info,mianmaoArray} = this.data
		const isOk = this.checkData()
		isOk && wx.showModal({
			content: "请认真核对本人信息，一旦提交无法更改",
			confirmColor: "#459bfe",
			success: (res =>{
				if(res.confirm){
					post('/api/createUserInfo',{...info,order_no: this.data.formdata.order_no}).then(data =>{
						if(data.code == 0){
							wx.setStorage({
								key: 'formdata',
								data: data.data
							})
							wx.navigateTo({
								url: '/pages/confrim-pay/confrim-pay'
							})
						}else {
							wx.showToast({
								title: data.msg,
								icon: 'none'
							})
						}
					})
				}
			})
		})

	},
	changeInfo: function (e) {
		const key = e.currentTarget.dataset.key
		const value = e.detail.value
		let {info} = this.data
		info[key] = value
	},
	bindMingzuChange: function (e) {
		let {info,mingzuArray} = this.data
		this.setData({
			mzindex: e.detail.value
		})
		info.mz = mingzuArray[e.detail.value]
		this.setData({
			info
		})
	},
	bindPickerChange: function (e) {
		let {info} = this.data
		info.sex = e.detail.value * 1 + 1
		this.setData({
			index: e.detail.value
		})
	},
	bindRegionChange: function (e) {
		let {info,shengArray} = this.data
		info.province = shengArray[e.detail.value]
		this.setData({
			info
		})
	},
	bindLangChange: function (e) {
		let {info,langList} = this.data
		info.wyyz = langList[e.detail.value].id
		this.setData({
			info
		})
	},
	bindPickerChangeMianmao: function (e) {
		let {info,mianmaoArray} = this.data
		info.mianmao = mianmaoArray[e.detail.value]
		this.setData({
			info
		})
	},
	chooseZhunkaozheng: function () {
		let {info} = this.data
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const url = await self.upload(tempFilePaths[0])
				info.exam_avatar = url
				self.setData({
					info
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
	getProivnnce: function () {
		const self = this
		get('/api/getProvince').then(data =>{
			self.setData({
				shengArray: data.data.province,
				yearsArray: data.data.year,
				zhuanyeArray: data.data.zhuanye,
			})
		})
	},
})
