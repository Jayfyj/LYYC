<template>
  <div class="map">
    <el-row style="margin-bottom:10px;">
      <el-input v-model="address" style="width:200px;margin-right:10px" type="text" />
      <el-button type="primary" @click="search">搜索</el-button>
    </el-row>
    <!-- <input v-model="address"/><button @click="search">搜索</button> -->
    <div style="display:flex;width:100%">
      <div id="iCenter"/>
    </div>
    <div style="text-align: center;">
      <el-button style="margin: 20px auto;" type="primary" @click="submit">确定</el-button>
    </div>
  </div>
</template>
<script>
/*
  地图搜索功能和点击地图获取功能
*/
// import AMap from 'AMap'
export default {
  data() {
    return {
      address: '', // 保存地址的汉字名字
      map: '', // 保存地址的经纬度
      checkedAddress: [], // 选中的地址
      lnglatXY: [], // 最终发送出去的坐标
      adderssPush: '', // 最终发送出去的地址
      poiArr: [], // 左边搜索出来的数组
      windowsArr: [], // 信息窗口的数组
      marker: [],
      mapObj: {}, // 地图对象
      selectedIndex: -1
    }
  },
  mounted() {
    // setTimeout(()=>{
      this.mapInit()
      this.placeSearch('')
    // },500)
  },
  methods: {
    // 数据提交
    submit() {
      if (!this.lnglatXY.length && !this.adderssPush) {
        this.$message.error('请选择定位')
        return
      }
      console.log(this.lnglatXY)
      console.log(this.adderssPush)
      this.$emit('getLocation', this.lnglatXY, this.adderssPush)
    },
    // ======================================点击获取地图功能块======================================
    // 经纬度转化为详细地址
    getAddress() {
      const that = this
      console.log(AMap)
      AMap.plugin('AMap.Geocoder', function() {
        const geocoder = new AMap.Geocoder({
          radius: 100,
          extensions: 'all'
        })

        // console.log(that.map1.lng, that.map1.lat,geocoder.getAddress())
        geocoder.getAddress([that.map1.lng, that.map1.lat], function(status, result) {
          // console.log(status,result.info)
          if (status === 'complete' && result.info === 'OK') {
            const address = result.regeocode.formattedAddress
            // console.log(address)
            that.adderssPush = address
            console.log(that.adderssPush)
            console.log([that.map1.lng, that.map1.lat])
            that.lnglatXY = [that.map1.lng, that.map1.lat]
            that.address = result.regeocode.formattedAddress
            console.log(that.address)
          }
        })
      })
    },
    // 地图点击事件
    testevent() {
      const that = this
      this.clickType = 3
      // var map=new AMap.Map('iCenter');//重新new出一个对象，传入参数是div的id
      AMap.event.addListener(this.mapObj, 'click', function(e) { // 添加点击事件,传入对象名，事件名，回调函数
        that.map1 = e.lnglat
        that.getAddress()
        setTimeout(() => {
          new AMap.InfoWindow({
            content: `<h3>当前地址</h3>
            <div class="amap-icon" style="position: absolute; width: 19px; height: 33px; opacity: 1;">
            </div>` + that.address,
            size: new AMap.Size(300, 0),
            autoMove: true,
            offset: new AMap.Pixel(-4, -10)
          }).open(that.mapObj, e.lnglat)
        }, 500)
      })
    },
    // ======================================点击获取地图功能块======================================

    // =========================================创建一个map=========================================
    mapInit() {

      this.mapObj = new AMap.Map('iCenter', {
        resizeEnable: true,
        zoom: 12,
        center: [113.30764968, 23.1200491]
      })
      // var that = this
      // var geolocation
      // this.mapObj.plugin('AMap.Geolocation', function () {
      //         geolocation = new AMap.Geolocation({
      //             enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      //             timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
      //             maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
      //             convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      //             showButton: true,         // 显示定位按钮，默认：true
      //             buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
      //             buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //             showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
      //             showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
      //             panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
      //             zoomToAccuracy:true       // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //         });
      //         that.mapObj.addControl(geolocation);
      //         geolocation.getCurrentPosition();
      //         AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
      //         AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
      //     });

      //     function onComplete(obj){
      //         var res = '经纬度：' + obj.position +
      //                 '\n精度范围：' + obj.accuracy +
      //                 '米\n定位结果的来源：' + obj.location_type +
      //                 '\n状态信息：' + obj.info +
      //                 '\n地址：' + obj.formattedAddress +
      //                 '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
      //         alert(res);
      //     }

      //     function onError(obj) {
      //         alert(obj.info + '--' + obj.message);
      //         console.log(obj);
      //     }


      this.testevent()
      // ====================================使用点击获取地图功能====================================
    },
    // ==========================================搜索功能块==========================================
    // 根据名字地址去搜索结果
    placeSearch(name) {
      var MSearch
      this.mapObj.plugin(
        ['AMap.PlaceSearch', 'AMap.ToolBar', 'AMap.Scale'],
        () => {
          this.mapObj.addControl(new AMap.ToolBar())
          this.mapObj.addControl(new AMap.Scale())
          MSearch = new AMap.PlaceSearch({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            // 构造地点查询类
            city: '' // 城市
          })
          AMap.event.addListener(MSearch, 'complete', this.keywordSearch_CallBack) // 返回地点查询结果
          MSearch.search(name) // 关键字查询
        }
      )
    },
    // 结果的回调
    keywordSearch_CallBack(data) {
      console.log(data)
      var poiArr = data.poiList.pois
      var resultCount = poiArr.length
      this.poiArr = poiArr // 左边要渲染的数据
      console.log(this.poiArr)
      for (var i = 0; i < resultCount; i++) {
        this.addmarker(i, poiArr[i])
        this.poiArr[i].url = this.poiArr[i].photos ? this.poiArr[i].photos[0] ? this.poiArr[i].photos[0].url : '' : ''
      }
      this.mapObj.setFitView()
    },
    // 添加marker&infowindow
    addmarker(i, d) {
      var lngX = d.location.getLng()
      var latY = d.location.getLat()
      var markerOption = {
        map: this.mapObj,
        position: new AMap.LngLat(lngX, latY)
      }
      var mar = new AMap.Marker(markerOption)
      this.marker.push(new AMap.LngLat(lngX, latY))
      this.checkedAddress.push(d)
      var infoWindow = new AMap.InfoWindow({
        content:
          '<h3>' +
          d.name +
          '</h3>' +
          this.TipContents(d.name, d.address) +
          `<p>电话：${d.tel}</p>`,
        size: new AMap.Size(300, 0),
        autoMove: true,
        offset: new AMap.Pixel(0, -30)
      })
      this.windowsArr.push(infoWindow)
      console.log('this.windowsArr')
      var _this = this
      var aa = (e) => {
        var obj = mar.getPosition()
        this.map = obj // 这里保存的地址经纬度
        this.adderssPush = d.name + d.address // 提交的位置
        this.lnglatXY = [this.map.lng, this.map.lat] // 提交的经纬度
        console.log('this.map')
        console.log(this.adderssPush + ' 2')
        window.removeEventListener('click', _this.demo)
        infoWindow.open(_this.mapObj, obj)
        window.addEventListener('click', _this.demo)
      }
      AMap.event.addListener(mar, 'click', aa)
    },
    TipContents(name, address) {
      // 窗体内容
      if (
        name == '' ||
        name == 'undefined' ||
        name == null ||
        name == ' undefined' ||
        typeof name === 'undefined'
      ) {
        type = '暂无'
      }
      if (
        address == '' ||
        address == 'undefined' ||
        address == null ||
        address == ' undefined' ||
        typeof address === 'undefined'
      ) {
        address = '暂无'
      }
      var str = `地址：${address}`
      return str
    },
    // demo(e, checkedAddress) {
    //   if (e.target.id === `me`) {
    //     e.stopPropagation()
    //     // this.map
    //     // this.address
    //   }
    // },
    // saveAddress() {
    //   console.log(1)
    //   alert('我已经保存地址了')
    // },

    openMarkerTipById1(pointid, thiss) {
      // 根据id 打开搜索结果点tip
      thiss.currentTarget.style.background = '#CAE1FF'
      this.selectedIndex = pointid
      this.map = this.marker[pointid]
      const obj = this.checkedAddress[pointid]
      this.adderssPush = obj.name + obj.address // 提交的位置
      this.lnglatXY = [this.map.lng, this.map.lat] // 提交的经纬度
      window.removeEventListener('click', this.demo)
      this.windowsArr[pointid].open(this.mapObj, this.marker[pointid])
      window.addEventListener('click', this.demo)
      // console.log(this.map)
    },
    onmouseout_MarkerStyle(pointid, thiss) {
      // 鼠标移开后点样式恢复
      thiss.currentTarget.style.background = ''
    },
    // 点击搜索
    search() {
      this.windowsArr = []
      this.marker = []
      this.mapObj = {}
      this.checkedAddress = []
      this.mapInit()
      this.placeSearch(this.address)
    }
    // ==========================================搜索功能块==========================================
  }
}
</script>
<style lang='scss' scoped>
	/* .mymap {
		width: 760px;
		height: 482px;
		background-color: #ffffff;
	} */
  .map{
    width: 100%;
  }
