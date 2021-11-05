<template>
	<view class="cudt-table">
		<view class="cudt-table-item" v-for="(item,i) in tableFormData" :key="i">
			<view class="cudt-table-item-title u-flex u-row-between">
				<text class="cudt-table-item-title-num">{{config.__config__.label}}({{i+1}})</text>
				<view class="cudt-table-item-title-action" v-if="!disabled && tableFormData.length>1"
					@click="delItem(i)">删除
				</view>
			</view>
			<!-- :required="childItem.__config__.required" -->
			<u-form-item :label="childItem.__config__.label"
				:label-width="childItem.__config__.labelWidth ? childItem.__config__.labelWidth * 1.5 : ''"
				v-for="(childItem,cIndex) in item" :key="cIndex">
				<block v-if="childItem.__config__.cudtKey==='comInput'">
					<u-input v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:maxlength="childItem.maxlength?childItem.maxlength:140"
						:disabled="disabled||childItem.disabled">
					</u-input>
				</block>
				<block v-if="childItem.__config__.cudtKey==='textarea'">
					<u-input v-model="tableFormData[i][cIndex].value" type="textarea"
						:placeholder="childItem.placeholder" :maxlength="childItem.maxlength?childItem.maxlength:140"
						:disabled="disabled||childItem.disabled" />
				</block>
				<block v-if="childItem.__config__.cudtKey==='numInput'">
					<u-number-box v-model="tableFormData[i][cIndex].value" :step="childItem.step"
						:max="childItem.max||99999" :min="childItem.min||childItem.min===0?childItem.min:-99999"
						:input-width="120" :input-height="60" :positive-integer="false"
						:disabled="disabled||childItem.disabled"></u-number-box>
				</block>
				<block v-if="childItem.__config__.cudtKey==='switch'">
					<cudt-switch v-model="tableFormData[i][cIndex].value" :disabled="disabled||childItem.disabled">
					</cudt-switch>
				</block>
				<block v-if="childItem.__config__.cudtKey==='radio'">
					<u-radio-group v-model="tableFormData[i][cIndex].value" :disabled="disabled||childItem.disabled">
						<u-radio v-for="(option, index) in childItem.__slot__.options" :key="index"
							:name="option[childItem.__config__.props.value]">
							{{ option[childItem.__config__.props.label] }}
						</u-radio>
					</u-radio-group>
				</block>
				<block v-if="childItem.__config__.cudtKey==='checkbox'">
					<cudt-checkbox v-model="tableFormData[i][cIndex].value" :options="childItem.__slot__.options"
						:props="childItem.__config__.props" :disabled="disabled||childItem.disabled">
					</cudt-checkbox>
				</block>
				<block v-if="childItem.__config__.cudtKey==='select'">
					<cudt-select v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:options="childItem.__slot__.options" :props="childItem.__config__.props"
						:multiple="childItem.multiple" :disabled="disabled||childItem.disabled">
					</cudt-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='cascader'">
					<cudt-cascader v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:options="childItem.options" :props="childItem.props.props"
						:disabled="disabled||childItem.disabled">
					</cudt-cascader>
				</block>
				<block v-if="childItem.__config__.cudtKey==='time'">
					<cudt-date-time type="time" v-model="tableFormData[i][cIndex].value"
						:placeholder="childItem.placeholder" :disabled="disabled||childItem.disabled">
					</cudt-date-time>
				</block>
				<block v-if="childItem.__config__.cudtKey==='date'">
					<cudt-date-time type="datetime" v-model="tableFormData[i][cIndex].value"
						:placeholder="childItem.placeholder" :disabled="disabled||childItem.disabled">
					</cudt-date-time>
				</block>
				<block v-if="childItem.__config__.cudtKey==='uploadImg'">
					<cudt-upload v-model="tableFormData[i][cIndex].value" :disabled="disabled||childItem.disabled">
					</cudt-upload>
				</block>
				<block v-if="childItem.__config__.cudtKey==='rate'">
					<u-rate v-model="tableFormData[i][cIndex].value" size="40" :count="childItem.max"
						:disabled="disabled||childItem.disabled"></u-rate>
				</block>
				<block v-if="childItem.__config__.cudtKey==='slider'">
					<u-slider v-model="tableFormData[i][cIndex].value" :step="childItem.step" :min="childItem.min||0"
						:max="childItem.max||100" style="width: 100%;" :disabled="disabled||childItem.disabled">
						<view class="slider-badge-button">{{tableFormData[i][cIndex].value}}</view>
					</u-slider>
				</block>
				<block v-if="childItem.__config__.cudtKey==='comSelect'">
					<cudt-org-select type="organize" v-model="tableFormData[i][cIndex].value"
						:multiple="childItem.multiple" :placeholder="childItem.placeholder"
						:disabled="disabled||childItem.disabled">
					</cudt-org-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='depSelect'">
					<cudt-org-select type="department" v-model="tableFormData[i][cIndex].value"
						:multiple="childItem.multiple" :placeholder="childItem.placeholder"
						:disabled="disabled||childItem.disabled">
					</cudt-org-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='posSelect'">
					<cudt-org-select type="position" v-model="tableFormData[i][cIndex].value"
						:multiple="childItem.multiple" :placeholder="childItem.placeholder"
						:disabled="disabled||childItem.disabled">
					</cudt-org-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='userSelect'">
					<cudt-org-select v-model="tableFormData[i][cIndex].value" :multiple="childItem.multiple"
						:placeholder="childItem.placeholder" :disabled="disabled||childItem.disabled">
					</cudt-org-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='treeSelect'">
					<cudt-tree-select v-model="tableFormData[i][cIndex].value" :options="childItem.options"
						:props="childItem.props.props" :multiple="childItem.multiple"
						:placeholder="childItem.placeholder" :disabled="disabled||childItem.disabled">
					</cudt-tree-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='address'">
					<cudt-city-select v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:level="childItem.level" :disabled="disabled||childItem.disabled">
					</cudt-city-select>
				</block>
				<block v-if="childItem.__config__.cudtKey==='billRule'">
					<u-input v-model="tableFormData[i][cIndex].value" placeholder="系统自动生成" disabled></u-input>
				</block>
			</u-form-item>
		</view>
		<view class="cudt-table-addBtn" v-if="!disabled" @click="addItem()">
			<u-icon name="plus" color="#2979ff"></u-icon>{{config.actionText}}
		</view>
	</view>
