<template>
	<view class="flowLaunch-v">
		<view class="uni-container">
			<uni-table ref="table" border stripe emptyText="暂无更多数据"
				@selection-change="selectionChange">
				<uni-tr>
					<uni-th width="150" align="center"></uni-th>
					<uni-th width="150" align="center">个数</uni-th>
					<uni-th align="center">总投资</uni-th>
					<uni-th width="150" align="center">国投</uni-th>
					<uni-th width="150" align="center">省投</uni-th>
					<uni-th width="150" align="center">市投</uni-th>
					<uni-th width="150" align="center">自筹</uni-th>
					<uni-th width="150" align="center">预计年税收</uni-th>
					<uni-th width="150" align="center">预计利润</uni-th>
					<uni-th width="150" align="center">预计年产值</uni-th>
					<uni-th width="150" align="center">预计增加就业人数</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in reportList" :key="index">
					<uni-td>{{ item.name }}</uni-td>
					<uni-td>
						<view class="name">{{ item.sum }}</view>
					</uni-td>
					<uni-td align="center">{{ item.investTotal }}</uni-td>
					<uni-td align="center">{{ item.investNation }}</uni-td>
					<uni-td align="center">{{ item.investProvince }}</uni-td>
					<uni-td align="center">{{ item.investCity }}</uni-td>
					<uni-td align="center">{{ item.selfRaise }}</uni-td>
					<uni-td align="center">{{ item.profitPlanAnnualTax }}</uni-td>
					<uni-td align="center">{{ item.profitPlanGross }}</uni-td>
					<uni-td align="center">{{ item.profitPlanAnnualDgp }}</uni-td>
					<uni-td align="center">{{ item.profitPlanEmployeeIncrease }}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<!-- <view class="u-p-t-20 u-p-l-20 u-p-r-20 u-p-b-20">
			<u-button type="primary" @click="down">下载报表</u-button>
		</view> -->
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getQueryConditionData,
		getReportList,
		getDetailReportList,
		exportSummationExcel
	} from '@/api/projectReport'

	import CitySelect from "../../../components/cudt/cudt-city-select/city-select";
	import CudtNumRange from "../../../components/cudt/cudt-num-range";
	import CudtSelect from "../../../components/cudt/cudt-select";
	export default {
		components: {
			CudtSelect,
			CudtNumRange,
			CitySelect
		},
		mixins: [MescrollMixin],
		data() {
			return {
				reportList: []
			}
		},
		onLoad() {
			// uni.$on('refresh', () => {
			// 	this.list = [];
			// 	this.mescroll.resetUpScroll();
			// })
			const lists = uni.getStorageSync('reportList')

			this.reportList = lists

		},
		onUnload() {
			uni.$off('refresh')
		},
		computed: {
			columns() {
				return this.tableHead.map(item => {
					return {
						key: item.id,
						title: item.name
					}
				})
			}
		},
		methods: {
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			down() {
				const reportList_query = uni.getStorageSync('reportList_query');
				console.log(JSON.stringify(reportList_query))
				exportSummationExcel(reportList_query).then(res => {
					console.log(res)
				})
				// uni.showToast({
				// 	title: '下载失败',
				// 	icon:"none",
				// 	duration: 2000
				// });
			},

		}
	}
</script>

<style lang="scss">
	.separator {
		margin: 0 20rpx;
		flex-shrink: 0;
	}

	.scroll-view_H {
		width: 200%;
		display: flex;
		flex-wrap: nowrap;
	}

	.table_box {
		.box_bt {
			border-bottom: unset !important;
		}

		.box_pd {
			padding: unset !important;
		}

		.box_br {
			border-right: unset !important;
		}

		.box_cus {
			padding: 10px 3px !important;
		}

		/deep/ .uni-td[data-v-35ace0c0] {
			height: auto;
		}
	}
</style>
