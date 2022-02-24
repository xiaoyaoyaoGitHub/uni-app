<template>
	<view class="container">
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
				<uni-file-picker ref="filePicker" class="upload" @select="select" @fail="fail" mode="grid" limit="6"
					v-model="imageValue" file-mediatype="image" :image-styles="imageStyles" return-type="array"
					:del-icon="false" :auto-upload="false">
					<view>
						<u-icon name="camera" color="#DCDEE0"></u-icon>
					</view>
				</uni-file-picker>
			</template>
		</view>
		<u-input class="textarea u-p-10" :custom-style="{background:'#F7F8FA'}" maxlength="100" v-model="textareaValue"
			type="textarea" height="168" />
		</u-picker>
		<view class="u-p-t-20 u-p-r-20 u-p-l-20">
			<span @click="uploadAllInfo">上传</span>
		</view>
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
				fileLists: [],
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
		onLoad(params) {
			this.projectId = params.id
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
			},
			upload(path_arr) {


			},
			// 获取上传状态
			select(e) {
				const {
					tempFiles,
					tempFilePaths
				} = e || {};
				console.log(e)
				this.fileLists = this.fileLists.concat(tempFiles);
				console.log(this.fileLists)
			},
			fail(e) {
				console.log('上传失败', e)
			},
			reuqest() {
				const files = [];
				this.fileLists.map(item => {
					files.push(item.file)
				})
				projectImageUpLoad({
					projectId: this.projectId,
					category: this.imageType,
					description: this.textareaValue,
					parentId: 0,
					files
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			uploadAllInfo() {
				uni.showLoading({
					title:'上传中'
				})
				this.fileLists.map(item => {
					item.uri = item.url
				})
				try {
					uni.uploadFile({
						url: `${define.baseURL}/api/extend/Document/uploader/app`,
						files:this.fileLists,
						header: {
							"Authorization": uni.getStorageSync('token') || '',
							'Content-Type': 'multipart/form-data',
						},
						fileType: 'image',
						name: 'file',
						formData: {
							projectId: this.projectId,
							category: this.imageType,
							description: this.textareaValue,
							parentId: 0,
						},
						success(res) {
							uni.hideLoading()
							const {
								statusCode,
								data
							} = res || {};
							if (statusCode === 200) {
								const result = JSON.parse(data);
								const {
									code
								} = result || {};
								console.log(result)
								if (code === 200) {
									uni.showToast({
										icon: 'success',
										title: '上传成功',
										duration: 3000,
										mask: true,
										complete() {
											setTimeout(() => {
												uni.navigateBack({
													delta: 1,
													animationType: 'pop-out',
													animationDuration: 200
												})
												uni.$emit('upLoadImageSuccess')
											}, 3000)
										}
									})
								} else {
									uni.showToast({
										icon: 'fail',
										title: '上传失败'
									})
								}
							}
						},
						fail(err) {
							console.log(err)
							uni.hideLoading()
							uni.showToast({
								icon: 'fail',
								title: '上传失败'
							})
						}
					})
				} catch (err) {
					console.log(err)
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

		.container {
			padding: 0 24rpx;
		}

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
