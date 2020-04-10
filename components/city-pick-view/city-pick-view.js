// components/city-pick-view/city-pick-view.js
const region = require('./city')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
	  region,
	  proviceIndex: 0,
	  cityIndex: 0,
	  show: false,
	  value: [0,0,0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
	  bindChange: function (e) {
		  const proviceIndex = e.detail.value[0]
		  const cityIndex = e.detail.value[1]
          if(proviceIndex != this.data.proviceIndex){
	          this.setData({
		          value: [proviceIndex,0,0]
	          })
          }
		  if(cityIndex != this.data.cityIndex){
			  this.setData({
				  value: [proviceIndex,cityIndex,0]
			  })
		  }
		  console.log(proviceIndex,cityIndex)
		  this.setData({
			  proviceIndex,
			  cityIndex
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
	      const provinceName = region[value[0]].provinceName
	      const cityName = region[value[0]].mallCityList[value[1]].cityName
	      const areaName = region[value[0]].mallCityList[value[1]].mallAreaList[value[2]].areaName
	      this.triggerEvent('change', {
	        value: [provinceName,cityName,areaName]
          }, 2)
	      this.setData({
		      show: false
	      })
      }
  }
})
