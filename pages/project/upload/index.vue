<template>
	<view class="">

		<view class="selector u-flex" @click="show = true">
			<view class="label">图片分类</view>
			<u-input placeholder="请选择" height="96" v-model="imageType" disabled type="text" @click="show = true" />
			<u-select :list="actions" v-model="show" @confirm="actionSheetCallback"></u-select>
		</view>
		<view class="parting"></view>
		<view class="images">
			<template v-if="imageType === ''">
				<view class="selectCamera u-border" @click="chooseType">
					<u-icon name="camera" color="#DCDEE0"></u-icon>
				</view>
			</template>
			<template v-else>
				<uni-file-picker ref="filePicker" class="upload" @select="select" @progress="progress" mode="grid"
					limit="6" v-model="imageValue" file-mediatype="image" :image-styles="imageStyles"
					:auto-upload="false">
					<view>
						<u-icon name="camera" color="#DCDEE0"></u-icon>
					</view>
				</uni-file-picker>
			</template>
		</view>
		<u-input class="textarea" :custom-style="{background:'#F7F8FA'}" maxlength="100" v-model="textareaValue"
			type="textarea" height="168" />
		</u-picker>
	</view>
</template>

<script>
	import {
		projectImageUpLoad
	} from "@/api/apply/visualDev.js"
	import define from "@/utils/define.js"
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
						label: '土地征拆',
						value: '土地征拆'
					},
					{
						label: '厂房建设',
						value: '厂房建设'
					},
					{
						label: '竣工筹备',
						value: '竣工筹备'

					},
				],
			}
		},
		onLoad() {
			this.projectId = this.$route.query.id
		},
		methods: {
			actionSheetCallback(e) {
				this.imageType = e[0].label
			},
			chooseType() {
				uni.showToast({
					icon: "none",
					title: '请选择图片类型'
				})
				// uni.chooseImage({
				// 	count: 6, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['album'], //从相册选择
				// 	success: (res) => {
				// 		console.log(res.tempFiles);
				// 		const formData = new FormData();
				// 		formData.append('projectId', this.projectId);
				// 		formData.append('category', this.imageType);
				// 		formData.append('description', this.textareaValue);
				// 		formData.append('parentId', 0)
				// 		formData.append('file', res.tempFiles)
				// 		uni.uploadFile({
				// 			url: `${define.baseURL}/api/extend/Document/Uploader`,
				// 			files: res.tempFiles,
				// 			formData: {
				// 				projectId: this.projectId,
				// 				category: this.imageType,
				// 				description: this.textareaValue,
				// 				parentId: 0,
				// 				files: res.tempFiles
				// 			},
				// 			success(res) {
				// 				console.log(res)
				// 			},
				// 			fail(err) {
				// 				console.log(err)
				// 			}
				// 		})
				// 	}
				// });
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
				// const file = e.tempFiles;
				const projectId = this.projectId;
				const documentData = {
					category: this.imageType,
					description: this.textareaValue
				}
				console.log(e)
				uni.uploadFile({
					url: `${define.baseURL}/api/extend/Document/Uploader`,
					files: e.tempFiles,
					formData: {
						projectId,
						category: this.imageType,
						description: this.textareaValue,
						parentId: 0,
						files: e.tempFiles
					},
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
				// const formData = new FormData();
				// formData.append('projectId', projectId);
				// formData.append('category', this.imageType);
				// formData.append('description', this.textareaValue);
				// formData.append('parentId', 0)
				// formData.append('file', e.tempFiles)

				// this.$refs.filePicker.upload()
				// {
				// 	projectId,
				// 	category: this.imageType,
				// 	description: this.textareaValue,
				// 	parentId: 0,
				// 	files: e.tempFiles
				// }
				this.upLoad(formData)
			},
			upLoad(data) {
				// console.log(data.getAll)
				projectImageUpLoad(data).then(res => {
					console.log(res)
				})
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

			.selectCamera {
				width: 140rpx;
				height: 140rpx;
				// margin: 10rpx;
				box-sizing: border-box;
				text-align: center;
				padding-top: 55rpx;
				border-radius: 4rpx;
				overflow: hidden;
			}
		}

		.textarea {
			background: #F7F8FA;
		}
	}
</style>
