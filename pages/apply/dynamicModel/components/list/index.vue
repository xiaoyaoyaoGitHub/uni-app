<template>
	<view class="dynamicModel-list-v">
		<view class="head-warp com-dropdown">
			<u-dropdown class="u-dropdown" ref="uDropdown">
				<u-dropdown-item title="排序" :options="sortOptions">
					<view class="dropdown-slot-content">
						<view class="dropdown-slot-content-main">
							<u-cell-group>
								<u-cell-item @click="cellClick(item)" :arrow="false" :title="item.label"
									v-for="(item, index) in sortOptions" :key="index" :title-style="{
									color: sortValue == item.value ? '#2979ff' : '#606266' }">
									<u-icon v-if="sortValue == item.value" name="checkbox-mark" color="#2979ff"
										size="32"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</view>
						<view class="dropdown-slot-bg" @click="$refs.uDropdown.close()"></view>
					</view>
				</u-dropdown-item>
				<u-dropdown-item title="筛选">
					<view class="dropdown-slot-content">
						<view class="dropdown-slot-content-main search-main">
							<view class="u-p-l-32 u-p-r-32 search-form">
								<Parser :formConf="searchList" ref="searchForm" v-if="showParser"
									@submit="sumbitSearchForm" />
							</view>
							<view class="buttom-actions">
								<u-button class="buttom-btn" @click="reset">重置</u-button>
								<u-button class="buttom-btn" type="primary" @click="closeDropdown">检索</u-button>
							</view>
						</view>
						<view class="dropdown-slot-bg" @click="$refs.uDropdown.close()"></view>
					</view>
				</u-dropdown-item>
			</u-dropdown>
			<view class="search-box">
				<u-search placeholder="请输入关键词搜索" v-model="listQuery.keyword" height="72" :show-action="false"
					@change="search" bg-color="#f0f2f6" shape="square">
				</u-search>
			</view>
		</view>
		<view class="list-warp">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false"
				:down="downOption" :up="upOption">
				<view class="list">
					<view class="list-box" v-for="(item, index) in list" :key="item.id">
						<u-swipe-action :index="index" :show="item.show" @click="handleClick" @open="open"
							:options="options" @content-click="goDetail(item.id,item.flowState)">
							<view class="item">
								<view class="item-cell u-line-1" v-for="(column,i) in columnList" :key="i">
									<text>{{column.label}}：</text>
									<text>{{item[column.prop]}}</text>
								</view>
								<view class="item-cell" v-if="config.webType==3">
									<text>审批状态：</text>
									<text :class="getFlowStatus(item.flowState).statusCss">
										{{getFlowStatus(item.flowState).text}}
									</text>
								</view>
							</view>
						</u-swipe-action>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="com-addBtn" @click="goDetail()">
			<u-icon name="plus" size="60" color="#fff" />
		</view>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Parser from '../parser/index.vue'
	import {
		getModelList,
		deteleModel
	} from '@/api/apply/visualDev'
	export default {
		mixins: [MescrollMixin],
		props: ['config', 'modelId', 'isPreview', 'title'],
		components: {
			Parser
		},
		data() {
			return {
				sortValue: '',
				downOption: {
					use: true,
					auto: false
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
						zIndex: 5
					},
					textNoMore: '没有更多数据',
					toTop: {
						bottom: 250
					}
				},
				list: [],
				listQuery: {
					sort: 'desc',
					sidx: '',
					keyword: '',
					json: ''
				},
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				showParser: false,
				columnData: {},
				columnList: [],
				sortOptions: [],
				searchList: []
			}
		},
		created() {
			this.init()
			uni.$on('refresh', () => {
				this.list = [];
				this.mescroll.resetUpScroll();
			})
		},
		beforeDestroy() {
			uni.$off('refresh')
		},
		methods: {
			init() {
				this.columnData = JSON.parse(this.config.columnData)
				this.upOption.page.size = this.columnData.hasPage ? this.columnData.pageSize : 1000000
				this.setDefaultQuery()
				this.columnList = this.columnData.columnList
				this.searchList = this.columnData.searchList
				const sortList = this.columnData.sortList
				let sortOptions = [];
				for (let i = 0; i < sortList.length; i++) {
					let ascItem = {
						label: sortList[i].label + '升序',
						value: sortList[i].prop + 'asc',
						sidx: sortList[i].prop,
						sort: 'asc'
					}
					let descItem = {
						label: sortList[i].label + '降序',
						sidx: sortList[i].prop,
						value: sortList[i].prop + 'desc',
						sort: 'desc'
					}
					sortOptions.push(ascItem, descItem)
				}
				this.sortOptions = sortOptions
				this.showParser = true
				if (this.isPreview == '1') return
				this.initData()
			},
			initData() {},
			setDefaultQuery() {
				this.listQuery.sort = this.columnData.sort
				this.listQuery.sidx = this.columnData.defaultSidx
			},
			upCallback(page) {
				if (this.isPreview == '1') return this.mescroll.endSuccess(0, false);
				const query = {
					currentPage: page.num,
					pageSize: page.size,
					...this.listQuery
				}
				getModelList(this.modelId, query, {
					load: page.num == 1
				}).then(res => {
					if (this.columnData.hasPage) {
						this.mescroll.endSuccess(res.data.list.length);
					} else {
						this.mescroll.endSuccess(res.data.list.length, false);
					}
					if (page.num == 1) this.list = [];
					const list = res.data.list.map(o => ({
						show: false,
						...o
					}));
					this.list = this.list.concat(list);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			handleClick(index, index1) {
				const item = this.list[index]
				if (this.config.webType == 3 && [1, 2, 5].includes(item.flowState)) {
					this.$u.toast("流程正在审核,请勿删除")
					this.list[index].show = false
					return
				}
				deteleModel(this.modelId, item.id).then(res => {
					this.$u.toast(res.msg)
					this.list.splice(index, 1)
				})
			},
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			search() {
				if (this.isPreview == '1') return
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
			goDetail(id, status) {
				if (this.config.webType == 3) {
					let opType = '-1'
					if ([1, 2, 5].includes(status)) opType = 0
					const config = {
						id: id || '',
						enCode: this.config.flowEnCode,
						flowId: this.config.flowId,
						formType: 2,
						type: 1,
						opType,
						status: status || '',
						isPreview: this.isPreview,
						fullName: id ? '编辑' : '新增'
					}
					uni.navigateTo({
						url: '/pages/workFlow/flowBefore/index?config=' + encodeURIComponent(JSON.stringify(
							config))
					})
				} else {
					uni.navigateTo({
						url: '/pages/apply/dynamicModel/form?modelId=' + this.modelId + '&isPreview=' +
							this.isPreview + (id ? '&id=' + id : '')
					})
				}
			},
			getFlowStatus(val) {
				let status
				switch (val) {
					case 0:
						status = {
							text: '等待提交',
							statusCss: 'u-type-info'
						}
						break;
					case 1:
						status = {
							text: '等待审核',
							statusCss: 'u-type-primary'
						}
						break;
					case 2:
						status = {
							text: '审核通过',
							statusCss: 'u-type-success'
						}
						break;
					case 3:
						status = {
							text: '审核驳回',
							statusCss: 'u-type-error'
						}
						break;
					case 4:
						status = {
							text: '审核撤回',
							statusCss: 'u-type-error'
						}
						break;
					case 5:
						status = {
							text: '审核终止',
							statusCss: 'u-type-info'
						}
						break;
					default:
						status = {
							text: '等待提交',
							statusCss: 'u-type-info'
						}
						break;
				}
				return status
			},
			cellClick(item) {
				if (this.sortValue === item.value) return
				this.listQuery.sort = item.sort
				this.listQuery.sidx = item.sidx
				this.sortValue = item.value
				this.$refs.uDropdown.close();
				if (this.isPreview == '1') return
				this.$nextTick(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				})
			},
			reset() {
				this.$refs.searchForm && this.$refs.searchForm.resetForm()
			},
			closeDropdown() {
				if (this.isPreview == '1') {
					uni.showToast({
						title: '功能预览不支持检索',
						icon: 'none'
					})
					return
				}
				this.$refs.searchForm && this.$refs.searchForm.submitForm()
			},
			sumbitSearchForm(data) {
				const json = data || {}
				this.listQuery.json = JSON.stringify(json) !== '{}' ? JSON.stringify(json) : ''
				this.$refs.uDropdown.close();
				this.$nextTick(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
		height: 100%;
		/* #ifdef MP-ALIPAY */
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		/* #endif */
	}

	.dynamicModel-list-v {
		height: 100%;
		display: flex;
		flex-direction: column;

		.head-warp {
			background-color: #fff;
		}

		.list-warp {
			flex: 1;
			min-width: 0;
			min-height: 0;
		}

		.list {

			.list-box {
				width: 100%;
				margin-bottom: 20rpx;

				.item {
					background-color: #fff;
					padding: 0 32rpx;

					.item-cell {
						height: 90rpx;
						line-height: 90rpx;
						font-size: 28rpx;
						color: #333333;
					}
				}
			}
		}
	}
</style>
