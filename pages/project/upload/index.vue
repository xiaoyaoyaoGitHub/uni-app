<template>
	<view class="">
		<!-- <web-view src="/hybrid/html/upload.html"></web-view> -->
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
					return-type="array" :del-icon="false" :auto-upload="false">
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
			<u-button :disabled="imageType === ''" type="primary" @click="uploadAllInfo">上传</u-button>
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
			},
			upload_one(file) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: `${define.baseURL}/api/extend/Document/Uploader`,
						file: file,
						name: 'file',
						header: {
							"Authorization": uni.getStorageSync('token') || ''
						},
						formData: {
							projectId: this.projectId,
							category: this.imageType,
							description: this.textareaValue,
							parentId: 0,
						},
						success(res) {
							const {
								statusCode,
								data
							} = res || {};
							if (statusCode === 200) {
								const result = JSON.parse(data);
								const {
									code
								} = result || {};
								resolve(result)
								if (code === 200) {
									resolve(result)
								} else {
									resolve(null)
								}
							}
						},
						fail(err) {
							reject(err)
						}
					})
				})

			},
			upload(path_arr) {
				let num = path_arr.length;
				return new Promise(async (resolve, reject) => {
					let img_urls = []
					for (let i = 0; i < num; i++) {
						let img_url = await this.upload_one(path_arr[i]);

						img_urls.push(img_url)
					};
					resolve(img_urls)
				})


			},
			// 获取上传状态
			select(e) {
				const {
					tempFiles
				} = e || {};
				this.fileLists = this.fileLists.concat(tempFiles)
				// uni.uploadFile({
				// 	url: `${define.baseURL}/api/extend/Document/Uploader`,
				// 	file: this.fileLists,
				// 	header: {
				// 		"Authorization": uni.getStorageSync('token') || ''
				// 	},
				// 	formData: {
				// 		projectId: this.projectId,
				// 		category: this.imageType,
				// 		description: this.textareaValue,
				// 		parentId: 0,
				// 	},
				// 	success(res) {
				// 		const {
				// 			statusCode,
				// 			data
				// 		} = res || {};
				// 		if (statusCode === 200) {
				// 			const result = JSON.parse(data);
				// 			const {
				// 				code
				// 			} = result || {};
				// 			resolve(result)
				// 			if (code === 200) {
				// 				resolve(result)
				// 			} else {
				// 				resolve(null)
				// 			}
				// 		}
				// 	},
				// 	fail(err) {
				// 		reject(err)
				// 	}
				// })


			},
			async uploadAllInfo() {
				uni.showLoading({
					title: '上传中'
				})
				const lists = await this.upload(this.fileLists);
				uni.hideLoading()
				lists.map((item, index) => {
					if (!item) {
						uni.showToast({
							icon: 'none',
							title: `第${index}张上传失败`
						})
					}
				})
			},
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
