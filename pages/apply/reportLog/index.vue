<template>
	<view class="reportLog-v">
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false">
			<view class="reportLog-tabs">
				<u-sticky>
					<u-tabs :list="list" :current="current" @change="change" name='fullName' inactive-color="#999999" :is-scroll='false':offset="offset">
					</u-tabs>
				</u-sticky>
			</view>
			<view class="search-box search-box_sticky">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72" :show-action="false" @change="search"
					bg-color="#f0f2f6" shape="square">
				</u-search>
			</view>

			<view class="receiveJournal-list" v-for="(item, i) in sendJournaList" :key="i" @click="detail(item.id)" v-if="current == 0">
				<view class="receiveJournal-list-txt u-flex-col">
					<view class="u-font-30 u-flex u-m-b-10 receiveJournal-title">
						<text class="title">{{item.title}}</text>
						<text>{{item.creatorTime | date('mm-dd')}}</text>
					</view>
					<text class="u-m-t-10">{{userInfo.userName}}/{{userInfo.userAccount}}</text>
				</view>
			</view>
			<view class="receiveJournal-list" v-for="(item, i) in receiveJournalList" :key="i" @click="detail(item.id)" v-if="current == 1">
				<view class="receiveJournal-list-txt u-flex-col">
					<view class="u-font-30 u-flex u-m-b-10 receiveJournal-title">
						<text class="title">{{item.title}}</text>
						<text>{{item.creatorTime | date('mm-dd')}}</text>
					</view>
					<text class="u-m-t-10">{{userInfo.userName}}/{{userInfo.userAccount}}</text>
				</view>
			</view>
			
			
		</mescroll-body>
		<!-- 新增按钮 -->
		<view class="addBtn" @click="detail('add')">
			<text class="u-font-60 addBtnTxt">+</text>
		</view>
	</view>
</template>

<script>
	import {
		getSendJournalList,
		getReceiveJournalList,
		handelReportLog
	} from '@/api/apply/reportLog.js'
	import define from '@/utils/define.js'
	import resources from '@/libs/resources.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				customStyle:{
					color: '#FFFFFF',
					fontSize:'25px'
				},
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
				current: 0,
				list: [{
						fullName: '我发出的'
					},
					{
						fullName: '我收到的'
					}
				],
				keyword: '',
				sendJournaList: [],
				receiveJournalList:[],
				offset: [5, -5],
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
		},
		methods: {
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword,
				}
				if(this.current == 0){
					getSendJournalList(query, {
						load: page.num == 1
					}).then(res => {
						this.mescroll.endSuccess(res.data.list.length);
						if (page.num == 1) this.sendJournaList = [];
						const list = res.data.list;
						this.sendJournaList = this.sendJournaList.concat(list);
					}).catch(() => {
						this.mescroll.endErr();
					})
				}else{
					getReceiveJournalList(query, {
						load: page.num == 1
					}).then(res => {
						this.mescroll.endSuccess(res.data.list.length);
						if (page.num == 1) this.receiveJournalList = [];
						const list = res.data.list;
						this.receiveJournalList = this.receiveJournalList.concat(list);
					}).catch(() => {
						this.mescroll.endErr();
					})
				}
			},
			detail(id){
				let url = './form?id='+id+'&type='+this.current
				if(id == 'add'){
					url = './form?type=0'
				}
				uni.navigateTo({
					url:url
				})
			},
			change(index) {
				this.current = index;
				if(index == 0){
					if(this.sendJournaList.length == 0)this.mescroll.resetUpScroll();
				}else{
					if(this.receiveJournalList.length == 0) this.mescroll.resetUpScroll();
				}
			},
			search() {
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					let list = this.current == 0 ? this.sendJournaList : this.receiveJournalList
					list = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f0f2f6;
	}
	.reportLog-v {
		.addBtn{
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
			background-color:rgba(0,140,255,0.7);
			position: fixed;
			bottom: 100rpx;
			right: 40rpx;
			text-align: center;
			.addBtnTxt{
				color: #FFFFFF;
				line-height: 96rpx;
				font-size: 80rpx;
				
			}
		}
		.reportLog-tabs{
		}
		.receiveJournal-list{
			margin: 20rpx 16rpx 0 16rpx;
			background-color: #FFFFFF;
			padding: 16rpx;
			border-radius: 10rpx;
			color: #9a9a9a;
			.receiveJournal-list-txt{
				.receiveJournal-title{
					justify-content: space-between;
					.title{
						color: #333333;
					}
				}
			}
		}
	}
</style>