#iCenter {
  height: 300px;
  position: relative;
  display: flex;
  flex: 1;
}
#result {
  width: 210px;
  position: relative;
  height: 500px;
  overflow-y: scroll;
  border-right: 1px solid #ccc;
}
.amap_lib_placeSearch {
  height: 100%;
  overflow-y: scroll;
}
.amap_lib_placeSearch_page {
  position: absolute;
  bottom: 0;
  width: 100%;
}
#me {
  border-top: 1px solid #ccc;
  margin-top: 6px;
  padding-top: 6px;
  width: 100%;
  display: block;
}
.amap_lib_placeSearch .poibox {
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  padding: 5px 0 5px 10px;
  position: relative;
  min-height: 35px;
}
.amap_lib_placeSearch_poi {
  background: url(https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png)
    no-repeat;
  height: 31px;
  width: 19px;
  cursor: pointer;
  left: -1px;
  text-align: center;
  color: #fff;
  font: 12px arial, simsun, sans-serif;
  padding-top: 3px;
}
.amap_lib_placeSearch .poibox .poi-title {
  margin-left: 25px;
  font-size: 13px;
  overflow: hidden;
}
.amap_lib_placeSearch .amap_lib_placeSearch_poi {
  position: absolute;
}
.amap_lib_placeSearch .poibox .poi-info {
  word-break: break-all;
  margin: 0 0 0 25px;
  overflow: hidden;
}
.amap_lib_placeSearch .poibox .poi-info p {
  color: #999;
  font-family: Tahoma;
  line-height: 20px;
  font-size: 12px;
}
.amap_lib_placeSearch .poibox .poibox-icon {
  margin-left: 7px;
  margin-top: 4px;
}
.amap-pl-pc .poi-img {
  float: right;
  margin: 3px 8px 0;
  width: 90px;
  height: 56px;
  overflow: hidden;
}
.poibox {
  cursor: pointer;
}
.poibox:hover {
  background: #f6f6f6;
}
.selected {
  background-image: url(https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png) !important;
}
.amap-info-content {
  width: 200px !important;
}
</style>
