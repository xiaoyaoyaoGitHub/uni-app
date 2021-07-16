<template>
	<view class="logForm-v jnpf-wrap">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<jnpfFormControl :formData='filedList' ref="formControl" @submit="submitForm" v-if="flag" :webType='webType'
				:dataForm="dataForm" @addTable='addTable' @delItem='delItem' :flag='flag' />
			<view class="buttom-actions">
				<u-button class="buttom-btn" @click="jnpf.goBack">{{filedList.cancelButtonText}}</u-button>
				<u-button class="buttom-btn" type="primary" @click="submit">{{filedList.confirmButtonText}}</u-button>
			</view>
		</u-form>
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
				filedList: {},
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
			/* 判断url里面有没有id 返回true/false  修改表单的id*/
			this.isId = Object.prototype.hasOwnProperty.call(option, 'id');
			this.featuresId = option.featuresId
			this.init(this.featuresId);
			this.id = option.id
			
		},

		mounted() {
			this.$refs.dataForm.setRules(this.rules);
		},
		methods: {
			init() {
				this.$nextTick(function() {
					config(this.featuresId).then(res => {
						this.filedList = JSON.parse(res.data.formData);
						this.webType = res.data.webType
						let fields = this.filedList.fields;
						let required;
						let label;
						let vModel;
						let children;
						let cardRequired;
						let cardVModel;
						let cardLabel;
						let jnpfKey;
						for (let i = 0; i < fields.length; i++) {
							required = fields[i].__config__.required;
							label = fields[i].__config__.label;
							vModel = fields[i].__vModel__;
							jnpfKey = fields[i].__config__.jnpfKey;
							if (required) {
								this.rules[vModel] = [{
									required: true,
									message: label + '不能为空',
									trigger: 'blur'
								}];
								if (vModel.indexOf('dateField') >= 0 ||
									vModel.indexOf('selectField') >= 0 || vModel.indexOf('radioField') >=
									0 || vModel.indexOf(
										'switchField') >= 0 || vModel.indexOf(
										'numInputField') >= 0) {
									this.rules[vModel] = this.rules[vModel].map(o => ({
										type: 'number',
										...o
									}))
								} else if (vModel.indexOf('checkboxField') >= 0 || vModel.indexOf(
										'addressField') >= 0) {
									this.rules[vModel] = this.rules[vModel].map(o => ({
										type: 'array',
										...o
									}))
								}
							}
							if (jnpfKey == 'card' || jnpfKey == 'table') {
								children = fields[i].__config__.children || [];
								let item = {};
								for (let c = 0; c < children.length; c++) {
									cardRequired = children[c].__config__.required;
									cardVModel = children[c].__vModel__;
									cardLabel = children[c].__config__.label;
									item[cardVModel] = '';
									if (cardVModel.indexOf('numInputField') >= 0) {
										item[cardVModel] = 0
									}
									if (cardRequired) {
										this.rules[cardVModel] = [{
											required: true,
											message: cardLabel + '不能为空',
											trigger: 'blur'
										}];
										if (cardVModel.indexOf('dateField') >= 0 ||
											cardVModel.indexOf('selectField') >= 0 || cardVModel.indexOf(
												'radioField') >= 0 ||
											cardVModel.indexOf('switchField') >= 0 || cardVModel.indexOf(
												'numInputField') >= 0) {
											this.rules[cardVModel] = this.rules[cardVModel].map(o => ({
												type: 'number',
												...o
											}))
										} else if (cardVModel.indexOf('checkboxField') >= 0 || cardVModel
											.indexOf(
												'addressField') >= 0) {
											this.rules[cardVModel] = this.rules[cardVModel].map(o => ({
												type: 'array',
												...o
											}))
										}
									}
									this.dataForm[vModel] = [];
									this.dataForm[vModel].push(item)
								}
							}
						}
						if (this.isId) {
							wirteBack(this.id, this.featuresId).then(res => {
								this.dataForm = JSON.parse(res.data.data);
								this.dataForm.id = this.id;
								if (this.dataForm) this.flag = true;
							})
						}
						this.flag = true
					})
				})
			},
			// #ifdef MP-WEIXIN
			addTable(items) {
				if (!items.disabled) {
					this.$forceUpdate();
					let childItem = {};
					let list = this.dataForm[items.__vModel__];
					for (var j = 0; j < items.__config__.children.length; j++) {
						let e = items.__config__.children[j]
						childItem[e.__vModel__] = '';
					}
					this.dataForm[items.__vModel__].push(childItem)
					this.$forceUpdate();
					uni.showToast({
						title: '添加成功',
						duration: 1000
					});
				}
			},
			delItem(i, model) {
				uni.showModal({
					content: '确定删除子表？',
					success: (res) => {
						if (res.confirm) {
							this.dataForm[model].splice(i, 1);
							uni.showToast({
								title: '删除成功',
								duration: 1000
							});
						}
					}
				});
			},
			// #endif
			submit() {
				this.$refs.formControl.submitForm()
			},
			submitForm() {
				this.$refs.dataForm.validate((valid) => {
					if (valid) {
						const method = this.$refs.formControl.dataForm.id ? update : create;
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
										uni.$emit('refresh')
										uni.navigateBack()
									}, 1500)
								}
							})
						})
					}
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
