<template>
	<view class="contacts-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false">
			<view class="search-box search-box_sticky u-flex u-border-bottom">
				<u-search class="search-input" placeholder="请输入项目名称搜索" v-model="keyword" height="72" :show-action="true"
					:action-style="{color:'#071127',lineHeight:48 + 'rpx', fontSize:32 + 'rpx'}" @change="search"
					bg-color="#F7F8FA" placeholder-color="#C1C3C9" search-icon-color="#C1C3C9" shape="square">
				</u-search>
			</view>
			<view class="u-flex selects u-border-bottom u-row-left">
				<view class="select">
					<u-button data-index="0" class="selectBtn" :class="{active: selectType === 'auditSelect'}"
						data-type="auditSelect" @click="showSelect">
						{{auditSelectCurrent.label}}
					</u-button>
					<u-select v-model="auditSelectShow" @confirm="selectConfirm" :list="auditLists">审核状态
					</u-select>
				</view>
				<view class="select">
					<u-button data-index="1" class="selectBtn" :class="{active: selectType === 'tradeSelect'}"
						data-type="tradeSelect" @click="showSelect">
						{{tradeSelectCurrent.label}}
					</u-button>
					<u-select v-model="tradeSelectShow" :list="tradelists" @confirm="selectConfirm">行业</u-select>
				</view>
				<view class="select">
					<u-button data-index="2" class="selectBtn" data-type="amountSelect"
						:class="{active: selectType === 'amountSelect'}" @click="showSelect">
						{{!amount.min && !amount.max ? '总金额' : amount.min + '-' + amount.max}}
					</u-button>
					<u-popup v-model="amountSelectShow" mode="bottom">
						<view class="amount-scope">
							<u-field v-model="amount.min" type="number" label="最小值" placeholder="请输入最小金额">
							</u-field>
							<u-field v-model="amount.max" type="number" label="最大值" placeholder="请输入最大金额">
							</u-field>
							<u-button class="u-m-t-20" type="primary" @click="amountSelectShow = false">确定</u-button>
						</view>
					</u-popup>
					<!-- <u-select v-model="amountSelectShow" @confirm="selectConfirm"> 总投资</u-select> -->
				</view>
				<!-- <view class="select">
					<u-button data-index="3" class="selectBtn" :class="{active: selectType === 'departSelect'}"
						data-type="departSelect" @click="showSelect">
						部门
					</u-button>
					<u-select v-model="departSelectShow" :list="list" @confirm="selectConfirm"></u-select>
				</view> -->
			</view>
			<view class="lists">
				<view class="project-item" @click="toNotificationDetail" v-for="item in [1,2,3,4,5]">

					<view class="project-name u-border-bottom">
						<span class="name">阜蒙县佛寺水库库区清淤工程项目</span>
						<span class="status fail u-text-center">审核状态</span>
					</view>
					<view class="project-info">
						<view class="all">
							<span class="icon"></span>
							行业：<span class="amount">4500万</span>
						</view>
						<view class="year">
							<span class="icon"></span>
							总投资：<span class="amount">4500万</span>
						</view>
						<view class="month">
							<span class="icon"></span>
							部门：<span class="amount">4500万</span>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import {
		getImUser,
		moduleCodes,
		moduleTitle
	} from '@/api/common.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				downOption: {
					use: true,
					auto: true
				},
				upOption: {
					use: true,
					page: {
						num: 0,
						size: 20,
						time: null
					},
					empty: {
						use: true,
						icon: "static/nodata.png",
						tip: "暂无数据",
						fixed: true,
						top: "200rpx",
					},
					textNoMore: '没有更多数据',
				},
				keyword: '',
				selectType: '',
				auditSelectCurrent: {
					value: '',
					label: '审核状态'
				},
				tradeSelectCurrent: {
					value: '',
					label: '行业'
				},
				amount: {
					min: '',
					max: ''
				},
				auditSelectShow: false,
				tradeSelectShow: false,
				amountSelectShow: false,
				departSelectShow: false,
				auditLists: [{
						value: 1,
						label: '未提交'
					},
					{
						value: 1,
						label: '等待审核'
					},
					{
						value: 2,
						label: '审核通过'
					},
					{
						value: 3,
						label: '审核驳回'
					}
				],
				tradelists: [{
						value: '1',
						label: '农林牧鱼'
					},
					{
						value: '1',
						label: '工业'
					},
					{
						value: '1',
						label: '基础设施'
					},
					{
						value: '1',
						label: '服务业'
					},
					{
						value: '1',
						label: '工业'
					},
					{
						value: '1',
						label: '基础设施'
					},
					{
						value: '1',
						label: '服务业'
					},
					{
						value: '1',
						label: '高新技术'
					},
					{
						value: '1',
						label: '生态环保'
					},
					{
						value: '1',
						label: '社会事业'
					},
					{
						value: '1',
						label: '其他行业'
					}
				]

			}
		},
		onLoad(param) {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.dicList = uni.getStorageSync('dictionaryList') || []
			let title = "项目列表"
			let phase = param.phase
			uni.setNavigationBarTitle({
				title: moduleTitle[phase]
			})
			// switch (phase) {
			// 	title: ''
			// }
			// if (phase === moduleCodes.StorePhaseProject) {
			// 	title = "储备项目"
			// } else if (phase === moduleCodes.BuildingPhaseProject) {
			// 	title = "在建项目"
			// } else if (phase === moduleCodes.OperationPhaseProject) {
			// 	title = "竣工项目"
			// } else if ()

		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		methods: {
			upCallback(page) {
				console.log('up')
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword
				}
				getImUser(query, {
					load: page.num == 1
				}).then(res => {
					// this.mescroll.endSuccess(0);
					// if (page.num == 1) this.list = [];
					// const list = res.data.list;
					// this.list = this.list.concat(list);
					this.mescroll.endSuccess(20, true)
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			downCallback() {
				console.log('down')
				this.mescroll.endSuccess(0);
			},
			toNotificationDetail(item) {
				uni.navigateTo({
					url: '/pages/project/detail/index'
				})
			},
			search() {
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/message/userDetail/index?userId=' + id,
				})
			},

			selectConfirm(e) {
				// console.log(this.selectType + 'Current')
				this[this.selectType + 'Current'] = e[0]
			},
			showSelect(e) {
				console.log('click')
				console.log(e);
				const {
					dataset: {
						type
					} = {}
				} = e.currentTarget || {}
				this.selectType = type;
				const typeName = type + 'Show';
				console.log(typeName)
				this[typeName] = true
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F6F7;

		.contacts-v {
			.search-box {
				.search-input {
					width: 606rpx;
				}

				.search-btn {
					padding: 0 16rpx;
					font-size: 32rpx;
					line-height: 48rpx;
					color: #071127;

					&:after {
						border: none;
					}
				}
			}

			.selects {
				background: #fff;
				padding: 20rpx 32rpx;

				.select {
					margin-right: 19rpx;

					.selectBtn {
						background: #F7F6F6;
						position: relative;
						font-size: 28rpx;
						line-height: 40rpx;
						color: #2C3548;
						padding: 12rpx 58rpx 12rpx 28rpx;
						height: 64rpx;
						border-radius: 0;

						&:after {
							border: none;
						}

						&:before {
							content: '';
							position: absolute;
							right: 28rpx;
							top: 0;
							bottom: 0;
							margin: auto;
							display: block;
							width: 0;
							height: 0;
							border: 8rpx solid #DCDEE0;
							border-top-color: transparent;
							border-right-color: transparent;
							transform: rotateZ(-45deg) translateY(-50%);
						}

						&.active {
							background: #F2F6FF;
							position: relative;

							&:before {
								border: 8rpx solid #2566F2;
								border-top-color: transparent;
								border-right-color: transparent;
								transform: rotateZ(-225deg) translateY(-25%);
							}
						}
					}
				}
			}

			.lists {
				padding: 0 24rpx;

				.project-item {
					background: #fff;
					padding: 0 32rpx;
					margin-top: 20rpx;
					background-image: url(../../../static/list_bg.png);
					background-size: 97rpx 71rpx;
					background-position: right bottom;
					background-repeat: no-repeat;

					.project-name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0 13rpx;

						span.name {
							flex: 0 0 499rpx;
							width: 499rpx;
							display: block;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 32rpx;
							line-height: 44rpx;
							color: #071127;
							font-weight: bolder;
						}

						span.status {
							// flex: 0 0 130rpx;
							flex: 0 0 72rpx;
							padding: 3rpx 16rpx;
							font-size: 24rpx;
							line-height: 32rpx;
							color: rgba(50, 50, 51, 0.25);
							border-radius: 20rpx;
							font-weight: normal;
							white-space: nowrap;

							&.wait {
								color: #ED4F00;
								background: rgba(242, 167, 31, 0.13);
							}

							&.unUpdate {
								color: #363636;
								background: rgba(159, 159, 159, 0.13);
							}

							&.success {
								color: #152810;
								background: rgba(213, 244, 207, 0.3);
							}

							&.fail {
								color: #8F1600;
								background: rgba(244, 213, 207, 0.6);
							}
						}
					}

					.project-info {
						display: flex;
						justify-content: flex-starts;
						align-items: center;
						flex-wrap: wrap;
						padding: 2rpx 0 32rpx;
						border-radius: 4rpx;

						&>view {
							flex: 1 1 50%;
							text-align: left;
							margin-top: 20rpx;
							padding-left: 36rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5E6573;

							&>span.amount {
								color: #071127;
							}

							&:nth-of-type(2n) {
								border-left: 1px solid #D8D8D8;
								padding-left: 65rpx;
								background: url(../../../static/info_icon2.png) no-repeat 29rpx center;
								background-size: 28rpx;
							}

							&:nth-of-type(1) {
								background: url(../../../static/info_icon1.png) no-repeat left center;
								background-size: 28rpx;
							}

							&:nth-of-type(3) {
								background: url(../../../static/info_icon3.png) no-repeat left center;
								background-size: 28rpx;
							}
						}
					}
				}
			}

			.amount-scope {
				padding: 20rpx;
			}

		}
	}
</style>
