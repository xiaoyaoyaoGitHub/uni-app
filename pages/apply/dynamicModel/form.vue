<template>
	<view class="dynamicModel-form-v jnpf-wrap jnpf-wrap-form" v-if="showPage">
		<jnpf-parser :formConf="formConf" ref="dynamicForm" v-if="!loading" @submit="sumbitForm" :key="key" />
		<view class="buttom-actions">
			<u-button class="buttom-btn" @click="jnpf.goBack">{{formConf.cancelButtonText||'取消'}}</u-button>
			<u-button class="buttom-btn" type="primary" @click="submit" :loading="btnLoading">
				{{formConf.confirmButtonText||'确定'}}
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		getConfigData,
		createModel,
		updateModel,
		getModelInfo
	} from '@/api/apply/visualDev'
	export default {
		data() {
			return {
				webType: '',
				showPage: false,
				btnLoading: false,
				loading: true,
				isPreview: '0',
				modelId: '',
				formConf: {},
				formData: {},
				dataForm: {
					id: '',
					data: ''
				},
			}
		},
		onLoad(option) {
			this.modelId = option.modelId;
			this.isPreview = option.isPreview || '0';
			this.dataForm.id = option.id || ''
			uni.setNavigationBarTitle({
				title: this.dataForm.id ? '编辑' : '新增'
			})
			this.getConfigData()
		},
		methods: {
			getConfigData() {
				getConfigData(this.modelId).then(res => {
					if (res.code !== 200 || !res.data) {
						uni.showToast({
							title: '暂无此页面',
							icon: 'none',
							complete: () => {
								setTimeout(() => {
									uni.navigateBack()
								}, 1500)
							}
						})
						return
					}
					this.formConf = res.data.formData ? JSON.parse(res.data.formData) : {}
					this.showPage = true
					this.initData()
				})
			},
			initData() {
				this.$nextTick(() => {
					if (this.dataForm.id) {
						getModelInfo(this.modelId, this.dataForm.id).then(res => {
							this.dataForm = res.data
							if (!this.dataForm.data) return
							this.formData = JSON.parse(this.dataForm.data)
							this.fillFormData(this.formConf, this.formData)
							this.$nextTick(() => {
								this.loading = false
							})
						})
					} else {
						this.formData = {}
						this.loading = false
					}
					this.key = +new Date()
				})
			},
			fillFormData(form, data) {
				const loop = list => {
					for (let i = 0; i < list.length; i++) {
						let item = list[i]
						if (item.__vModel__) {
							const val = data[item.__vModel__]
							if (val) item.__config__.defaultValue = val
						}
						if (item.__config__ && item.__config__.jnpfKey !== 'table' && item.__config__.children && Array
							.isArray(item.__config__.children)) {
							loop(item.__config__.children)
						}
					}
				}
				loop(form.fields)
			},
			sumbitForm(data) {
				if (!data) return
				this.btnLoading = true
				this.dataForm.data = JSON.stringify(data)
				const formMethod = this.dataForm.id ? updateModel : createModel
				formMethod(this.modelId, this.dataForm).then(res => {
					uni.showToast({
						title: res.msg,
						complete: () => {
							setTimeout(() => {
								uni.$emit('refresh')
								this.btnLoading = false
								uni.navigateBack()
							}, 1500)
						}
					})
				}).catch(() => {
					this.btnLoading = false
				})
			},
			submit() {
				if (this.isPreview == '1') {
					uni.showToast({
						title: '功能预览不支持数据保存',
						icon: 'none'
					})
					return
				}
				this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.dynamicModel-form-v {}
</style>
