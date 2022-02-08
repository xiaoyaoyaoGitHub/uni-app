<template>
	<view class="">

		<view class="selector u-flex" @click="show = true">
			<view class="label">图片分类</view>
			<u-input placeholder="请选择" height="96" v-model="imageType" disabled type="text" @click="show = true" />
			<u-select :list="actions" v-model="show" @confirm="actionSheetCallback"></u-select>
		</view>
		<view class="parting"></view>
		<view class="images">
			<uni-file-picker class="upload" mode="grid" v-model="imageValue" file-mediatype="image"
				:image-styles="imageStyles">
				<view>
					<u-icon name="camera" color="#DCDEE0"></u-icon>
				</view>
			</uni-file-picker>
		</view>
		<u-input class="textarea" :custom-style="{background:'#F7F8FA'}" maxlength="100" v-model="textareaValue"
			type="textarea" height="168" />
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
				imageType: '',
				show: false,
				imageValue: [],
				textareaValue: '',
				// 这种情况需要指定range-key为cateName，否则组件不知道该显示对象的哪个属性
				actions: [{
						label: 'type1',
						value: '1'
					},
					{
						label: 'type2',
						value: '2'
					},
					{
						label: 'type3',
						value: '3'

					},
				],
			}
		},
		methods: {
			actionSheetCallback(e) {
				console.log(e)
				this.imageType = e[0].label
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

			.file-picker__box {
				margin-right: 20rpx;
			}
		}

		.textarea {
			background: #F7F8FA;
		}
	}
</style>
