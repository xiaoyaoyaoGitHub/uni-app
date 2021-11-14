<template>
	<view class="projects-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" :sticky="true" :up="upOption" :bottombar="false">
			<view class="banner">
				<view class="banner-item">
					<view class="">
						计划投资(万元)
					</view>
					<view class="banner-volume">
					    <u-icon name="rmb" color="#fdf1ff" size="26"></u-icon>{{totalPlan}}
					</view>
				</view>
				<view class="banner-item">
					<view class="">
						累计投资(万元)
					</view>
					<view class="banner-volume">
					   <u-icon name="rmb" color="#fdf1ff" size="26"></u-icon>{{totalActual}}
					</view>
				</view>
				<view class="banner-item">
					<view>
						本年度计划(万元)
					</view>
					<view class="banner-volume">
					    <u-icon name="rmb" color="#fdf1ff" size="26"></u-icon>{{yearPlan}}
					</view>
				</view>
			</view>
			<view style="margin-top: 20rpx;">
				<u-grid :col="3" :border="false">
					<u-grid-item v-for="(item, index) in actionList" :key="index" @click="handleClick(item)">
						<u-badge :count="item.count" :offset="[20, 30]"></u-badge>
						<u-icon :name="item.icon" :size="36"></u-icon>
						<view class="grid-text">{{item.name}}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view style="margin-top: 10rpx;" class="replyList">
				<u-tag text="我关注的项目" mode="dark" type="primary" shape="circle"/>
				<template v-if="list.length > 0">
					<uni-list>
						<view v-for="(item, index) in list" :key="index">
							<uni-list-item :title="item.pj_base_project_name" :note="item.pj_base_project_create_date" show-arrow="true" @click="toNotificationDetail(item)" link>
							</uni-list-item>
						</view>
					</uni-list>
				</template>
				<template v-else> 
				  <view class="empty-text">
					  暂无数据
				  </view>
				</template>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import IndexMixin from './mixin.js'
	import {
		mapGetters
	} from "vuex"
	import {
		getModelListViaCode
	} from '@/api/apply/visualDev'
	import { moduleCodes, formatNumber, getCurrentUser } from '@/api/common'
	export default {
		mixins: [MescrollMixin, IndexMixin],
		data() {
			return {
				keyword: '',
				list: [],
				upOption: {
					use: false
				},
				actionList: [],
				userInfo: {},
				totalPlan: '',
				totalActual: '',
				yearPlan: '',
				dicList: []
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.dicList = uni.getStorageSync('dictionaryList') || []
			uni.$on('updateList', data => {})
			this.loadProjects()
		},
		onUnload() {
			uni.$off('updateList')
		},
		methods: {
			loadProjects() {
				const query = {
					currentPage: 1,
					pageSize: 1000
				}
				getModelListViaCode(moduleCodes.AppProjectList, query).then(res => {
					this.list = []
					this.actionList = []
					this.dicList;
					//储备，在建，运营
					let count = [0,0,0]
					let invest = [0,0,0]
					for(let item of res.data.list) {
						if(item.pj_base_project_phase === '储备') {
							count[0] ++
						} else if (item.pj_base_project_phase === '在建') {
							count[1] ++
						} else if (item.pj_base_project_phase === '运营') {
							count[2] ++
						}
						if(item.pj_fund_invest_total) {
							invest[0] += parseFloat(item.pj_fund_invest_total)
						}
						if(item.pj_fund_invest_actual) {
							invest[1] += parseFloat(item.pj_fund_invest_actual)
						}
						if(item.pj_fund_invest_currentyear) {
							invest[2] += parseFloat(item.pj_fund_invest_currentyear)
						}
						if(item.concerns && item.concerns.includes(this.userInfo.userAccount + ',')) {
							this.list.push(item)
						}
					}
					this.totalPlan = formatNumber(invest[0])
					this.totalActual = formatNumber(invest[1])
					this.yearPlan = formatNumber(invest[2])
					let storeAction = {name:"储备项目",icon:"bag", count: count[0], code:"newstoreproject"}
					this.actionList.push(storeAction)
					let buildingAction = {name:"在建项目",icon:"play-circle", count: count[1], code:"newongoingproject"}
					this.actionList.push(buildingAction)
					let operaAction = {name:"运营项目",icon:"rmb-circle", count: count[2], code:"newliveproject"}
					this.actionList.push(operaAction)
				}).catch(err => {})
			},
			toDetail(item) {
				alert(item)
			},
			openPage(path) {
				if (!path) return
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f0f2f6;
	}
	.banner {
		background-color: #427fed;
		height: 200rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #d7d7d7;
		font-size: 24rpx;
		.banner-item:nth-of-type(n+2) {
			margin-left: 60rpx;
		}
		.banner-volume {
			color: #FFFFFF;
			font-size: 32rpx;
			margin-top: 20rpx;
		}
	}
    .grid-text {
		font-size: 16rpx;
		margin-top: 6rpx;
		color: $u-type-info;
	}
	.u-icon {
		color: blue;
	}
	.projects-v {
		.search-box_sticky {
			margin-bottom: 20rpx;
		}
		.replyList {
			padding: 0 32rpx;
			background-color: #fff;
			.empty-text {
				margin-top: 30rpx;
				color: #88d7fa;
				font-size: 32rpx;
				height: 60rpx;
				text-align: center;
			}
		}
	}
</style>

