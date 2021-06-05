<template>
	<view class="cancellation-v">
		<view class="cancellation-hd">
			<image :src="accountSecurity"></image>
		</view>
		<view class="content u-flex-col">
			<view class="content-text u-flex-col">
				<text class="content-title u-font-36 u-type-primary">确认注销账户？</text>
				<text class="content-tip u-font-28">注销账户后以下数据将全部清空</text>
				<view class="list u-flex-col u-font-26">
					<text class="item">企业组织架构和员工信息</text>
					<text class="item">所有数据和聊天记录</text>
					<text class="item">删除和永久注销JNPF账户</text>
				</view>
			</view>
			<view class="btn">
				<u-button type="primary" :custom-style="customStyle" @click="open">注销账号</u-button>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :show-cancel-button='true' :width='500' @confirm="cancellation" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	export default {
		data() {
			return {
				accountSecurity: resources.banner.accountSecurity,
				customStyle: {
					height: '100rpx'
				},
				show: false,
				content: '您的JNPF账号将被删除，您确定要注销JNPF账号么？'
			}
		},
		methods: {
			open(){
				this.show = true;
			},
			cancellation() {
				console.log('确定')
			},
			cancel(){
				console.log('取消')
			}
		}
	}
</script>

<style lang="scss">
	$padding-l : 0 16rpx;
	page {
		// background-color: #f0f2f6;
	}
	
	.cancellation-v {
		.cancellation-hd {
			width: 100%;
			height: 280rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			.content-text {
				justify-content: center;
				padding: 176rpx 0 0 204rpx;
			}

			.content-title {
				height: 100rpx;
				font-weight: 700;
			}

			.content-tip {
				height: 80rpx;
				color: #252B3A;
			}

			.list {
				.item {
					margin-bottom: 35rpx;
					color: #666;
					display: flex;
					flex-direction: row;
					align-items: center;
					&::before {
						content: "";
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						background-color: #356efe;
						margin-right: 30rpx;
					}
				}
			}
			
			.btn {
				padding: $padding-l;
				width: 100%;
				position: fixed;
				bottom: 20rpx;
				margin: 0 auto;
			}

		}
	}
</style>
