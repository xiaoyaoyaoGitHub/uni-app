<template>
	<view class="allApplications-v">
		<view class="allApplications-hd u-flex">
			<text>已添加(12)</text>
			<view>
				<text class="item-icon"/>
			</view>
			<view class="u-bg-gray more">...</view>
		</view>
		<view class="allApplications-tabs">
			<view class="u-m-t-24 u-font-36">全部应用</view>
			<u-sticky>
				<u-tabs :list="list" :current="current" @change="change" name='fullName' inactive-color="#999999"></u-tabs>
			</u-sticky>
		</view>
		<view class="allApplications-list u-m-t-20" v-for="(item,i) in flowEngineList" :key="i">
			<view v-if="i==current">
				<view v-for="(child,ii) in item.children" class="u-flex allApplications-childList u-p-t-28 u-p-b-28" :key="ii">
					<view class="txtBox u-flex u-flex-1">
						<text class="u-font-40 item-icon txtIco" :class="child.icon"
							:style="{'background':child.iconBackground|| '#008cff'}" />
						<text class="u-font-32 item-text u-m-l-10">{{child.fullName}}</text>
					</view>
					<view class="btnBox">
						<u-button size="medium" :custom-style="customStyle" :type="themeColor" :plain="true" @click="handel(themeColor)">{{btnTxt}}
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDictionaryDataAll
	} from '@/api/common.js'
	import {
		FlowEngineListAll
	} from '@/api/workFlow/flowEngine'
	export default {
		data() {
			return {
				list: [{
					fullName: '常用应用'
				}, ],
				current: 0,
				categoryList: [],
				flowEngineList: [],
				customStyle: {
					width: "64px",
					fontSize: "12px",
					height: '30px'
				},
				themeColor: 'primary',/* primary = 添加 error = 移除*/
				btnTxt: '添加',/* 移除 */
				
			}
		},
		onLoad() {
			this.getDictionaryData()
		},
		methods: {
			getDictionaryData() {
				this.$store.dispatch('base/getDictionaryData', {
					sort: 'WorkFlowCategory'
				}).then(res => {
					this.categoryList = res
					this.list = this.list.concat(this.categoryList);
					this.getFlowEngineList()
				})
			},

			getFlowEngineList() {
				FlowEngineListAll().then(res => {
					const list = res.data.list;
					this.flowEngineList = this.list;
					for (let i = 0; i < this.flowEngineList.length; i++) {
						var child = list.filter(o => this.flowEngineList[i].enCode == o.category);
						let count = child.length;
						this.$set(this.flowEngineList[i], 'children', child);
					}
					console.log(this.flowEngineList)
				})
			},
			handel(type){
				
			},
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss">
	page {}

	.allApplications-v {
		padding: 0 16rpx;

		.allApplications-hd {
			width: 100%;
			border-bottom: 1px solid #ECECEC;
			padding: 24rpx 0rpx;
			.more{
				width: 48rpx;
				height: 48rpx;
				background-color: #C6C6C6;
				border-radius: 10rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 20rpx;
				font-size: 40rpx;
			}
		}

		.allApplications-list {
			.allApplications-childList {
				justify-content: space-between;
			}

			.txtBox {
				color: #000000;

				.txtIco {
					width: 88rpx;
					height: 88rpx;
					margin-bottom: 8rpx;
					line-height: 88rpx;
					text-align: center;
					border-radius: 20rpx;
					color: #FFFFFF;
				}
			}

			.btnBox {}
		}
	}
</style>
