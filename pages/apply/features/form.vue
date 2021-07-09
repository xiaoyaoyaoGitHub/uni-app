<template>
	<view>
		<jnpfFormControl :formData='formData' ref="formControl" @submit="submitForm" v-if="flag" :webType='webType' />
		<view class="buttom-actions">
			<u-button class="buttom-btn" @click="jnpf.goBack">{{formData.cancelButtonText}}</u-button>
			<u-button class="buttom-btn" type="primary" @click="submit">{{formData.confirmButtonText}}</u-button>
		</view>
	</view>
</template>

<script>
	import {
		config,
		create,
		update,
		wirteBack
	} from '@/api/apply/features.js'
	import jnpfFormControl from "@/components/jnpf/jnpf-formControl/index.vue"
	export default {
		components: {
			jnpfFormControl
		},
		data() {
			return {
				formData: {},
				dataForm: {},
				rules: {},
				isId: false,
				featuresId: '',
				webType: '',
				flag: false,
				wirteData: {}
			}
		},
		onLoad(option) {
			let featuresId = option.featuresId
			/* 判断url里面有没有id 返回true/false  修改表单的id*/
			this.isId = Object.prototype.hasOwnProperty.call(option, 'id');
			this.featuresId = option.featuresId;
			if (this.isId) {
				this.id = option.id
			}
			this.init(featuresId);
		},
		onUnload() {
			this.eventHub.$off('refresh')
		},
		methods: {
			init(id) {
				config(id).then(res => {
					this.formData = JSON.parse(res.data.formData);
					this.webType = res.data.webType;
					if (this.isId) {
						wirteBack(this.id, this.featuresId).then(res => {
							let data = JSON.parse(res.data.data);
							data.id = res.data.id;
							this.$refs.formControl.dataForm = data
							this.flag = true
						})
					}
					this.flag = true
				})
			},
			submit() {
				this.$refs.formControl.submitForm()
			},
			submitForm() {
				const method = this.$refs.formControl.dataForm.id ? update : create;
				console.log(method)
				let data = {
					data: JSON.stringify(this.$refs.formControl.dataForm)
				}
				if (this.isId) {
					data.id = this.id
				}
				method(data, this.featuresId).then(res => {
					uni.showToast({
						title: res.msg,
						complete: () => {
							setTimeout(() => {
								this.eventHub.$emit('refresh')
								uni.navigateBack()
							}, 1500)
						}
					})
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.logForm-v {
		padding-bottom: 140rpx;

		.btnBox {
			width: 100%;
			height: 86rpx;
			position: fixed;
			bottom: 0rpx;

			.u-size-medium {
				width: 100%;
				border: 'none',
			}
		}
	}
</style>
