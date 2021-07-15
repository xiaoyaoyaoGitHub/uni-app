<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<jnpfFormControl :formData='filedList' ref="dynamicForm" :dataForm='dataForm' v-if="flag"
				@addTable='addTable' @delItem='delItem' />
		</u-form>
	</view>
</template>


<script>
	import {
		DynamicInfo
	} from '@/api/workFlow/workFlowForm'
	import {
		previewDataInterface
	} from '@/api/common.js'
	import jnpfFormControl from "@/components/jnpf/jnpf-formControl/index.vue"
	export default {
		components: {
			jnpfFormControl
		},
		name: 'dynamicForm',
		data() {
			return {
				filedList: {},
				setting: {},
				dataForm: {
					tableField112: [{
							timeField113: ''
						},
						{
							timeField113: ''
						},
					]
				},
				rules: {},
				tableVmodel: [],
				options: [],
				limit: {},
				flag: false
			}
		},
		mounted() {
			this.$refs.dataForm.setRules(this.rules);
		},
		methods: {
			changeRate(e, model) {
				let rateVal = e;
				this.$set(this.dataForm, model, rateVal)
			},
			init(data) {
				this.dataForm = {}
				this.dataForm.id = data.id || '';
				this.setting = data;
				let filedList = JSON.parse(this.setting.formConf);
				this.filedList = filedList;

				this.flag = true
				let fields = this.filedList.fields;
				let formOperates = data.formOperates;

				let defaultValue;
				let vModel;
				let dataType;
				let propsUrl;
				let dynamicList;
				let jnpfKey;
				let children;
				let required;
				let label;
				let isShow;
				let newFields = [];
				for (let i = 0; i < fields.length; i++) {
					defaultValue = fields[i].__config__.defaultValue;
					vModel = fields[i].__vModel__;
					dataType = fields[i].__config__.dataType;
					propsUrl = fields[i].__config__.propsUrl;
					jnpfKey = fields[i].__config__.jnpfKey;
					required = fields[i].__config__.required;
					label = fields[i].__config__.label;
					isShow = fields[i].__config__.noShow;
					/* 表单权限处理 */
					for (let key in formOperates) {
						fields[i].disabled = this.judgeWrite(vModel)
						if (formOperates.length > 0) {
							if (vModel == formOperates[key].id) {
								if (!isShow) {
									fields[i].__config__.noShow = !this.judgeShow(vModel);
								}
							}
						}
					}
					/* 表单权限处理End */
					if (required) {
						this.rules[vModel] = [{
							required: true,
							message: label + '不能为空',
							trigger: 'blur',
						}];
						if (vModel.indexOf('dateField') >= 0 ||
							vModel.indexOf('selectField') >= 0 || vModel.indexOf('radioField') >= 0 || vModel.indexOf(
								'switchField') >= 0 || vModel.indexOf(
								'numInputField') >= 0) {
							this.rules[vModel] = this.rules[vModel].map(o => ({
								type: 'number',
								...o
							}))
						} else if (vModel.indexOf('checkboxField') >= 0 || vModel.indexOf('addressField') >= 0) {
							this.rules[vModel] = this.rules[vModel].map(o => ({
								type: 'array',
								...o
							}))
						}
					}
					if (defaultValue) this.$set(this.dataForm, vModel, defaultValue);
					
					if (jnpfKey == 'card' || jnpfKey == 'table') {
						let item = {};
						children = fields[i].__config__.children;
						let card_defaultValue;
						let card_vModel;
						let card_dataType;
						let card_propsUrl;
						let card_dynamicList;
						let card_jnpfKey;
						let card_required;
						let card_label;
						let card_noShow;
						for (let j = 0; j < children.length; j++) {
							card_dataType = children[j].__config__.dataType;
							card_propsUrl = children[j].__config__.propsUrl;
							card_jnpfKey = children[j].__config__.jnpfKey;
							card_defaultValue = children[j].__config__.defaultValue;
							card_vModel = children[j].__vModel__;
							card_label = children[j].__config__.label;
							card_required = children[j].__config__.required;
							card_noShow = children[j].__config__.noShow
							item[card_vModel] = card_defaultValue;
							children[j].disabled = this.judgeWrite(card_vModel)
							/* 表单权限处理 */
							if (jnpfKey == 'card') {
								if (formOperates.length > 0) {
									if (card_vModel == formOperates[i].id) {
										if (!card_noShow) {
											children[j].__config__.noShow = !this.judgeShow(card_vModel)
										}
									}
								}
							}
							/* 表单权限处理End */

							if (card_defaultValue) this.$set(this.dataForm, card_vModel, card_defaultValue);
							if (card_dataType == 'dynamic') {
								this.dynamicHandel(card_propsUrl, children[j], card_jnpfKey)
							}
							if (card_required) {
								this.rules[card_vModel] = [{
									required: true,
									message: card_label + '不能为空',
									trigger: 'change'
								}];
								if (card_vModel.indexOf('dateField') >= 0 ||
									card_vModel.indexOf('selectField') >= 0 || card_vModel.indexOf('radioField') >= 0 ||
									card_vModel.indexOf('switchField') >= 0 || card_vModel.indexOf(
										'numInputField') >= 0) {
									this.rules[card_vModel] = this.rules[card_vModel].map(o => ({
										type: 'number',
										...o
									}))
								} else if (card_vModel.indexOf('checkboxField') >= 0 || card_vModel.indexOf(
										'addressField') >= 0) {
									this.rules[card_vModel] = this.rules[card_vModel].map(o => ({
										type: 'array',
										...o
									}))
								}
							}
						}
						this.dataForm[vModel] = [];
						this.dataForm[vModel].push(item)
					}
					if (dataType == 'dynamic') {
						this.dynamicHandel(propsUrl, fields[i], jnpfKey)
					}
				}


				if (data.id) {
					DynamicInfo(data.id).then(res => {
						this.dataForm = JSON.parse(res.data.data)
					})
				}
			},

			dynamicHandel(propsUrl, item, jnpfKey) {
				previewDataInterface(propsUrl).then(res => {
					if (res.data) {
						if (jnpfKey == 'select' || jnpfKey == 'radio' || jnpfKey == 'checkbox') {
							item.__slot__.options = res.data;
						} else {
							item.options = res.data;
						}
					}
				})
			},
			// #ifdef MP-WEIXIN
			addTable(items) {
				if (!items.disabled) {
					let childItem = {};
					let list = this.dataForm[items.__vModel__];
					for (var j = 0; j < items.__config__.children.length; j++) {
						let e = items.__config__.children[j]
						childItem[e.__vModel__] = e.__config__.defaultValue
					}
					this.dataForm[items.__vModel__].push(childItem)
					uni.showToast({
						title: '添加成功',
						duration: 1000
					});
				}
			},
			delItem(i, model) {
				uni.showModal({
					content: '确定删除子表？',
					success:  (res)=> {
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
			/* 可见 */
			judgeShow(id) {
				if (this.setting.opType == 4) return true
				if (!this.setting.formOperates || !this.setting.formOperates.length) return true
				let arr = this.setting.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return true
				let item = arr[0]
				return item.read
			},
			/* 可写 */
			judgeWrite(id) {
				if (this.setting.readonly) return true
				if (!this.setting.formOperates || !this.setting.formOperates.length) return false
				let arr = this.setting.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return true
				let item = arr[0]
				return !item.write
			},
			submit(eventType) {
				this.$refs.dataForm.validate((valid) => {
					if (valid) {
						let data = this.$refs.dynamicForm.dataForm
						const query = {
							flowId: this.setting.flowId,
							data: JSON.stringify(data),
							id: this.setting.id
						}
						this.$emit('eventReciver', query, eventType)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	uni-view {
		// display: inline;
	}

	.badge-button {
		padding: 4rpx 6rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 1;
	}
</style>
