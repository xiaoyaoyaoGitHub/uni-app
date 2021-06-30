<template>
	<view class="features-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false">
			<view class="features-hd u-flex">
				<u-dropdown>
					<u-dropdown-item v-model="sortValue" title="排序" :options="options1"></u-dropdown-item>
					<u-dropdown-item title="筛选" v-model="screenAalue">
						<view class="slot-content">
							<!-- <view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view>
							<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view>
							<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view>
							<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view>
							<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view>
							<view class="u-text-center u-content-color u-m-t-20 u-m-b-20">其他自定义内容</view> -->
						</view>
						<view class="buttom-box">
							<u-button class="buttom-btn">重置</u-button>
							<u-button class="buttom-btn" type="primary">检索</u-button>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>

			<view class="features-listBox u-p-l-16 u-p-r-16">
				<view class="features-list u-m-t-20" v-for="(item,index) in list" :key='index' @click="">
					<u-swipe-action :index="index" :show="item.show" @click="handleClick" @open="open"
						:options="options" @content-click="goDetail(item.id)">
						<view class="features-item u-flex" v-for="(items,i) in item">
							<text>{{items.label+':'}}</text>
							<text class="u-p-l-16">{{items.value}}</text>
						</view>
					</u-swipe-action>
				</view>
			</view>
		</mescroll-body>
		<view class="com-addBtn" @click="goDetail()">
			<u-icon name="plus" size="60" color="#fff" />
		</view>
	</view>
</template>

<script>
	import {
		config,
		list,
		delList
	} from '@/api/apply/features.js'
	import resources from '@/libs/resources.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				sortValue: 1,
				screenAalue: 2,
				options1: [{
						label: '降序',
						value: 1,
					},
					{
						label: '升序',
						value: 2,
					},

				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
				downOption: {
					use: true,
					auto: true
				},
				upOption: {
					page: {
						num: 0,
						size: 20,
						time: null
					},
					empty: {
						use: true,
						icon: resources.message.nodata,
						tip: "暂无数据",
						fixed: true,
						top: "300rpx",
					},
					textNoMore: '没有更多数据',
				},
				keyword: '',
				list: [],
				userInfo: {},
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				id: '',
				data: {
					columnData: {},
					formData: [],
					tables: []
				},
				list: [],
				sortData: [],
				filter: [],
				configData: []
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.init();
			this.eventHub.$on('refresh', () => {
				this.list = [];
				this.mescroll.resetUpScroll();
			})
		},

		onUnload() {
			this.eventHub.$off('refresh')
		},
		methods: {
			init() {
				config(this.id).then(res => {
					console.log(res)
					this.flowEngine(res.data)

				})
			},

			/* 初始化处理 */
			flowEngine(data) {
				let configList = JSON.parse(data.columnData);
				console.log(configList)
				/* 排序赋值 */
				this.sortData = configList.sortList
				/* 筛选赋值 */
				this.filter = configList.searchList
				this.configData = configList.columnList
			},
			closeDropdown() {
				this.$refs.uDropdown.close();
			},
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
				
			},
			handleClick(index) {
				const item = this.list[index];
				delList(this.id,item[0].id).then(res => {
					this.$u.toast(res.msg)
					this.list.splice(index, 1)
					this.list[index].show = false;
				})
			},
			goDetail(id) {
				const url = './form?type=' + this.current + (id ? '&id=' + id : '')
				uni.navigateTo({
					url: url
				})
			},
			/* 渲染列表页 */
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword,
					featuresId: this.id
				}
				list(query, {
					load: page.num == 1
				}).then(res => {
					this.mescroll.endSuccess(res.data.list.length);
					if (page.num == 1) this.list = [];
					let data = res.data.list.map(o =>({
						show: false,
						...o
					}));
					for (let j = 0; j < data.length; j++) {
						let _showList = [];
						let val = data[j];
						console.log(val)
						for (let i = 0; i < this.configData.length; i++) {
							let prop = this.configData[i].prop;
							let label = this.configData[i].label;
							let _show = {};
							_show.id = val.id
							_show.prop = prop
							_show.label = label
							if (val[prop]) _show.value = val[prop]
							_showList.push(_show)
						}
						this.list.push(_showList)
					}
				}).catch(() => {
					this.mescroll.endErr();
				})
			},



			goDetail(id) {
				let url = './form?featuresId=' + this.id
				if (this.scanType) {
					url = './form?featuresId=' + this.id + '&type=' + this.scanType
				}
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.buttom-box {
		background-color: #fff;
		display: flex;
		width: 100%;
		height: 88rpx;
		box-shadow: 0 -2rpx 8rpx #e1e5ec;
		z-index: 20;

		.buttom-btn {
			width: 100%;
			/* #ifndef MP */
			height: 88rpx !important;
			line-height: 88rpx !important;
			border-radius: 0 !important;

			&::after {
				border: none !important;
			}

			/* #endif */
			/* #ifdef MP */
			.u-btn {
				width: 100%;
				height: 88rpx !important;
				line-height: 88rpx !important;
				border-radius: 0 !important;

				&::after {
					border: none !important;
				}
			}

			/* #endif */
		}

		;
	}

	.features-v {
		.features-hd {
			width: 100%;
			background-color: #FFFFFF;
			justify-content: space-evenly;
			color: #999999;
			box-shadow: 2px 2px 5px #c4c4c4
		}

		.features-listBox {
			.features-list {
				background-color: #FFFFFF;

				.features-item {
					padding: 20rpx 32rpx;
					color: #9A9A9A;
				}
			}
		}
	}
</style>