</template>

<script>
	import {
		getDictionaryDataSelector,
		previewDataInterface
	} from '@/api/common'
	const dyOptionsList = ['radio', 'checkbox', 'select', 'cascader', 'treeSelect']
	export default {
		name: 'cudt-table',
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			config: {
				type: Object,
				default: () => {}
			},
			// disabled: {
			// 	type: Boolean,
			// 	default: false
			// },
			value: {
				type: Array,
				default: () => ([])
			}
		},
		data() {
			return {
				tableData: [],
				tableFormData: []
			}
		},
		computed: {
			disabled() {
				return this.config.disabled
			}
		},
		created() {
			this.tableData = this.config.__config__.children
			this.buildOptions()
			if (this.value && this.value.length) {
				this.value.forEach(t => this.addItem(t))
			} else {
				this.addItem()
			}
		},
		methods: {
			buildOptions() {
				this.tableData.forEach(cur => {
					const config = cur.__config__
					if (dyOptionsList.indexOf(config.cudtKey) > -1) {
						let isTreeSelect = config.cudtKey === 'treeSelect' || config.cudtKey === 'cascader'
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
				})
			},
			addItem(val) {
				this.tableFormData.push(this.getEmptyItem(val))
			},
			delItem(i) {
				this.tableFormData.splice(i, 1)
			},
			getEmptyItem(val) {
				return this.tableData.map(t => {
					let res = {
						...t,
						value: val && val[t.__vModel__] || t.__config__.defaultValue
					}
					return res
				})
			},
			checkData(item) {
				if ([null, undefined, ''].includes(item.value)) return false
				if (Array.isArray(item.value)) return item.value.length > 0
				return true
			},
			submit() {
				let res = true
				// outer: for (let i = 0; i < this.tableFormData.length; i++) {
				// 	const row = this.tableFormData[i]
				// 	for (let j = 0; j < row.length; j++) {
				// 		if (row[j].__config__.required && !this.checkData(row[j])) {
				// 			res = false
				// 			this.$u.toast(`${this.config.__config__.label}(${i+1})${row[j].__config__.label}不能为空`)
				// 			break outer
				// 		}
				// 	}
				// }
				return res ? this.tableFormData.map(row => row.reduce((p, c) => (p[c.__vModel__] = c.value, p), {})) :
					false
			},
		}
	}
</script>
