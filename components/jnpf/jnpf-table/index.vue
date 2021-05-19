<template>
	<view class="jnpf-table">
		<view class="jnpf-table-item" v-for="(item,i) in tableFormData" :key="i">
			<view class="jnpf-table-item-title u-flex u-row-between">
				<text class="jnpf-table-item-title-num">{{config.__config__.label}}({{i+1}})</text>
				<view class="jnpf-table-item-title-action" v-if="tableFormData.length>1" @click="delItem(i)">删除
				</view>
			</view>
			<!-- :required="childItem.__config__.required" -->
			<u-form-item :label="childItem.__config__.label"
				:label-width="childItem.__config__.labelWidth ? childItem.__config__.labelWidth * 1.5 : ''"
				v-for="(childItem,cIndex) in item" :key="cIndex">
				<block v-if="childItem.__config__.jnpfKey==='comInput'">
					<u-input v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:maxlength="childItem.maxlength?childItem.maxlength:140" :disabled="childItem.disabled">
					</u-input>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='textarea'">
					<u-input v-model="tableFormData[i][cIndex].value" type="textarea"
						:placeholder="childItem.placeholder" :maxlength="childItem.maxlength?childItem.maxlength:140"
						:disabled="childItem.disabled" />
				</block>
				<block v-if="childItem.__config__.jnpfKey==='numInput'">
					<u-number-box v-model="tableFormData[i][cIndex].value" :step="childItem.step" :input-width="120"
						:input-height="60" :disabled="childItem.disabled"></u-number-box>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='switch'">
					<jnpf-switch v-model="tableFormData[i][cIndex].value" :disabled="childItem.disabled"></jnpf-switch>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='radio'">
					<u-radio-group v-model="tableFormData[i][cIndex].value" :disabled="childItem.disabled">
						<u-radio v-for="(option, index) in childItem.__slot__.options" :key="index"
							:name="option[childItem.__config__.props.value]">
							{{ option[childItem.__config__.props.label] }}
						</u-radio>
					</u-radio-group>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='checkbox'">
					<jnpf-checkbox v-model="tableFormData[i][cIndex].value" :options="childItem.__slot__.options"
						:props="childItem.__config__.props" :disabled="childItem.disabled">
					</jnpf-checkbox>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='select'">
					<jnpf-select v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:options="childItem.__slot__.options" :props="childItem.__config__.props"
						:multiple="childItem.multiple" :disabled="childItem.disabled">
					</jnpf-select>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='cascader'">
					<jnpf-cascader v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:options="childItem.options" :props="childItem.props.props" :disabled="childItem.disabled">
					</jnpf-cascader>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='time'">
					<jnpf-date-time type="time" v-model="tableFormData[i][cIndex].value"
						:placeholder="childItem.placeholder" :disabled="childItem.disabled">
					</jnpf-date-time>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='date'">
					<jnpf-date-time type="datetime" v-model="tableFormData[i][cIndex].value"
						:placeholder="childItem.placeholder" :disabled="childItem.disabled">
					</jnpf-date-time>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='uploadImg'">
					<jnpf-upload v-model="tableFormData[i][cIndex].value" :disabled="childItem.disabled"></jnpf-upload>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='rate'">
					<u-rate v-model="tableFormData[i][cIndex].value" size="40" :count="childItem.max"
						:disabled="childItem.disabled"></u-rate>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='slider'">
					<u-slider v-model="tableFormData[i][cIndex].value" :step="childItem.step" :min="childItem.min"
						:max="childItem.max" style="width: 100%;" :disabled="childItem.disabled"></u-slider>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='comSelect'">
					<jnpf-org-select type="organize" v-model="tableFormData[i][cIndex].value"
						:multiple="childItem.multiple" :placeholder="childItem.placeholder"
						:disabled="childItem.disabled">
					</jnpf-org-select>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='depSelect'">
					<jnpf-org-select type="department" v-model="tableFormData[i][cIndex].value"
						:multiple="childItem.multiple" :placeholder="childItem.placeholder"
						:disabled="childItem.disabled">
					</jnpf-org-select>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='posSelect'">
					<jnpf-org-select type="position" v-model="tableFormData[i][cIndex].value"
						:multiple="childItem.multiple" :placeholder="childItem.placeholder"
						:disabled="childItem.disabled">
					</jnpf-org-select>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='userSelect'">
					<jnpf-org-select v-model="tableFormData[i][cIndex].value" :multiple="childItem.multiple"
						:placeholder="childItem.placeholder" :disabled="childItem.disabled">
					</jnpf-org-select>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='treeSelect'">
					<jnpf-tree-select v-model="tableFormData[i][cIndex].value" :options="childItem.options"
						:props="childItem.props.props" :multiple="childItem.multiple"
						:placeholder="childItem.placeholder" :disabled="childItem.disabled">
					</jnpf-tree-select>
				</block>
				<block v-if="childItem.__config__.jnpfKey==='address'">
					<jnpf-city-select v-model="tableFormData[i][cIndex].value" :placeholder="childItem.placeholder"
						:level="childItem.level" :disabled="childItem.disabled">
					</jnpf-city-select>
				</block>
			</u-form-item>
		</view>
		<view class="jnpf-table-addBtn" @click="addItem()">
			<u-icon name="plus" color="#2979ff"></u-icon>{{config.actionText}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'jnpf-table',
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			config: {
				type: Object,
				default: () => {}
			},
			value: {
				type: Array,
				default: () => ([])
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tableData: [],
				tableFormData: []
			}
		},
		created() {
			this.tableData = this.config.__config__.children
			if (this.value && this.value.length) {
				this.value.forEach(t => this.addItem(t))
			} else {
				this.addItem()
			}
		},
		methods: {
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
