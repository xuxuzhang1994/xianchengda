const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const get = (url,params) =>{
	url = 'https://baoming.goboosoft.com/' + url
	return new Promise(resolve => {
		wx.showLoading({
			title: '加载中...'
		})
		wx.request({
			url: url,
			data: params,
			header: {
				'content-type': 'application/json' // 默认值
			},
			success (res) {
				resolve(res.data)
				// console.log(res.data)
			},
			complete(){
				wx.hideLoading()
			}
		})
	})
}

const post = (url,params) =>{
	url = 'https://baoming.goboosoft.com/' + url
	wx.showLoading({
		title: '加载中...'
	})
	return new Promise(resolve => {
		wx.request({
			url: url,
			data: params,
			method: "POST",
			header: {
				'content-type': 'application/json' // 默认值
			},
			success (res) {
				resolve(res.data)
				// console.log(res.data)
				wx.hideLoading()
			},
			complete(){
				wx.hideLoading()
			}
		})
	})
}

module.exports = {
	formatTime: formatTime,
	post,
	get
}
