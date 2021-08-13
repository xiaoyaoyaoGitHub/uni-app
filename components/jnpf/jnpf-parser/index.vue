<template>
	<u-form :model="formData" :rules="rules" ref="dataForm" :errorType="['toast']"
		:label-position="formConf.labelPosition==='top'?'top':'left'" :label-width="formConf.labelWidth*1.5"
		:label-align="formConf.labelPosition==='right'?'right':'left'" class="jnpf-form">
		<template v-for="(item, index) in formConfCopy.fields">
			<Item :key="index" :item="item" :formConf="formConf" @input="setValue"
				:ref="item.__vModel__?item.__vModel__: undefined" v-if="!item.__config__.noShow" />
		</template>
	</u-form>
</template>
<script>
	import Item from './Item'
	import {
		getDictionaryDataSelector,
		previewDataInterface
	} from '@/api/common'
	const dyOptionsList = ['radio', 'checkbox', 'select', 'cascader', 'treeSelect']

	export default {
		components: {
			Item
		},
		props: {
			formConf: {
				type: Object,
				required: true
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			const data = {
				formConfCopy: this.$u.deepClone(this.formConf),
				formData: {},
				rules: {},
				tableRefs: {}
			}
			this.initFormData(data.formConfCopy.fields, data.formData, data.tableRefs)
			this.buildRules(data.formConfCopy.fields, data.rules)
			this.buildOptions(data.formConfCopy.fields)
			return data
		},
		mounted() {
			this.$refs.dataForm.setRules(this.rules);
		},
		methods: {
			initFormData(componentList, formData, tableRefs) {
				componentList.forEach(cur => {
					const config = cur.__config__
					if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
					if (config.children && cur.__config__.jnpfKey !== 'table') {
						this.initFormData(config.children, formData)
					}
					if (cur.__config__.jnpfKey == 'table' && !cur.__config__.noShow) {
						tableRefs[cur.__vModel__] = cur
					}
				})
			},
			buildOptions(componentList) {
				componentList.forEach(cur => {
					const config = cur.__config__
					if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
						let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
						if (config.dataType === 'dictionary') {
							if (!config.dictionaryType) return
							isTreeSelect ? cur.options = [] : cur.__slot__.options = []
							getDictionaryDataSelector(config.dictionaryType).then(res => {
								isTreeSelect ? cur.options = res.data.list : cur.__slot__.options = res
									.data.list
							})
						}
						if (config.dataType === 'dynamic') {
							if (!config.propsUrl) return
							isTreeSelect ? cur.options = [] : cur.__slot__.options = []
							previewDataInterface(config.propsUrl).then(res => {
								isTreeSelect ? cur.options = res.data : cur.__slot__.options = res.data
							})
						}
					}
					if (config.children) this.buildOptions(config.children)
				})
			},
			buildRules(componentList, rules) {
				componentList.forEach(cur => {
					const config = cur.__config__
					const jnpfKey = config.jnpfKey
					const useNumList = ['numInput', 'switch', 'date', 'rate', 'slider']
					if (!Array.isArray(config.regList)) config.regList = []
					if (config.required) {
						config.regList.push({
							required: config.required,
							message: `${config.label}不能为空`
						})
					}
					const rule = config.regList.map(item => {
						item.pattern && (item.pattern = eval(item.pattern))
						item.trigger = config.trigger || 'blur'
						if (useNumList.includes(jnpfKey)) item.type = 'number'
						if (Array.isArray(config.defaultValue)) item.type = 'array'
						return item
					})
					if (rule.length) rules[cur.__vModel__] = rule
					if (config.children && jnpfKey !== 'table') this.buildRules(config.children, rules)
				})
			},
			setValue(item) {
				if (!item.__vModel__) return
				this.$set(this.formData, item.__vModel__, item.__config__.defaultValue)
			},
			checkTableData() {
				let valid = true
				Object.keys(this.tableRefs).forEach(vModel => {
					const res = this.$refs[vModel][0].$refs[vModel].submit()
					res ? (this.formData[vModel] = res) : (valid = false)
				})
				return valid
			},
			submitForm() {
				if (!this.checkTableData()) return
				this.$refs.dataForm.validate(valid => {
					if (!valid) return
					this.$emit('submit', this.formData)
				});
			},
			resetForm() {
				this.$refs.dataForm.resetFields()
			},
			setFormValue(vModel, value) {
				this.formData[vModel] = value
				this.$refs[vModel][0].setDefaultValue(value)
			}
		}
	}
</script>
