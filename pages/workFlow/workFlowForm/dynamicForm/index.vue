<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<jnpf-parser :formConf="formConf" ref="dynamicForm" v-if="!loading" @submit="sumbitForm" :key="key" />
	</view>
</template>

<script>
	import {
		DynamicInfo
	} from '@/api/workFlow/workFlowForm'
	import {
		createModel,
		updateModel,
		getModelInfo
	} from '@/api/apply/visualDev'
	export default {
		data() {
			return {
				loading: true,
				key: +new Date(),
				setting: {},
				formConf: {},
				formData: {},
				eventType: '',
				dataForm: {
					id: '',
					data: '',
					flowId: ''
				}
			}
		},
		methods: {
			init(data) {
				this.setting = data
				this.formConf = data.formConf ? JSON.parse(data.formConf) : {}
				this.dataForm.id = data.id || ''
				this.loading = true
				this.$nextTick(() => {
					if (this.dataForm.id) {
						if (data.type == 1) {
							getModelInfo(data.flowId, this.dataForm.id).then(res => {
								this.dataForm = res.data
								if (!this.dataForm.data) return
								this.formData = JSON.parse(this.dataForm.data)
								this.fillFormData(this.formConf, this.formData)
								this.$nextTick(() => {
									this.loading = false
								})
							})
						} else {
							DynamicInfo(this.dataForm.id).then(res => {
								this.dataForm = res.data
								if (!this.dataForm.data) return
								this.formData = JSON.parse(this.dataForm.data)
								this.fillFormData(this.formConf, this.formData)
								this.$nextTick(() => {
									this.loading = false
								})
							})
						}
					} else {
						this.formData = {}
						this.fillFormData(this.formConf, this.formData)
						this.$nextTick(() => {
							this.loading = false
						})
						this.dataForm.flowId = data.flowId
					}
					this.key = +new Date()
				})
			},
			fillFormData(form, data) {
				form.disabled = this.setting.readonly
				const loop = list => {
					for (let i = 0; i < list.length; i++) {
						let item = list[i]
						if (item.__vModel__) {
							const val = data[item.__vModel__]
							if (val) item.__config__.defaultValue = val
							let noShow = false,
								isDisabled = true
							if (this.setting.formOperates && this.setting.formOperates.length) {
								let arr = this.setting.formOperates.filter(o => o.id === item.__vModel__) || []
								if (arr.length) {
									let obj = arr[0]
									noShow = !obj.read
									isDisabled = !obj.write
								}
							} else {
								isDisabled = false
							}
							isDisabled = item.disabled ? item.disabled : isDisabled
							noShow = item.__config__.noShow ? item.__config__.noShow : noShow
							if (this.setting.readonly) isDisabled = true
							this.$set(item, 'disabled', isDisabled)
							this.$set(item.__config__, 'noShow', noShow)
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
				this.dataForm.data = JSON.stringify(data)
				if (this.setting.type == 1) {
					if (this.eventType === 'save' || this.eventType === 'submit') {
						this.selfSubmit()
						return
					}
					this.$emit('eventReciver', this.dataForm, this.eventType)
				} else {
					this.$emit('eventReciver', this.dataForm, this.eventType)
				}
			},
			selfSubmit() {
				this.dataForm.status = this.eventType === 'submit' ? 0 : 1
				if (this.eventType === 'save') return this.selfHandleRequest()
				uni.showModal({
					title: '提示',
					content: '您确定要提交当前流程吗？',
					success: res => {
						if (res.confirm) {
							this.selfHandleRequest()
						}
					}
				})
			},
			selfHandleRequest() {
				if (!this.dataForm.id) delete(this.dataForm.id)
				if (this.eventType === 'save') this.$emit('setBtnLoad', true)
				const formMethod = this.dataForm.id ? updateModel : createModel
				formMethod(this.setting.flowId, this.dataForm).then(res => {
					uni.showToast({
						title: res.msg,
						complete: () => {
							setTimeout(() => {
								uni.$emit('refresh')
								if (this.eventType === 'save') this.$emit('setBtnLoad', false)
								uni.navigateBack()
							}, 1500)
						}
					})
				}).catch(() => {
					if (this.eventType === 'save') this.$emit('setBtnLoad', false)
				})
			},
			submit(eventType) {
				if (this.setting.isPreview == '1') {
					uni.showToast({
						title: '功能预览不支持数据保存',
						icon: 'none'
					})
					return
				}
				this.eventType = eventType
				this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
			},
			// resetForm() {
			// 	this.key = +new Date()
			// 	this.$refs.dynamicForm && this.$refs.dynamicForm.resetForm()
			// }
		}
	}
</script>
