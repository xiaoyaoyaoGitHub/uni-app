<template>
	<view class="">

		<view class="selector u-flex" @click="show = true">
			<view class="label">图片分类</view>
			<u-input placeholder="请选择" height="96" v-model="value" :type="type" @click="show = true" />
			<u-action-sheet :list="actions" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		</view>
		<view class="parting"></view>
		<view class="images">
			<uni-file-picker class="upload" mode="grid" v-model="imageValue" file-mediatype="image"
				:image-styles="imageStyles">
				<button class="select-btn"></button>
			</uni-file-picker>
		</view>
		<u-input class="textarea" :custom-style="{background:'#F7F8FA'}" maxlength="100" v-model="value" type="textarea"
			:border="border" height="168" :auto-height="autoHeight" />
		</u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageStyles: {
					width: '160rpx',
					height: '160rpx',
				},

				show: false,
				// 这种情况需要指定range-key为cateName，否则组件不知道该显示对象的哪个属性
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
			}
		},
		methods: {
			actionSheetCallback(index) {
				this.value = this.actionSheetList[index].text;
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		padding: 0 24rpx;

		.selector {

			.label {
				flex: 0 0 160rpx;

			}
		}

		.parting {
			height: 20rpx;
			background: #F7F8FA;
			margin: 0 -24rpx;
		}

		.images {
			padding: 24rpx 0;

			.upload {
				.select-btn {
					border: none;
					background: #F7F8FA;
					width: 160rpx;
					height: 160rpx;
				}
			}

		}

		.textarea {
			background: #F7F8FA;
		}
	}
</style>
