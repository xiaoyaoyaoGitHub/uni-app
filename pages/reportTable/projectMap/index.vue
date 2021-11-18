<template>
	<view >
			<view class="search-box search-box_sticky">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72"  :show-action="false" @change="search"
					bg-color="#f0f2f6" shape="square">
				</u-search>
			</view>
        <map style="width: 100%; height: 400px;" :latitude="latitude" :scale="scale" :longitude="longitude" :markers="markers">
        </map>
	</view>
</template>
<script>
	import {
    getMapInfoList
	} from '@/api/projectReport'
	export default {
		data() {
			return {
        scale: 11,
        list: [],
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 100,
          sort: 'desc',
          sidx: '',
          json: ''
        },

        id:1, // 使用 marker点击事件 需要填写id
        title: 'map',
        latitude: 42.028356,
        longitude: 121.67645,
        markers: [{
          id: 0,
          title: '哈哈哈',
          latitude: 39.909,
          longitude: 116.39742,
          width: 30,
          height: 30,
          // label: {
          //   content: "equipment.code"
          // },
          iconPath: '../../../static/map.png'
        }]
			}
		},
    onLoad() {
      // uni.$on('refresh', () => {
      // 	this.list = [];
      // 	this.mescroll.resetUpScroll();
      // })
      this.initData()
    },
		methods: {
		  initData(){
        getMapInfoList(this.listQuery).then(res => {
          this.list = res.data.list
          this.queryConditionData = res.data
          this.addMarkers()
        })
      },
      addMarkers(){
		    this.markers = this.list.map(item => {
          let location = JSON.parse(item.pj_base_project_position)
		      return {
            id: item.id,
            title: item.pj_base_project_name,
            latitude: location.latitude,
            longitude: location.longitude,
            width: 30,
            height: 30,
            iconPath: '../../../static/map.png',
            callout:{//自定义标记点上方的气泡窗口 点击有效
              content:item.pj_base_project_name,//文本
              color:'#ffffff',//文字颜色
              fontSize:14,//文本大小
              borderRadius:2,//边框圆角
              bgColor:'#00c16f',//背景颜色
              display:'ALWAYS',//常显
            }
          }
        })

      }
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}
</style>
