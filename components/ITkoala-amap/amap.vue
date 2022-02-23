<template>
	<view class="amap-container">
		<view :prop="list" :change:prop="amap.updateEcharts" id="amap"></view>
		<!-- <view class="">当前点击的对象的index值为：{{ dataIndex }}</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		props: {
			markerLists: {
				type: Array,
				default: []
			}
		},
		watch: {
			markerLists(newVal) {
				this.$nextTick(function() {
					console.log('更新')
					this.list = newVal
				})
			}
		},
		methods: {
			//地图点击回调事件
			onViewClick(params) {
				this.dataIndex = params.dataIndex
				uni.$emit('markerId', params.dataIndex)
			}
		}
	}
</script>

<script module="amap" lang="renderjs">
	import config from './config.js'

	const selectedStart = 'static/ITkoala-amap/selectedStart.png' //选中的图片

	export default {
		data() {
			return {
				map: null,
				ownerInstanceObj: null //service层对象
			}
		},
		created() {

		},
		mounted() {
			if (typeof window.AMap === 'function') {
				this.initAmap()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=' + config.WEBAK
				script.onload = this.initAmap.bind(this)
				document.head.appendChild(script)
			}


		},
		methods: {
			initAmap() {
				this.map = new AMap.Map('amap', {
					resizeEnable: true,
					// center: [116.397428, 39.90923],
					layers: [ //使用多个图层
						// new AMap.TileLayer.Satellite() //使用卫星图
					],
					zooms: [4, 18], //设置地图级别范围
					zoom: 10
				})
				this.initMarkers()

			},
			//初始化标记点
			initMarkers() {
				let prevMarker = null
				let prevIcon = null
				console.log(this.list)
				this.list.forEach((item, index) => {
					if (!!item.icon) {
						//添加点标记
						let marker = new AMap.Marker({
							position: new AMap.LngLat(item.lng, item.lat),
							offset: new AMap.Pixel(-13, -30),
							icon: new AMap.Icon({
								// image: item.icon,
								size: new AMap.Size(item.width, item.height), //图标大小
								imageSize: new AMap.Size(item.width, item.height),
								image: 'https://bpic.588ku.com/element_origin_min_pic/19/04/10/cc6d9f4adf238c4687e6674b24816796.jpg', // Icon的图像
								// imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
								// imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
							}),
							label: item.title,
							snippet: item.title,
							visible: true,
						})
						marker.setLabel({
							content: item.title,
							offset: new AMap.Pixel(20, 20),
							// direction: 'top' //设置文本标注方位
						})
						marker.on('click', (e) => {
							// if (!!prevMarker) {
							// 	prevMarker.setIcon(prevIcon)
							// }
							// prevIcon = item.icon
							// prevMarker = marker
							// marker.setIcon(selectedStart)
							this.dataIndex = index
							this.onClick(null, this.ownerInstanceObj)
						})

						this.map.add(marker)
					}

				})
				this.map.setFitView();
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				this.initMarkers()
				this.ownerInstanceObj = ownerInstance
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					dataIndex: this.dataIndex
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.amap-container {
		width: 100%;
		height: 100%;
	}

	#amap {
		width: 100%;
		height: 100%;
	}

	.infoWindow-wrap {
		margin-left: 50px;
		color: #f00;
	}
</style>
