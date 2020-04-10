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
		mingzuArray: [],
		lang: {},
		maxlength: 14,
		mianmaoArray: ["中共党员", "中共预备党员", "共青团员", " 民革党员", " 民盟盟员", " 民建会员", " 民进会员", " 农工党党员", "致公党党员", "九三学社社员", " 台盟盟员", "无党派人士", "群众"]
		// index: 1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.subject = options.id
		this.card = options.card
		this.getLang()
		this.getProivnnce()
		this.getTableInfo()
		this.getMz()
		wx.removeStorageSync('card_a')
		wx.removeStorageSync('card_b')
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
		const card_a = wx.getStorageSync('card_a')
		const card_b = wx.getStorageSync('card_b')
		this.setData({
			card_a,
			card_b
		})
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
		return false
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
	bindMingzuChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			mzindex: e.detail.value
		})
	},
	bindPickerChangeMianmao: function (e) {
		this.setData({
			mianmao: this.data.mianmaoArray[e.detail.value]
		})
	},
	formSubmit: function (e) {
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		const originData = e.detail.value
		if(!this.data.avatar){
			wx.showToast({
				title: '请上传照片',
				icon: 'none'
			})
			return false
		}
		if(!originData.username){
			wx.showToast({
				title: '请填写姓名',
				icon: 'none'
			})
			return false
		}
		if(this.data.index == undefined){
			wx.showToast({
				title: '请填写性别',
				icon: 'none'
			})
			return false
		}
		if(this.data.mzindex == undefined){
			wx.showToast({
				title: '请填写民族',
				icon: 'none'
			})
			return false
		}
		if(this.data.mianmao == undefined){
			wx.showToast({
				title: '请填写政治面貌',
				icon: 'none'
			})
			return false
		}
		if(!this.data.lang.id){
			wx.showToast({
				title: '请选择外语语种',
				icon: 'none'
			})
			return false
		}
		if(!this.data.provice){
			wx.showToast({
				title: '请选择生源地',
				icon: 'none'
			})
			return false
		}
		if(
			this.data.provice != "陕西省" && this.data.provice != "广东省"
		){
			if(!originData.student_number || originData.student_number.length != 14 ){
				wx.showToast({
					title: '请填写正确考生号',
					icon: 'none'
				})
				return false
			}
		}
		if(
			this.data.provice == "陕西省" || this.data.provice == "广东省"
		){
			if(!originData.student_number){
				wx.showToast({
					title: '请填写考生号',
					icon: 'none'
				})
				return false
			}
		}
		if(!this.data.zhunkaozheng){
			wx.showToast({
				title: '请上传准考证',
				icon: 'none'
			})
			return false
		}

		if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(originData.card_number)){
			wx.showToast({
				title: '请填写正确身份证号',
				icon: 'none'
			})
			return false
		}
		if(!this.data.card_a){
			wx.showToast({
				title: '请上传身份证',
				icon: 'none'
			})
			return false
		}
		if(!this.data.card_b){
			wx.showToast({
				title: '请上传身份证',
				icon: 'none'
			})
			return false
		}
		if(!originData.address){
			wx.showToast({
				title: '请填写详细地址',
				icon: 'none'
			})
			return false
		}
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(originData.lxdh1)){
			wx.showToast({
				title: '请填写正确电话号码',
				icon: 'none'
			})
			return false
		}
		if(!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(originData.lxdh2)){
			wx.showToast({
				title: '请填写正确电话号码',
				icon: 'none'
			})
			return false
		}
		let openid = wx.getStorageSync('openid')
		const form1Data = {
			...originData,
			card_a: this.data.card_a,
			card_b: this.data.card_b,
			subject: this.subject || 1,
			avatar: this.data.avatar,
			exam_id: this.data.tableInfo.id,
			province:this.data.provice,
			// city: originData.region[1],
			// area: originData.region[2],
			sex: this.data.index + 1,
			mz: this.data.mingzuArray[this.data.mzindex],
			mianmao: this.data.mianmao,
			wyyz: this.data.lang.id,
			exam_avatar: this.data.zhunkaozheng,
			openid
		}
		post('/api/createUserInfo',form1Data).then(data =>{
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
		// wx.setStorageSync('form1Data',form1Data)
		// wx.navigateTo({
		// 	url: '/pages/form-step2/form-step2'
		// })

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
		wx.navigateTo({
			url: '/pages/upload-card/upload-card'
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
	bindProvicePickerChange: function(e) {
		this.setData({
			provice: this.data.shengArray[e.detail.value],
		})
		if(this.data.shengArray[e.detail.value] == '陕西省' || this.data.shengArray[e.detail.value] == '广东省'){
			this.setData({
				provice: this.data.shengArray[e.detail.value],
				maxlength: 9999
			})
		}else {
			this.setData({
				provice: this.data.shengArray[e.detail.value],
				maxlength: 14
			})
		}
	},
	getLang: function () {
		const self = this
		get('/api/getLang').then(data =>{
			self.setData({
				langList: data.data
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
	getTableInfo: function () {
		const self = this
		get('/api/getTableInfo').then(data =>{
			self.setData({
				tableInfo: data.data
			})
		})
	},
	getMz: function () {
		const self = this
		get('/api/getMz').then(data =>{
			self.setData({
				mingzuArray: data.data
			})
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
	},
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value.replace(' ','')
    })
  },
})


