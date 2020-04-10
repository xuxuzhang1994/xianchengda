// components/city-pick-view/city-pick-view.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		range: {
			type: Array,
			value: []
		},
		rangeKey:{
			type: String,
			value: ''
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show: false,
		value: [0]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		bindChange: function (e) {
			const value = e.detail.value
			this.setData({
				value: value
			})
		},
		showTogger: function () {
			this.setData({
				show: !this.data.show
			})
		},
		onCancel: function () {
			this.setData({
				show: false
			})
		},
		onOk: function () {
			const value = this.data.value
			console.log({value})
			this.triggerEvent('change', {
				value: value[0]
			}, 2)
			this.setData({
				show: false
			})
		}
	}
})
