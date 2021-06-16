<template>
	<view class="calendar-v">
		<calendar :lunar="true" :showMonth="true" @change="change" @monthSwitch="monthSwitch" @initdate="initdate" />
		<view class="calendar-b">
			<view class="lunar jnpf-card u-m-t-20">
				{{changedate}}
			</view>
			<view v-for="(item,index) in scheduleList" :key="index" class=" u-m-b-20">
				<u-swipe-action :index="index" :show="item.show" @click="removeList" @open="open" :options="options"
					@content-click="goDetail(item.id)">
					<view class="calendar-listBox u-flex-col">
						<text class="startTime u-m-b-15 u-font-24">{{item.startTime | date('yyyy-mm-dd')}}</text>
						<view class="endTimeBox u-flex  u-m-t-15">
							<text class="endTime u-font-24">{{item.endTime | date('yyyy-mm-dd')}}</text>
							<text class="content u-m-l-15">{{item.content}}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</view>

		<!-- 新增按钮 -->
		<view class="addBtn" @click="goDetail('add')">
			<text class="u-font-60 addBtnTxt">+</text>
		</view>
	</view>
</template>

<script>
	import calendar from './calendar/uni-calendar.vue'
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	import {
		initSchedule,
		detailSchedule
	} from '@/api/apply/schedule.js'
	export default {
		components: {
			calendar
		},
		data() {
			return {
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: "#007AFF"
				},
				changedate: '',
				scheduleList: [],
				exhibitionList: [],
				startDate: '',
				endDate: '',
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],

			}
		},

		methods: {
			/* 初始化请求 */
			initdate(cale, nowDate) {
				let canlender = cale.canlender;
				let weeks = cale.weeks;
				let startTime = this.startDate = canlender[0].lunar.cYear + '-' + canlender[0].lunar.cMonth + '-' +
					canlender[0].lunar
					.cDay;
				let endTime = this.endDate = canlender[canlender.length - 1].lunar.cYear + '-' + canlender[canlender
						.length - 1].lunar
					.cMonth + '-' + canlender[canlender.length - 1].lunar.cDay;
				for (let i = 0; i < canlender.length; i++) {
					if (canlender[i].fullDate === nowDate.fullDate) {
						this.changedate = '农历  ' + canlender[i].lunar.IMonthCn + canlender[i].lunar.IDayCn;
						break;
					}
				}
				this.scheduleList.splice(0);
				
				let query = {
					startTime: startTime,
					endTime: endTime,
				}
				initSchedule(query).then(res => {
					let signList = res.data.signList;
					let todayList = res.data.todayList;
					for (let i = 0; i < 6; i++) {
						for (let j = 0; j < weeks[i].length; j++) {
							let date = this.$u.date(weeks[i][j].lunar.cYear + '-' + weeks[i][j].lunar.cMonth +
								'-' + weeks[i][j].lunar.cDay, 'yyyymmdd')
							weeks[i][j].isSign = signList[date] == 0 ? false : true;
						}
					}
					if (todayList && todayList.length) {
						for (let i = 0; i < todayList.length; i++) {
							this.scheduleList.push(todayList[i])
						}
					}
				})

			},
			
			change(e) {
				let lunar = e.lunar;
				this.changedate = '农历  ' + lunar.IMonthCn + lunar.IDayCn;
				this.scheduleList.splice(0);
				let query = {
					startTime: this.startDate,
					endTime: this.endDate,
					dateTime: e.fulldate
				}
				initSchedule(query).then(res => {
					let todayList = res.data.todayList;
					if (todayList && todayList.length) {
						for (let i = 0; i < todayList.length; i++) {
							this.scheduleList.push(todayList[i])
						}
					}
				})
			},
			monthSwitch(e) {
				
			},
			
			goDetail(id) {
				let url = './form?id=' + id
				if (id == 'add') {
					url = './form'
				}
				uni.navigateTo({
					url: url
				})
			},

			open(index) {
				this.scheduleList[index].show = true;
				this.scheduleList.map((val, idx) => {
					if (index != idx) this.scheduleList[idx].show = false;
				})
			},

			removeList(index, index1) {
				const item = this.scheduleList[index];
				detailSchedule(item.id).then(res => {
					this.scheduleList[index].show = false;
					this.$u.toast('删除成功')
					this.scheduleList.splice(index, 1);
					uni.redirectTo({
						url: 'index',
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.calendar-v {
		.calendar-b {
			.lunar {
				background-color: #FFFFFF;
				padding: 40rpx 16rpx;
				margin-bottom: 20rpx;
			}

			.calendar-listBox {
				padding: 15rpx 16rpx;
				background-color: #FFFFFF;

				.startTime,
				.endTime {
					color: #9a9a9a;
				}
			}
		}

		.addBtn {
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			background-color: rgba(0, 140, 255, 0.6);
			position: fixed;
			bottom: 100rpx;
			right: 40rpx;
			text-align: center;

			.addBtnTxt {
				color: #FFFFFF;
				line-height: 96rpx;
				font-size: 80rpx;
			}
		}
	}
</style>
