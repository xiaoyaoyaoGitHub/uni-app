<template>
	<u-form :model="formData" ref="dataForm" :errorType="['toast']" label-position="left" label-width="150">
		<u-form-item :label="item.__config__.label" :prop="item.__vModel__" v-for="(item, i) in formConfCopy" :key="i">
			<block v-if="useInputList.indexOf(item.__config__.jnpfKey) > -1">
				<u-input v-model="formData[item.__vModel__]" :placeholder="'请输入'+item.__config__.label" />
			</block>
			<block v-if="item.__config__.jnpfKey==='numInput'">
				<jnpf-num-range v-model="formData[item.__vModel__]" />
			</block>
			<view v-if="item.__config__.jnpfKey==='switch'" class="u-flex u-form-item-switch">
				<jnpf-switch v-model="formData[item.__vModel__]"></jnpf-switch>
			</view>
			<block v-if="item.__config__.jnpfKey==='radio'">
				<u-radio-group v-model="formData[item.__vModel__]">
					<u-radio v-for="(option, index) in item.__slot__.options" :key="index"
						:name="option[item.__config__.props.value]">{{ option[item.__config__.props.label] }}
					</u-radio>
				</u-radio-group>
			</block>
			<block v-if="item.__config__.jnpfKey==='checkbox'">
				<jnpf-checkbox v-model="formData[item.__vModel__]" :options="item.__slot__.options"
					:props="item.__config__.props">
				</jnpf-checkbox>
			</block>
			<block v-if="item.__config__.jnpfKey==='select'">
				<jnpf-select v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label"
					:options="item.__slot__.options" :props="item.__config__.props">
				</jnpf-select>
			</block>
			<block v-if="item.__config__.jnpfKey==='cascader'">
				<jnpf-cascader v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label"
					:options="item.options" :props="item.props.props">
				</jnpf-cascader>
			</block>
			<block v-if="item.__config__.jnpfKey==='time'">
				<jnpf-time-range v-model="formData[item.__vModel__]" />
			</block>
			<block v-if="useDateList.indexOf(item.__config__.jnpfKey) > -1">
				<jnpf-date-range v-model="formData[item.__vModel__]" />
			</block>
			<block v-if="item.__config__.jnpfKey==='rate'">
				<u-rate v-model="formData[item.__vModel__]" size="40" :count="item.max">
				</u-rate>
			</block>
			<block v-if="item.__config__.jnpfKey==='slider'">
				<u-slider v-model="formData[item.__vModel__]" :step="item.step" :min="item.min||0" :max="item.max||100"
					style="width: 100%;">
					<view class="slider-badge-button">{{formData[item.__vModel__]}}</view>
				</u-slider>
			</block>
			<block v-if="item.__config__.jnpfKey==='comSelect'">
				<jnpf-org-select type="organize" v-model="formData[item.__vModel__]"
					:placeholder="'请选择'+item.__config__.label">
				</jnpf-org-select>
			</block>
			<block v-if="item.__config__.jnpfKey==='depSelect'">
				<jnpf-org-select type="department" v-model="formData[item.__vModel__]"
					:placeholder="'请选择'+item.__config__.label">
				</jnpf-org-select>
			</block>
			<block v-if="item.__config__.jnpfKey==='posSelect'">
				<jnpf-org-select type="position" v-model="formData[item.__vModel__]"
					:placeholder="'请选择'+item.__config__.label">
				</jnpf-org-select>
			</block>
			<block v-if="item.__config__.jnpfKey==='userSelect'">
				<jnpf-org-select v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label">
				</jnpf-org-select>
			</block>
			<block v-if="item.__config__.jnpfKey==='treeSelect'">
				<jnpf-tree-select v-model="formData[item.__vModel__]" :options="item.options" :props="item.props.props"
					:placeholder="'请选择'+item.__config__.label">
				</jnpf-tree-select>
			</block>
			<block v-if="item.__config__.jnpfKey==='address'">
				<jnpf-city-select v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label"
					:level="item.level">
				</jnpf-city-select>
			</block>
		</u-form-item>
	</u-form>
</template>
<script>
	import {
		getDictionaryDataSelector,
		previewDataInterface
	} from '@/api/common'
	const dyOptionsList = ['radio', 'checkbox', 'select', 'cascader', 'treeSelect']
	const useInputList = ['comInput', 'textarea', 'JNPFText', 'billRule', 'createUser', 'modifyUser', 'currOrganize',
		'currDept', 'currPosition', 'calculate'
	]
	const useDateList = ['date', 'createTime', 'modifyTime']
	const useArrList = ['cascader', 'address', 'numInput', ...useDateList]

	export default {
		props: ['formConf'],
		data() {
			const data = {
				useInputList,
				useDateList,
				formConfCopy: this.$u.deepClone(this.formConf),
				formData: {}
			}
			this.initFormData(data.formConfCopy, data.formData)
			return data
		},
		methods: {
			initFormData(componentList, formData) {
				componentList.forEach(cur => {
					const config = cur.__config__
					const defaultValue = useArrList.indexOf(config.jnpfKey) > -1 ? [] : undefined
					if (cur.__vModel__) formData[cur.__vModel__] = defaultValue
					if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
						let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
						if (config.dataType === 'dictionary') {
							if (!config.dictionaryType) return
							getDictionaryDataSelector(config.dictionaryType).then(res => {
								isTreeSelect ? cur.options = res.data.list : cur.__slot__.options = res
									.data.list
							})
						}
						if (config.dataType === 'dynamic') {
							if (!config.propsUrl) return
							previewDataInterface(config.propsUrl).then(res => {
								isTreeSelect ? cur.options = res.data : cur.__slot__.options = res.data
							})
						}
					}
				})
			},
			submitForm() {
				this.$refs.dataForm.validate(valid => {
					if (!valid) return
					for (let key in this.formData) {
						if (this.formData[key] && Array.isArray(this.formData[key]) && !this.formData[key]
							.length) {
							this.formData[key] = undefined
						}
					}
					this.$emit('submit', this.formData)
				})
			},
			resetForm() {
				this.$refs.dataForm.resetFields()
			}
		}
	}
</script>
