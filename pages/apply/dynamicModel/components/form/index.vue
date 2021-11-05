<template>
	<view class="cudt-wrap cudt-wrap-form">
		<cudt-parser :formConf="formData" ref="dynamicForm" v-if="!loading" @submit="sumbitForm" :key="key" />
		<view class="buttom-actions">
			<u-button class="buttom-btn" @click="resetForm">重置</u-button>
			<u-button class="buttom-btn" type="primary" @click="submit" :loading="btnLoading">
				{{formData.confirmButtonText||'确定'}}
			</u-button>
		</view>
	</view>
</template>

<script>
	import {
		createModel
	} from '@/api/apply/visualDev'
	export default {
		props: ['config', 'modelId', 'isPreview'],
		data() {
			return {
				dataForm: {
					data: ''
				},
				formData: {},
				key: +new Date(),
				btnLoading: false,
				loading: true,
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				this.formData = JSON.parse(this.config.formData)
				this.loading = true
				this.$nextTick(() => {
					this.loading = false
					this.key = +new Date()
				})
			},
			sumbitForm(data) {
				if (!data) return
				this.btnLoading = true
				this.dataForm.data = JSON.stringify(data)
				createModel(this.modelId, this.dataForm).then(res => {
					uni.showToast({
						title: res.msg,
						complete: () => {
							setTimeout(() => {
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
			},
			resetForm() {
				this.loading = true
				this.key = +new Date()
				this.$nextTick(() => {
					this.loading = false
					this.$refs.dynamicForm && this.$refs.dynamicForm.resetForm()
				})
			}
		}
	}
</script>
