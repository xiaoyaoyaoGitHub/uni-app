<template>
	<u-form :model="formData" ref="dataForm" :errorType="['toast']" label-position="left" label-width="150">
		<u-form-item :label="item.__config__.label" :prop="item.__vModel__" v-for="(item, i) in formConfCopy" :key="i">
			<block v-if="useInputList.indexOf(item.__config__.cudtKey) > -1">
				<u-input v-model="formData[item.__vModel__]" :placeholder="'请输入'+item.__config__.label" />
			</block>
			<block v-if="item.__config__.cudtKey==='numInput'||item.__config__.cudtKey==='calculate'">
				<cudt-num-range v-model="formData[item.__vModel__]" />
			</block>
			<view v-if="item.__config__.cudtKey==='switch'" class="u-flex u-form-item-switch">
				<cudt-switch v-model="formData[item.__vModel__]"></cudt-switch>
			</view>
			<block v-if="['select','radio','checkbox'].indexOf(item.__config__.cudtKey) > -1">
				<cudt-select v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label"
					:options="item.__slot__.options" :props="item.__config__.props">
				</cudt-select>
			</block>
			<block v-if="item.__config__.cudtKey==='cascader'">
				<cudt-cascader v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label"
					:options="item.options" :props="item.props.props">
				</cudt-cascader>
			</block>
			<block v-if="item.__config__.cudtKey==='time'">
				<cudt-time-range v-model="formData[item.__vModel__]" />
			</block>
			<block v-if="useDateList.indexOf(item.__config__.cudtKey) > -1">
				<cudt-date-range v-model="formData[item.__vModel__]" />
			</block>
			<block v-if="item.__config__.cudtKey==='rate'">
				<u-rate v-model="formData[item.__vModel__]" size="40" :count="item.max">
				</u-rate>
			</block>
			<block v-if="item.__config__.cudtKey==='slider'">
				<u-slider v-model="formData[item.__vModel__]" :step="item.step" :min="item.min||0" :max="item.max||100"
					style="width: 100%;">
					<view class="slider-badge-button">{{formData[item.__vModel__]}}</view>
				</u-slider>
			</block>
			<block v-if="item.__config__.cudtKey==='comSelect'||item.__config__.cudtKey==='currOrganize'">
				<cudt-org-select type="organize" v-model="formData[item.__vModel__]"
					:placeholder="'请选择'+item.__config__.label">
				</cudt-org-select>
			</block>
			<block v-if="item.__config__.cudtKey==='depSelect'||item.__config__.cudtKey==='currDept'">
				<cudt-org-select type="department" v-model="formData[item.__vModel__]"
					:placeholder="'请选择'+item.__config__.label">
				</cudt-org-select>
			</block>
			<block v-if="item.__config__.cudtKey==='posSelect'||item.__config__.cudtKey==='currPosition'">
				<cudt-org-select type="position" v-model="formData[item.__vModel__]"
					:placeholder="'请选择'+item.__config__.label">
				</cudt-org-select>
			</block>
			<block v-if="['userSelect','createUser', 'modifyUser'].indexOf(item.__config__.cudtKey) > -1">
				<cudt-org-select v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label">
				</cudt-org-select>
			</block>
			<block v-if="item.__config__.cudtKey==='treeSelect'">
				<cudt-tree-select v-model="formData[item.__vModel__]" :options="item.options" :props="item.props.props"
					:placeholder="'请选择'+item.__config__.label">
				</cudt-tree-select>
			</block>
			<block v-if="item.__config__.cudtKey==='address'">
				<cudt-city-select v-model="formData[item.__vModel__]" :placeholder="'请选择'+item.__config__.label"
					:level="item.level">
				</cudt-city-select>
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
	const useInputList = ['comInput', 'textarea', 'cudtText', 'billRule']
	const useDateList = ['date', 'createTime', 'modifyTime']
	const useArrList = ['cascader', 'address', 'numInput', 'calculate', ...useDateList]

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
					const defaultValue = useArrList.indexOf(config.cudtKey) > -1 ? [] : undefined
					if (cur.__vModel__) formData[cur.__vModel__] = defaultValue
					if (dyOptionsList.indexOf(config.cudtKey) > -1) {
						let isTreeSelect = config.cudtKey === 'treeSelect' || config.cudtKey === 'cascader'
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
						if (!this.formData[key]) this.formData[key] = undefined
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
