<template>
	<block v-if="itemCopy.__config__.cudtKey==='cudtText'">
		<cudt-text v-model="value" :textStyle="itemCopy.textStyle"></cudt-text>
	</block>
	<block v-else-if="itemCopy.__config__.cudtKey==='groupTitle'">
		<cudt-group :content="itemCopy.content" :content-position="itemCopy['content-position']"></cudt-group>
	</block>
	<view class="cudt-divider" v-else-if="itemCopy.__config__.cudtKey==='divider'">
		<u-divider half-width="200" height="80">{{itemCopy.__slot__.default}}</u-divider>
	</view>
	<view v-else-if="isIgnore"></view>
	<view v-else-if="itemCopy.__config__.cudtKey==='editor'"></view>
	<!-- <u-form-item label-width="0" v-else-if="itemCopy.__config__.cudtKey==='editor'">
			<cudt-editor v-model="value"></cudt-editor>
		</u-form-item> -->
	<view class="cudt-card" v-else-if="itemCopy.__config__.cudtKey==='card'||itemCopy.__config__.cudtKey==='row'">
		<view class="cudt-card-cap u-line-1" v-if="itemCopy.header">{{itemCopy.header}}</view>
		<item v-for="(child, index) in itemCopy.__config__.children" :key="index" :item="child" :formConf="formConf"
			@input="setValue" />
	</view>
	<block v-else-if="itemCopy.__config__.cudtKey==='table'">
		<child-table v-model="value" :config="itemCopy" :ref="itemCopy.__vModel__"></child-table>
	</block>
	<view v-else-if="itemCopy.__config__.cudtKey==='tab'||itemCopy.__config__.cudtKey==='collapse'">
		<template v-for="(item,i) in itemCopy.__config__.children">
			<view class="cudt-card" :key="i" v-if="item.__config__.children.length">
				<view class="cudt-card-cap u-line-1" v-if="item.title">{{item.title}}</view>
				<item v-for="(child, index) in item.__config__.children" :key="index" :item="child" :formConf="formConf"
					@input="setValue" />
			</view>
		</template>
	</view>
	<u-form-item :label="label" :prop="itemCopy.__vModel__" :required="itemCopy.__config__.required"
		:label-width="labelWidth" v-else>
		<block v-if="itemCopy.__config__.cudtKey==='comInput'">
			<u-input :type="itemCopy['show-password']?'password':'text'" v-model="value"
				:placeholder="itemCopy.placeholder" :maxlength="itemCopy.maxlength?itemCopy.maxlength:140"
				:disabled="itemCopy.disabled"></u-input>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='textarea'">
			<u-input v-model="value" type="textarea" :placeholder="itemCopy.placeholder"
				:maxlength="itemCopy.maxlength?itemCopy.maxlength:140" :disabled="itemCopy.disabled" />
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='numInput'">
			<u-number-box v-model="value" :step="itemCopy.step" :max="itemCopy.max||99999"
				:min="itemCopy.min||itemCopy.min===0?itemCopy.min:-99999" :input-width="120" :input-height="60"
				:positive-integer="false" :disabled="itemCopy.disabled">
			</u-number-box>
		</block>
		<view v-if="itemCopy.__config__.cudtKey==='switch'" class="u-flex u-form-item-switch">
			<cudt-switch v-model="value" :disabled="itemCopy.disabled"></cudt-switch>
		</view>
		<block v-if="itemCopy.__config__.cudtKey==='radio'">
			<u-radio-group v-model="value" :disabled="itemCopy.disabled">
				<u-radio v-for="(option, index) in itemCopy.__slot__.options" :key="index"
					:name="option[itemCopy.__config__.props.value]">{{ option[itemCopy.__config__.props.label] }}
				</u-radio>
			</u-radio-group>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='checkbox'">
			<cudt-checkbox v-model="value" :options="itemCopy.__slot__.options" :props="itemCopy.__config__.props"
				:disabled="itemCopy.disabled">
			</cudt-checkbox>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='select'">
			<cudt-select v-model="value" :placeholder="itemCopy.placeholder" :options="itemCopy.__slot__.options"
				:props="itemCopy.__config__.props" :multiple="itemCopy.multiple" :disabled="itemCopy.disabled">
			</cudt-select>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='cascader'">
			<cudt-cascader v-model="value" :placeholder="itemCopy.placeholder" :options="itemCopy.options"
				:props="itemCopy.props.props" :disabled="itemCopy.disabled">
			</cudt-cascader>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='time'">
			<cudt-date-time type="time" v-model="value" :placeholder="itemCopy.placeholder"
				:disabled="itemCopy.disabled">
			</cudt-date-time>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='date'">
			<cudt-date-time :type="itemCopy.type||'date'" v-model="value" :placeholder="itemCopy.placeholder"
				:disabled="itemCopy.disabled">
			</cudt-date-time>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='uploadImg'">
			<cudt-upload v-model="value" :disabled="itemCopy.disabled"></cudt-upload>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='uploadFz'">
			<cudt-file :list="value" />
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='rate'">
			<u-rate v-model="value" size="40" :count="itemCopy.max" :disabled="itemCopy.disabled"></u-rate>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='slider'">
			<u-slider v-model="value" :step="itemCopy.step" :min="itemCopy.min||0" :max="itemCopy.max||100"
				style="width: 100%;" :disabled="itemCopy.disabled">
				<view class="slider-badge-button">{{value}}</view>
			</u-slider>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='comSelect'">
			<cudt-org-select type="organize" v-model="value" :multiple="itemCopy.multiple"
				:placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</cudt-org-select>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='depSelect'">
			<cudt-org-select type="department" v-model="value" :multiple="itemCopy.multiple"
				:placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</cudt-org-select>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='posSelect'">
			<cudt-org-select type="position" v-model="value" :multiple="itemCopy.multiple"
				:placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</cudt-org-select>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='userSelect'">
			<cudt-org-select v-model="value" :multiple="itemCopy.multiple" :placeholder="itemCopy.placeholder"
				:disabled="itemCopy.disabled">
			</cudt-org-select>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='treeSelect'">
			<cudt-tree-select v-model="value" :options="itemCopy.options" :props="itemCopy.props.props"
				:multiple="itemCopy.multiple" :placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</cudt-tree-select>
		</block>
		<block v-if="itemCopy.__config__.cudtKey==='address'">
			<cudt-city-select v-model="value" :placeholder="itemCopy.placeholder" :level="itemCopy.level"
				:disabled="itemCopy.disabled">
			</cudt-city-select>
		</block>
		<block v-if="isSystem">
			<u-input v-model="value" placeholder="系统自动生成" disabled></u-input>
		</block>
	</u-form-item>
