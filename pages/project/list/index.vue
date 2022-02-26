<template>
	<view class="contacts-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false">
			<view class="search-box search-box_sticky u-flex u-border-bottom">
				<u-search class="search-input" placeholder="请输入项目名称搜索" v-model="keyword" height="72" :show-action="true"
					:action-style="{color:'#071127',lineHeight:48 + 'rpx', fontSize:32 + 'rpx'}" @custom="search"
					bg-color="#F7F8FA" placeholder-color="#C1C3C9" search-icon-color="#C1C3C9" shape="square">
				</u-search>
			</view>
			<view class="u-flex selects u-border-bottom u-row-left">
				<view class="select">
					<u-button data-index="0" class="selectBtn" :class="{active: selectType === 'auditSelect'}"
						data-type="auditSelect" @click="showSelect">
						{{auditSelectCurrent.value ? auditSelectCurrent.label : '审核状态'}}
					</u-button>
					<u-select v-model="auditSelectShow" @confirm="selectConfirm" :list="auditLists">审核状态
					</u-select>
				</view>
				<view class="select">
					<u-button data-index="1" class="selectBtn" :class="{active: selectType === 'tradeSelect'}"
						data-type="tradeSelect" @click="showSelect">
						{{tradeSelectCurrent.value ? tradeSelectCurrent.label : '行业'}}
					</u-button>
					<u-select value-name="id" label-name="fullName" v-model="tradeSelectShow" :list="tradelists"
						@confirm="selectConfirm">行业</u-select>
				</view>
				<view class="select">
					<u-button data-index="2" class="selectBtn" data-type="amountSelect"
						:class="{active: selectType === 'amountSelect'}" @click="showSelect">
						{{!amount.min && !amount.max ? '总投资（万元）' : amount.min + '-' + amount.max}}
					</u-button>
					<u-popup v-model="amountSelectShow" mode="bottom">
						<view class="amount-scope">
							<u-field v-model="amount.min" type="number" label="最小值" placeholder="请输入最小金额(万元)">
							</u-field>
							<u-field v-model="amount.max" type="number" label="最大值" placeholder="请输入最大金额(万元)">
							</u-field>
							<u-button class="u-m-t-20" type="primary" @click="inputConfirm">确定</u-button>
						</view>
					</u-popup>
					<!-- <u-select v-model="amountSelectShow" @confirm="selectConfirm"> 总投资</u-select> -->
				</view>
				<view class="select">
					<u-button data-index="3" class="selectBtn" :class="{active: selectType === 'departSelect'}"
						data-type="departSelect" @click="showSelect">
						{{departSelectCurrent.value ? departSelectCurrent.label : '部门'}}
					</u-button>
					<u-select value-name="id" label-name="fullName" v-model="departSelectShow" :list="departlists"
						@confirm="selectConfirm"></u-select>
				</view>
			</view>
			<view class="lists">
				<view class="project-item" data-id="item.id" @click="() => toNotificationDetail(item.id)"
					v-for="item in projectLists">

					<view class="project-name u-border-bottom">
						<span class="name">{{item.pj_base_project_name}}</span>
						<span
							:class="{'unUpdate': item.pj_review_status === '未提交', 'wait': item.pj_review_status === '等待审核','success': item.pj_review_status === '审核通过', 'fail': item.pj_review_status === '审核驳回'}"
							class="status u-text-center">{{item.pj_review_status}}</span>
					</view>
					<view class="project-info">
						<view class="all">
							<span class="icon"></span>
							行业：<span class="amount">{{item.pj_base_business_category}}</span>
						</view>
						<view class="year">
							<span class="icon"></span>
							总投资：<span class="amount">{{item.pj_fund_invest_total.split('.')[0]}}万</span>
						</view>
						<view class="month">
							<span class="icon"></span>
							部门：<span class="amount">{{item.pj_base_region}}</span>
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
		moduleTitle,
		getDictionaryDataAll,
		getDictionaryDataSelector,
		getDepartmentSelector
	} from '@/api/common.js'
	import {
		getModelList
	} from "@/api/apply/visualDev.js"
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
				pageType: '',
				auditSelectCurrent: {
					value: '',
					label: '审核状态'
				},
				tradeSelectCurrent: {
					value: '',
					label: '行业'
				},
				departSelectCurrent: {
					value: '',
					label: '部门'
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
						value: '',
						label: '全部'
					}, {
						value: '0',
						label: '未提交'
					},
					{
						value: '1',
						label: '等待审核'
					},
					{
						value: '2',
						label: '审核通过'
					},
					{
						value: '3',
						label: '审核驳回'
					}
				],
				tradelists: [],
				departlists: [],
				projectLists: []
			}
		},
		onLoad(param) {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.dicList = uni.getStorageSync('dictionaryList') || []
			let title = "项目列表"
			let phase = param.phase
			this.pageType = phase
			uni.setNavigationBarTitle({
				title: moduleTitle[phase]
			})
			this.getDictionarySelects();
			this.getDepartmentSelects()

		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		methods: {
			upCallback(page) {
				// let query = {
				// 	currentPage: page.num,
				// 	pageSize: page.size,
				// 	keyword: this.keyword,
				// 	pj_base_business_category: this.tradeSelectCurrent.value || '',
				// 	pj_review_status: this.auditSelectCurrent.value || '',
				// 	pj_base_region: this.departSelectCurrent.value || ''
				// }

				let query = {
					currentPage: page.num,
					pageSize: page.size,
					pj_fund_invest_total: [Number(this.amount.min ? this.amount.min : 500), Number(this.amount.max ?
						this.amount.max : 5000000)],
				};
				if (this.keyword) {
					query.keyword = this.keyword
				}
				if (this.tradeSelectCurrent.value) {
					query.pj_base_business_category = this.tradeSelectCurrent.value
				}

				if (this.auditSelectCurrent.value) {
					query.pj_review_status = this.auditSelectCurrent.value
				}

				if (this.departSelectCurrent.value) {
					query.pj_base_region = this.departSelectCurrent.value
				}

				if (this.pageType === moduleCodes.StorePhaseProject) { //储备项目
					this.queryStoreList(query)
				} else if (this.pageType === moduleCodes.BuildingPhaseProject) { // 在建项目
					this.queryPlayList(query)
				} else if (this.pageType === moduleCodes.OperationPhaseProject) { // 竣工项目
					this.queryFinishList(query)
				} else if (this.pageType === moduleCodes.favoriteproject) { // 收藏项目
					this.queryCollectList(query)
				} else {
					this.video = true
					this.queryPlayList(query)
				}

			},
			inputConfirm() {
				this.amountSelectShow = false;
				this.projectLists = [];
				this.mescroll.resetUpScroll();
			},
			// 储备项目
			queryStoreList(data) {
				console.log(data)
				const modelId = '2d97a78c3be1440493c983bb9186bacf';
				const pj_base_project_phase = '05726e181e7147768f67ce1905fe6e49';
				this.modelId = modelId;
				this.pj_base_project_phase = pj_base_project_phase

				const pj_base_dispatcher = Number(this.userInfo.userId) && {
					type: 'IN',
					field: "pj_base_dispatcher",
					values: this.userInfo.userId
				};
				const customized = [{
					type: 'IN',
					field: 'pj_base_project_phase',
					values: '05726e181e7147768f67ce1905fe6e49'
				}]
				getModelList(modelId, {
					currentPage: data.currentPage,
					pageSize: data.pageSize,
					sidx: 'pj_base_roject_create_date',
					sort: "desc",
					customized: JSON.stringify(pj_base_dispatcher ? [pj_base_dispatcher, ...customized] :
						customized),
					json: JSON.stringify({
						pj_base_project_phase,
						pj_base_business_category: data.pj_base_business_category,
						pj_fund_invest_total: data.pj_fund_invest_total,
						pj_review_status: data.pj_review_status,
						pj_base_project_name: '项目',
						pj_base_region: data.pj_base_region,
						keyword: data.keyword,
						type: "IN",

					})
				}).then(res => {
					// console.log(res)
					const {
						code,
						data: {
							list = [],
							pagination = {}
						} = {}
					} = res || {};
					if (code === 200) {

						this.projectLists = [...this.projectLists, ...list]
						this.mescroll.endBySize(pagination.pageSize, pagination.total); //必传参数(当前页的数据个数, 总页数)
					}
				})
			},
			// 在建项目
			queryPlayList(data) {
				const modelId = 'b094ad34716143b5a13e291572ab1af3';
				const pj_base_dispatcher = Number(this.userInfo.userId) ? {
					type: 'IN',
					field: "pj_base_dispatcher",
					values: this.userInfo.userId
				} : {
					type: 'IN',
					field: "pj_review_status",
					values: data.pj_review_status || '2'
				}
				const customized = [{
					type: 'IN',
					field: 'pj_base_project_phase',
					values: '6bfa51249e2e4d31a8128b50c3b33877,fe3ab31dd0ef495ca2c2afc272fb7715'
				}, pj_base_dispatcher]
				this.modelId = modelId;
				this.pj_base_project_phase = '1a0d97c689c84f2599e6fffd29f9efc6'
				const JSONInfo = {
					pj_base_business_category: data.pj_base_business_category,
					// pj_fund_invest_total: data.pj_fund_invest_total,
					pj_review_status: data.pj_review_status,
					pj_base_region: data.pj_base_region,
					keyword: data.keyword,
				}
				getModelList(modelId, {
					currentPage: data.currentPage,
					pageSize: data.pageSize,
					sort: "desc",
					sidx: "pj_base_project_create_date",
					customized: JSON.stringify(customized),
					json: JSON.stringify(JSONInfo) === '{}' ? '' : JSON.stringify(JSONInfo)

				}).then(res => {
					// console.log(res)
					const {
						code,
						data: {
							list = [],
							pagination = {}
						} = {}
					} = res || {};
					if (code === 200) {
						this.projectLists = [...this.projectLists, ...list]
						this.mescroll.endBySize(pagination.pageSize, pagination.total); //必传参数(当前页的数据个数, 总页数)
					}
				})

			},
			// 竣工项目
			queryFinishList(data) {
				const modelId = '1a0d97c689c84f2599e6fffd29f9efc6';
				const pj_base_project_phase = 'b160da1373a84d99932f5810204acc1f';
				this.modelId = modelId;
				this.pj_base_project_phase = pj_base_project_phase;
				const pj_base_dispatcher = Number(this.userInfo.userId) && {
					type: 'IN',
					field: "pj_base_dispatcher",
					values: this.userInfo.userId
				};
				const customized = [{
					type: 'IN',
					field: 'pj_base_project_phase',
					values: 'c412b1ee888d4b179a055acea74b36ac,b160da1373a84d99932f5810204acc1f,ce9426c80d47487b91ed9b92d20e6ef8'
				}]
				getModelList(modelId, {
					currentPage: data.currentPage,
					pageSize: data.pageSize,
					customized: JSON.stringify(pj_base_dispatcher ? [pj_base_dispatcher, ...customized] :
						customized),
					json: JSON.stringify({
						pj_base_project_phase,
						pj_base_business_category: data.pj_base_business_category,
						pj_fund_invest_total: data.pj_fund_invest_total,
						pj_review_status: data.pj_review_status,
						pj_base_region: data.pj_base_region,
						keyword: data.keyword

					})
				}).then(res => {
					// console.log(res)
					const {
						code,
						data: {
							list = [],
							pagination = {}
						} = {}
					} = res || {};
					if (code === 200) {
						this.projectLists = [...this.projectLists, ...list]
						this.mescroll.endBySize(pagination.pageSize, pagination.total); //必传参数(当前页的数据个数, 总页数)
					}
				})
			},
			// 收藏项目
			queryCollectList(data) {
				const modelId = '5371514a5ef7423f81f809e33cb66e74';
				const concerns = this.userInfo.userName + ',';
				const pj_base_dispatcher = Number(this.userInfo.userId) && {
					type: 'IN',
					field: "pj_base_dispatcher",
					values: this.userInfo.userId
				};
				const customized = [{
					type: 'NOT',
					field: 'pj_review_status',
					values: '0'
				}]
				getModelList(modelId, {
					currentPage: data.currentPage,
					pageSize: data.pageSize,
					customized: JSON.stringify(pj_base_dispatcher ? [pj_base_dispatcher, ...customized] :
						customized),
					json: JSON.stringify({
						concerns,
						pj_base_business_category: data.pj_base_business_category,
						pj_fund_invest_total: data.pj_fund_invest_total,
						pj_review_status: data.pj_review_status,
						pj_base_region: data.pj_base_region,
						keyword: data.keyword

					})
				}).then(res => {
					// console.log(res)
					const {
						code,
						data: {
							list = [],
							pagination = {}
						} = {}
					} = res || {};
					if (code === 200) {
						this.projectLists = [...this.projectLists, ...list]
						this.mescroll.endBySize(pagination.pageSize, pagination.total); //必传参数(当前页的数据个数, 总页数)
					}
				})
			},
			// 视频项目
			queryVideoList() {

			},
			downCallback() {
				this.projectLists = [];
				this.mescroll.resetUpScroll();
			},
			// 获取行业
			getDictionarySelects() {
				getDictionaryDataSelector('1b252ec1f16542d7b9f608bd1f7f2418').then(res => {
					const base_list = [{
						fullName: '全部',
						id: ''
					}]
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {
						this.tradelists = [...base_list, ...list]
						// this.queryLists(moduleId, moduleId_type)
					}
				})
			},
			getDepartmentSelects() {
				getDepartmentSelector().then(res => {
					const baseList = [{
						fullName: '全部',
						id: ''
					}]
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {
						this.departlists = [...baseList, ...list[0]?.children?. [0]?.children];
					}
				})
			},
			toNotificationDetail(id) {

				if (this.video) {
					uni.navigateTo({
						url: `/pages/project/video/video`
					})
					return
				}

				const modelId = this.modelId;
				const pj_base_project_phase = this.pj_base_project_phase
				uni.setStorageSync("detailInfo", {
					// pj_base_project_phase,
					id,
					modelId: "2d97a78c3be1440493c983bb9186bacf"
				})
				uni.navigateTo({
					url: `/pages/project/detail/index?modelId=${modelId}&pj_base_project_phase=${pj_base_project_phase}&id=${id}`
				})
			},
			search() {
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.projectLists = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
			selectConfirm(e) {
				console.log(e)
				this[this.selectType + 'Current'] = e[0];
				this.projectLists = [];
				this.mescroll.resetUpScroll();
			},
			showSelect(e) {
				const {
					dataset: {
						type
					} = {}
				} = e.currentTarget || {}
				this.selectType = type;
				const typeName = type + 'Show';
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
				padding: 20rpx 20rpx;
				overflow-x: auto;

				.select {
					margin-right: 19rpx;

					&:last-child {
						margin-right: 0;
					}

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
