<template>
	<view class="contacts-v">
		<!-- <mescroll-body class="u-flex u-col-top" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false"> -->
		<view class="search-box search-box_sticky u-flex u-border-bottom">
			<u-search class="search-input" placeholder="请输入项目名称搜索" v-model="keyword" height="72" :show-action="true"
				:action-style="{color:'#071127',lineHeight:48 + 'rpx', fontSize:32 + 'rpx'}" @custom="search"
				bg-color="#F7F8FA" placeholder-color="#C1C3C9" search-icon-color="#C1C3C9" shape="square">
			</u-search>
		</view>
		<!-- <cover-view> -->
		<view class="u-flex selects u-row-left">
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
					{{departSelectCurrent.label}}
				</u-button>
				<u-select value-name="id" label-name="fullName" v-model="departSelectShow" :list="departlists"
					@confirm="selectConfirm"></u-select>
			</view>
		</view>
		<!-- </cover-view> -->
		<view class="map">
			<!-- <view id="amap"></view> -->
			<!-- <map class="map-content" name="" :longitude="longitude" :latitude="latitude" :markers="covers"
				@updated="mapUpdate" :include-points="covers" @markertap="clickMark" @callouttap="clickMark"></map> -->
			<a-map ref="map" :markerLists="covers"></a-map>
		</view>
		<!-- </mescroll-body> -->
	</view>
</template>
<script>
	import {
		getImUser,
		moduleCodes,
		moduleTitle,
		getDictionaryDataSelector,
		getDepartmentSelector,
	} from '@/api/common.js'
	import {
		getModelList,
		mapList
	} from "@/api/apply/visualDev.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	// import ""
	import Amap from "@/components/ITkoala-amap/amap.vue"
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
					value: '0',
					label: '审核状态'
				},
				tradeSelectCurrent: {
					value: 'def93d1b7cda45d1a2f60c6c39052e95',
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
				covers: [],
				latitude: '',
				longitude: ''

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
			this.getDictionarySelects();
			this.getDepartmentSelects();
		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		created() {
			this.upCallback()
		},
		mounted() {
			uni.$on('markerId', (index) => {
				this.clickMark(index)
			})
		},
		methods: {
			mapUpdate() {
				console.log('update')
			},

			inputConfirm() {
				this.amountSelectShow = false;
				this.upCallback()
			},
			clickMark(index) {

				const currentMark = this.covers[index];
				const {
					pj_base_project_phase,
					project_id: id
				} = currentMark || {};
				getDictionaryDataSelector("d16af6c485154abea4c168a8a23a9617").then(res => {
					console.log(res)
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {

						// this.tradelists = list
						// this.queryLists(moduleId, moduleId_type)
					}
				})
				// return
				// console.log(`/pages/project/detail/index?modelId=2d97a78c3be1440493c983bb9186bacf&pj_base_project_phase=${pj_base_project_phase}&id=${id}`)
				// uni.setStorageSync("detailInfo", {
				// 	pj_base_project_phase,
				// 	id,
				// 	modelId: "2d97a78c3be1440493c983bb9186bacf"
				// })
				uni.navigateTo({
					url: `/pages/project/detail/index?modelId=2d97a78c3be1440493c983bb9186bacf&pj_base_project_phase=${pj_base_project_phase}&id=${id}`
				})
			},
			upCallback(page = {}) {
				let query = {
					pj_base_business_category: this.tradeSelectCurrent.value || '',
					pj_fund_invest_total: [Number(this.amount.min) ? Number(this.amount.min) : 500, Number(this.amount.max) ? Number(this.amount.max) : 500000],
					pj_review_status: this.auditSelectCurrent.value || '',
					pj_base_region: this.departSelectCurrent.value || ''
				}
				this.queryStoreList(query)
			},
			downCallback() {
				console.log('down')
				// this.mescroll.endSuccess(0);
			},
			toNotificationDetail(item) {
				uni.navigateTo({
					url: '/pages/project/detail/index'
				})
			},
			// 获取行业
			getDictionarySelects() {
				getDictionaryDataSelector('1b252ec1f16542d7b9f608bd1f7f2418').then(res => {
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {
						this.tradelists = list
					}
				})
			},
			getDepartmentSelects() {
				getDepartmentSelector().then(res => {
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {

						this.departlists = list[0]?.children?. [0]?.children;

					}
				})
			},
			queryStoreList(data) {
				uni.showLoading({
					title:'请求中...'
				})
				mapList({
					currentPage: 1,
					pageSize: 10000,
					sidx: 'pj_base_roject_create_date',
					sort: "desc",
					userInfo: this.userInfo,
					...data
				}).then(res => {
					// console.log(res)
					uni.hideLoading()
					const {
						code,
						data: {
							list = [],
							pagination = {}
						} = {}
					} = res || {};
					if (code === 200) {
						const filterLists = list.filter(item => {
							const {
								pj_base_project_position = '{}',
									pj_base_project_name
							} = item || {};
							if (pj_base_project_position === null) return false
							const {
								latitude,
								longitude
							} = JSON.parse(pj_base_project_position);
							return latitude && longitude
						})
						const covers = filterLists.map((item, index) => {
							const {
								pj_base_project_position = '{}',
									pj_base_project_name,
									pj_base_project_phase,
									id
							} = item || {};
							const {
								latitude,
								longitude
							} = JSON.parse(pj_base_project_position);
							return {
								id: index,
								project_id: id,
								lat: latitude,
								lng: longitude,
								title: pj_base_project_name,
								// label: {
								// 	content: pj_base_project_name
								// },
								width: 20,
								height: 20,
								icon: './mark.jpeg',
								pj_base_project_phase: pj_base_project_phase,
								callout: {
									content: pj_base_project_name,
									display: 'ALWAYS'

								}
							}
						})
						this.covers = covers
						// 	console.log('请求成功')
						// 	console.log(this.$refs.map)
						// this.$nextTick(function() {
						// 	console.log(this.map)
						// })
						// uni.$emit('markerListUpdate', covers)
						console.log('请求成功')
					}
				})
			},
			search() {
				// 节流,避免输入过快多次请
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.upCallback()
				}, 300)
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/message/userDetail/index?userId=' + id,
				})
			},

			selectConfirm(e) {
				// console.log(this.selectType + 'Current')
				this[this.selectType + 'Current'] = e[0];
				this.upCallback()
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

				uni.$emit('showSelect', true)

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F6F7;
		height: 100%;

		.contacts-v {
			position: relative;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;

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
				overflow: auto;
				width: 100%;

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

			.map {
				// position: absolute;
				// left: 0;
				// top: 320rpx;
				// right: 0;
				// bottom: 0;
				width: 100%;
				padding: 0 10px;
				height: calc(100% - 320rpx);
				flex: 1;
				// background: #fff;

				#amap {
					width: 100%;
					height: 100%;
				}
			}

			.amount-scope {
				padding: 20rpx;
			}

		}
	}
</style>
