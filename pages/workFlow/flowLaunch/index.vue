<template>
	<view class="flowLaunch-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption">
			<view class="search-box search-box_sticky">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72" :show-action="false" @change="search"
					bg-color="#f0f2f6" shape="square">
				</u-search>
			</view>
			<view class="flow-list">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id"
					@click="handleClick" @open="open" :options="options" @content-click="goDetail(item)"
					class="u-m-b-20">
					<view class="item">
						<view class="item-cell item-title u-border-bottom">
							<text class="title u-line-1">{{item.fullName}}</text>
						</view>
						<view class="item-cell">
							<text class="time">{{item.creatorTime | date('yyyy-mm-dd hh:MM')}}</text>
							<text :class="'status '+getFlowStatus(item.status).statusCss">
								{{getFlowStatus(item.status).text}}
							</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		FlowLaunchList,
		Delete
	} from '@/api/workFlow/flowLaunch'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
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
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad() {
			this.eventHub.$on('refresh', () => {
				this.list = [];
				this.mescroll.resetUpScroll();
			})
		},
		onUnload() {
			this.eventHub.$off('refresh')
		},
		methods: {
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword
				}
				FlowLaunchList(query, {
					load: page.num == 1
				}).then(res => {
					this.mescroll.endSuccess(res.data.list.length);
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
				if ([1, 2, 5].includes(item.status)) {
					this.$u.toast("流程正在审核,请勿删除")
					this.list[index].show = false
					return
				}
				Delete(item.id).then(res => {
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
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
			goDetail(item) {
				let opType = '-1'
				if ([1, 2, 5].includes(item.status)) opType = 0
				const config = {
					id: item.id,
					enCode: item.flowCode,
					flowId: item.flowId,
					formType: item.formType,
					opType: opType,
					status: item.status,
					taskNodeId: '',
					fullName: item.fullName
				}
				uni.navigateTo({
					url: '/pages/workFlow/flowBefore/index?config=' + encodeURIComponent(JSON.stringify(config))
				})
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
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.flowLaunch-v {
		.u-swipe-content {
			margin-bottom: 20rpx;
		}
	}
</style>
