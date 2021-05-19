<template>
	<view class="contacts-v">
		<view class="search-box">
			<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72" :show-action="false" @change="search"
				bg-color="#f0f2f6" shape="square">
			</u-search>
		</view>
		<view class="list">
			<u-index-list :scrollTop="scrollTop" :index-list="indexList">
				<view v-for="(item, index) in treeData" :key="index">
					<u-index-anchor :index="item.letter" />
					<view class="list-cell u-border-bottom" v-for="(childItem, childIndex) in item.data"
						:key="childIndex">
						<u-avatar :src="define.baseURL+childItem.headIcon"></u-avatar>
						<view class="list-cell-txt">
							<view class="u-font-30">{{childItem.realName}}/{{childItem.account}}</view>
							<view class="u-font-24 department">{{childItem.department}}</view>
						</view>
					</view>
				</view>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	const letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
		"T", "U", "V", "W", "X", "Y", "Z", "#"
	];
	import {
		getUserAll
	} from '@/api/common.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				keyword: '',
				userList: [],
				treeData: [],
				indexList: []
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				getUserAll().then(res => {
					let list = res.data.list || []
					list = list.map(o => ({
						...o,
						letter: o.quickQuery ? o.quickQuery.substr(0, 1).toUpperCase() : '#'
					}))
					this.userList = list
					this.getTree(list)
				})
			},
			getTree(list) {
				let treeData = []
				for (let i = 0; i < letterArr.length; i++) {
					let item = {
						letter: letterArr[i],
						data: []
					}
					for (let j = 0; j < list.length; j++) {
						if (letterArr[i] === list[j].letter) {
							item.data.push(list[j])
						}
					}
					treeData.push(item)
				}
				treeData = treeData.filter(o => o.data.length)
				this.indexList = treeData.map(o => o.letter)
				if (this.keyword) this.indexList = []
				this.treeData = treeData
			},
			search(val) {
				let list = this.userList.filter(o => o.realName.indexOf(val) > -1 || o.account.indexOf(val) > -1 || o
					.quickQuery.indexOf(val) > -1)
				this.getTree(list)
			}
		}
	}
</script>

<style lang="scss">
	.contacts-v {
		.list-cell {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 20rpx 32rpx;
			overflow: hidden;
			color: $u-content-color;
			font-size: 28rpx;
			line-height: 24px;
			background-color: #fff;

			.list-cell-txt {
				margin-left: 20rpx;

				.department {
					color: #9A9A9A;
				}
			}
		}
	}
</style>
