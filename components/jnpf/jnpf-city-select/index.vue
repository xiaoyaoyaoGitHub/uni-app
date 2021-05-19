<template>
	<view class="jnpf-city-select">
		<u-input type="select" :select-open="selectShow" v-model="innerValue" :placeholder="placeholder"
			@click="openSelect"></u-input>
		<city-select v-model="selectShow" @city-change="onChange" :level="level" :default-value="defaultValue">
		</city-select>
	</view>
</template>

<script>
	import citySelect from './city-select.vue';
	export default {
		name: 'jnpf-city-select',
		model: {
			prop: 'value',
			event: 'input'
		},
		components: {
			citySelect
		},
		props: {
			value: {
				type: Array,
				default: () => []
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			props: {
				type: Object,
				default: () => ({
					label: 'fullName',
					value: 'id'
				})
			},
			level: {
				type: Number,
				default: 2
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				selectShow: false,
				innerValue: '',
				defaultValue: []
			};
		},
		watch: {
			value(val) {
				this.setDefault()
			}
		},
		created() {
			this.setDefault()
		},
		methods: {
			setDefault() {
				this.defaultValue = this.value
			},
			openSelect() {
				if (this.disabled) return
				this.selectShow = true
			},
			onChange(e) {
				let label = ''
				let value = []
				for (let i = 0; i < e.length; i++) {
					label += (!label ? '' : '-') + e[i].label
					value.push(e[i].value)
				}
				this.defaultValue = value
				this.innerValue = label
				this.$emit('input', value)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.jnpf-city-select {
		width: 100%;
	}
</style>
