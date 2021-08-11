<template>
	<view class="jnpf-num-range">
		<u-input v-model="min" placeholder="最小值" type="number"></u-input>
		<text class="separator">-</text>
		<u-input v-model="max" placeholder="最大值" type="number"></u-input>
	</view>
</template>

<script>
	export default {
		name: 'jnpf-num-range',
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			value: {
				type: Array,
				default: () => []
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				min: '',
				max: ''
			}
		},
		watch: {
			value(val) {
				if (Array.isArray(val) && val.length === 2) {
					this.min = val[0] ? val[0].toString() : ''
					this.max = val[1] ? val[1].toString() : ''
				} else {
					this.min = ''
					this.max = ''
				}
			},
			min(val) {
				this.onChange()
			},
			max(val) {
				this.onChange()
			}
		},
		methods: {
			onChange() {
				if ((!this.min && this.min !== 0) && (!this.max && this.max !== 0)) return this.$emit('input', [])
				const min = this.min ? Number(this.min) : null
				const max = this.max ? Number(this.max) : null
				this.$emit('input', [min, max])
			}
		}
	}
</script>
<style lang="scss" scoped>
	.jnpf-num-range {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.separator {
			margin: 0 20rpx;
			flex-shrink: 0;
		}
	}
</style>