</template>

<script>
	import childTable from './childTable.vue'
	import Item from './Item'
	const systemList = ['createUser', 'createTime', 'modifyUser', 'modifyTime', 'currOrganize', 'currDept', 'currPosition',
		'billRule'
	]
	const ignoreList = ['colorPicker', 'relationForm', 'relationFormAttr', 'calculate', 'popupSelect']
	export default {
		name: 'Item',
		model: {
			event: 'input'
		},
		components: {
			childTable,
			Item
		},
		props: {
			item: {
				type: Object,
				required: true
			},
			formConf: {
				type: Object,
				required: true
			},
		},
		watch: {
			value(val) {
				this.itemCopy.__config__.defaultValue = this.value
				this.$emit('input', this.itemCopy)
			}
		},
		computed: {
			itemCopy() {
				return this.$u.deepClone(this.item)
			},
			isSystem() {
				return systemList.indexOf(this.itemCopy.__config__.cudtKey) > -1
			},
			isIgnore() {
				return ignoreList.indexOf(this.itemCopy.__config__.cudtKey) > -1
			},
			labelWidth() {
				return this.itemCopy.__config__.labelWidth ? this.itemCopy.__config__.labelWidth * 1.5 : ''
			},
			label() {
				return this.itemCopy.__config__.label
			}
		},
		data() {
			return {
				value: ''
			}
		},
		created() {
			const cudtKey = this.itemCopy.__config__.cudtKey
			if (cudtKey === 'switch') {
				this.value = this.itemCopy.__config__.defaultValue ? 1 : 0
			} else if (cudtKey === 'cascader') {
				this.value = this.itemCopy.__config__.defaultValue || []
			} else if (cudtKey === 'rate') {
				this.value = this.itemCopy.__config__.defaultValue || 0
			} else if (cudtKey === 'numInput') {
				let value = 0
				if (this.itemCopy.min) {
					if (this.itemCopy.__config__.defaultValue && this.itemCopy.__config__.defaultValue > this.itemCopy
						.min) {
						value = this.itemCopy.__config__.defaultValue
					} else {
						value = this.itemCopy.min
					}
					if (this.itemCopy.max && this.itemCopy.min > this.itemCopy.max) {
						this.itemCopy.max = this.itemCopy.min
					}
				} else {
					value = this.itemCopy.__config__.defaultValue || 0
				}
				this.value = value
			} else {
				this.value = this.itemCopy.__config__.defaultValue
			}
		},
		methods: {
			setValue(item) {
				this.$emit('input', item)
			},
			setDefaultValue(val) {
				this.value = val
			}
		}
	}
</script>
