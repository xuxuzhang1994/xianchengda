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
		pic1Str: 'lalllalla',
		region: '',
		pic1: '',
		pic2: '',
		pic3: '',
		pic4: '',
		pic5: '',
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
		// console.log(this.data.pic1Str)
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		const originData = e.detail.value
        const reg = /^\d*\.{0,1}\d{0,1}$/;
		if(!this.data.pic1){
			wx.showToast({
				title: '请上传前全身照片',
				icon: 'none'
			})
			return false
		}
		if(!this.data.pic2){
			wx.showToast({
				title: '请上传侧全身照片',
				icon: 'none'
			})
			return false
		}
		if(!this.data.pic3){
			wx.showToast({
				title: '请上传后全身照片',
				icon: 'none'
			})
			return false
		}
		if(!this.data.pic4){
			wx.showToast({
				title: '请上传前半上身照片',
				icon: 'none'
			})
			return false
		}
		if(!this.data.pic5){
			wx.showToast({
				title: '请上传脸部特写照片',
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
		if(!reg.test(originData.shenggao) || originData.shenggao <160 ||  originData.shenggao >300){
			wx.showToast({
				title: '请填写正确身高',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.tizhong) || originData.tizhong <30 ||  originData.tizhong >200){
			wx.showToast({
				title: '请填写正确体重',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.jiankuang) || originData.jiankuang <0 ||  originData.jiankuang >100){
			wx.showToast({
				title: '请填写正确肩宽',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.xiongwei) || originData.xiongwei <10 ||  originData.xiongwei >200){
			wx.showToast({
				title: '请填写正确胸围',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.yaowei) || originData.yaowei <10 ||  originData.yaowei >200){
			wx.showToast({
				title: '请填写正确腰围',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.tongwei) || originData.tongwei <10 ||  originData.tongwei >200){
			wx.showToast({
				title: '请填写正确臀围',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.datuiwei) || originData.datuiwei <10 ||  originData.datuiwei >100){
			wx.showToast({
				title: '请填写正确大腿围',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.xiaotuiwei) || originData.xiaotuiwei <10 ||  originData.xiaotuiwei >100){
			wx.showToast({
				title: '请填写正确小腿围',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.shangshenchang) || originData.shangshenchang <10 ||  originData.shangshenchang >200){
			wx.showToast({
				title: '请填写正确上身长',
				icon: 'none'
			})
			return false
		}
		if(!reg.test(originData.xiashenchang) || originData.xiashenchang <10 ||  originData.xiashenchang >200){
			wx.showToast({
				title: '请填写正确下身长',
				icon: 'none'
			})
			return false
		}

		let openid = wx.getStorageSync('openid')
		const form1Data = {
			...originData,
			openid
		}
		form1Data.pic1 = this.data.pic1;
		form1Data.pic2 = this.data.pic2;
		form1Data.pic3 = this.data.pic3;
		form1Data.pic4 = this.data.pic4;
		form1Data.pic5 = this.data.pic5;
		console.log(form1Data)
		wx.showModal({
			content: "请认真核对本人信息，一旦提交无法更改",
			confirmColor: "#459bfe",
			success: (res =>{
				if(res.confirm){
					post('api/liangti',form1Data).then(data =>{
						if(data.code == 0){
							wx.navigateTo({
								url: '/pages/liangti-success/liangti-success'
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
	choosePic1: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_a1 = await self.upload(tempFilePaths[0])
				self.setData({
					pic1: card_a1
				})
			}
		})
	},
	choosePic2: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_a2 = await self.upload(tempFilePaths[0])
				self.setData({
					pic2: card_a2
				})
			}
		})
	},
	// 上传前全身照片
	choosePic3: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_a3 = await self.upload(tempFilePaths[0])
				self.setData({
					pic3: card_a3
				})
				// self.setData({
				// 	card_a
				// })
			}
		})
	},
	// 上传侧全身照片
	choosePic4: function () {
		const self = this
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_a4 = await self.upload(tempFilePaths[0])
				self.setData({
					pic4: card_a4
				})
				// self.setData({
				// 	card_a
				// })
			}
		})
	},
	// 上传后全身照片
	choosePic5: function () {
		const self = this
		let {originData} = self.data
		wx.chooseImage({
			count: 1,
			success: async (res) =>{
				const { tempFilePaths } = res
				const card_a5 = await self.upload(tempFilePaths[0])
				self.setData({
					pic5:card_a5
				})
				// self.setData({
				// 	originData
				// })
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
	play: function () {
		wx.navigateTo({
			url: '/pages/video/video'
		})
	}
})


