<template>
	<view class="flowLaunch-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption">
			<view class="search-box sticky">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72" :show-action="false" @change="search"
					bg-color="#f0f2f6" shape="square">
				</u-search>
			</view>
			<view>
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id"
					@click="click" @open="open" :options="options" @content-click="goDetail(item)" class="u-m-b-20">
					<view class="item">
						<view class="title-wrap">
							<text class="title u-line-2">{{ item.fullName }}</text>

						</view>
					</view>
				</u-swipe-action>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
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
		onShow() {},
		methods: {
			/* 上拉 */
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword,
				}
				FlowLaunchList(query).then(res => {
					this.mescroll.endSuccess(res.data.list.length);
					if (page.num == 1) this.list = [];
					const list = res.data.list.map(o => ({
						show: false,
						...o
					}));
					this.list = this.list.concat(list);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			/* 点击删除按钮 */
			click(index, index1) {
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
			/* 滑动删除列表 */
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
					this.goods = []; // 先清空列表,显示加载进度
					this.mescroll.resetUpScroll();
				}, 300)
			},
			/* 列表点击处理 */
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
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.flowLaunch-v {
		.sticky {
			z-index: 990;
			position: sticky;
			top: var(--window-top);
			background-color: #fff;
		}

		.u-swipe-content {
			margin-bottom: 20rpx;
		}
	}
</style>
