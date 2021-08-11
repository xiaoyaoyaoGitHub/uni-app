<template>
	<block v-if="itemCopy.__config__.jnpfKey==='JNPFText'">
		<jnpf-text v-model="value" :textStyle="itemCopy.textStyle"></jnpf-text>
	</block>
	<block v-else-if="itemCopy.__config__.jnpfKey==='groupTitle'">
		<jnpf-group :content="itemCopy.content" :content-position="itemCopy['content-position']"></jnpf-group>
	</block>
	<view class="jnpf-divider" v-else-if="itemCopy.__config__.jnpfKey==='divider'">
		<u-divider half-width="200" height="80">{{itemCopy.__slot__.default}}</u-divider>
	</view>
	<view v-else-if="isIgnore"></view>
	<view v-else-if="itemCopy.__config__.jnpfKey==='editor'"></view>
	<!-- <u-form-item label-width="0" v-else-if="itemCopy.__config__.jnpfKey==='editor'">
			<jnpf-editor v-model="value"></jnpf-editor>
		</u-form-item> -->
	<view class="jnpf-card" v-else-if="itemCopy.__config__.jnpfKey==='card'||itemCopy.__config__.jnpfKey==='row'">
		<view class="jnpf-card-cap u-line-1" v-if="itemCopy.header">{{itemCopy.header}}</view>
		<item v-for="(child, index) in itemCopy.__config__.children" :key="index" :item="child" :formConf="formConf"
			@input="setValue" />
	</view>
	<block v-else-if="itemCopy.__config__.jnpfKey==='table'">
		<child-table v-model="value" :config="itemCopy" :ref="itemCopy.__vModel__"></child-table>
	</block>
	<view v-else-if="itemCopy.__config__.jnpfKey==='tab'||itemCopy.__config__.jnpfKey==='collapse'">
		<template v-for="(item,i) in itemCopy.__config__.children">
			<view class="jnpf-card" :key="i" v-if="item.__config__.children.length">
				<view class="jnpf-card-cap u-line-1" v-if="item.title">{{item.title}}</view>
				<item v-for="(child, index) in item.__config__.children" :key="index" :item="child" :formConf="formConf"
					@input="setValue" />
			</view>
		</template>
	</view>
	<u-form-item :label="label" :prop="itemCopy.__vModel__" :required="itemCopy.__config__.required"
		:label-width="labelWidth" v-else>
		<block v-if="itemCopy.__config__.jnpfKey==='comInput'">
			<u-input :type="itemCopy['show-password']?'password':'text'" v-model="value"
				:placeholder="itemCopy.placeholder" :maxlength="itemCopy.maxlength?itemCopy.maxlength:140"
				:disabled="itemCopy.disabled"></u-input>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='textarea'">
			<u-input v-model="value" type="textarea" :placeholder="itemCopy.placeholder"
				:maxlength="itemCopy.maxlength?itemCopy.maxlength:140" :disabled="itemCopy.disabled" />
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='numInput'">
			<u-number-box v-model="value" :step="itemCopy.step" :max="itemCopy.max||99999"
				:min="itemCopy.min||itemCopy.min===0?itemCopy.min:-99999" :input-width="120" :input-height="60"
				:positive-integer="false" :disabled="itemCopy.disabled">
			</u-number-box>
		</block>
		<view v-if="itemCopy.__config__.jnpfKey==='switch'" class="u-flex u-form-item-switch">
			<jnpf-switch v-model="value" :disabled="itemCopy.disabled"></jnpf-switch>
		</view>
		<block v-if="itemCopy.__config__.jnpfKey==='radio'">
			<u-radio-group v-model="value" :disabled="itemCopy.disabled">
				<u-radio v-for="(option, index) in itemCopy.__slot__.options" :key="index"
					:name="option[itemCopy.__config__.props.value]">{{ option[itemCopy.__config__.props.label] }}
				</u-radio>
			</u-radio-group>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='checkbox'">
			<jnpf-checkbox v-model="value" :options="itemCopy.__slot__.options" :props="itemCopy.__config__.props"
				:disabled="itemCopy.disabled">
			</jnpf-checkbox>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='select'">
			<jnpf-select v-model="value" :placeholder="itemCopy.placeholder" :options="itemCopy.__slot__.options"
				:props="itemCopy.__config__.props" :multiple="itemCopy.multiple" :disabled="itemCopy.disabled">
			</jnpf-select>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='cascader'">
			<jnpf-cascader v-model="value" :placeholder="itemCopy.placeholder" :options="itemCopy.options"
				:props="itemCopy.props.props" :disabled="itemCopy.disabled">
			</jnpf-cascader>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='time'">
			<jnpf-date-time type="time" v-model="value" :placeholder="itemCopy.placeholder"
				:disabled="itemCopy.disabled">
			</jnpf-date-time>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='date'">
			<jnpf-date-time :type="itemCopy.type||'date'" v-model="value" :placeholder="itemCopy.placeholder"
				:disabled="itemCopy.disabled">
			</jnpf-date-time>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='uploadImg'">
			<jnpf-upload v-model="value" :disabled="itemCopy.disabled"></jnpf-upload>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='uploadFz'">
			<jnpf-file :list="value" />
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='rate'">
			<u-rate v-model="value" size="40" :count="itemCopy.max" :disabled="itemCopy.disabled"></u-rate>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='slider'">
			<u-slider v-model="value" :step="itemCopy.step" :min="itemCopy.min||0" :max="itemCopy.max||100"
				style="width: 100%;" :disabled="itemCopy.disabled">
				<view class="slider-badge-button">{{value}}</view>
			</u-slider>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='comSelect'">
			<jnpf-org-select type="organize" v-model="value" :multiple="itemCopy.multiple"
				:placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</jnpf-org-select>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='depSelect'">
			<jnpf-org-select type="department" v-model="value" :multiple="itemCopy.multiple"
				:placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</jnpf-org-select>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='posSelect'">
			<jnpf-org-select type="position" v-model="value" :multiple="itemCopy.multiple"
				:placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</jnpf-org-select>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='userSelect'">
			<jnpf-org-select v-model="value" :multiple="itemCopy.multiple" :placeholder="itemCopy.placeholder"
				:disabled="itemCopy.disabled">
			</jnpf-org-select>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='treeSelect'">
			<jnpf-tree-select v-model="value" :options="itemCopy.options" :props="itemCopy.props.props"
				:multiple="itemCopy.multiple" :placeholder="itemCopy.placeholder" :disabled="itemCopy.disabled">
			</jnpf-tree-select>
		</block>
		<block v-if="itemCopy.__config__.jnpfKey==='address'">
			<jnpf-city-select v-model="value" :placeholder="itemCopy.placeholder" :level="itemCopy.level"
				:disabled="itemCopy.disabled">
			</jnpf-city-select>
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
				return systemList.indexOf(this.itemCopy.__config__.jnpfKey) > -1
			},
			isIgnore() {
				return ignoreList.indexOf(this.itemCopy.__config__.jnpfKey) > -1
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
			const jnpfKey = this.itemCopy.__config__.jnpfKey
			if (jnpfKey === 'switch') {
				this.value = this.itemCopy.__config__.defaultValue ? 1 : 0
			} else if (jnpfKey === 'rate') {
				this.value = this.itemCopy.__config__.defaultValue || 0
			} else if (jnpfKey === 'numInput') {
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
