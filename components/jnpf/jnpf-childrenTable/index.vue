<template>
	<view class="jnpf-table">
		<view class="jnpf-table-item" v-for="(item,i) in dataForm[items.__vModel__]" :key="i">
			<view class="jnpf-table-item-title u-flex u-row-between">
				<text class="jnpf-table-item-title-num">{{items.__config__.label}}({{i+1}})</text>
				<view class="jnpf-table-item-title-action" @click="delItem(i,items.__vModel__)"
					v-if="dataForm[items.__vModel__].length > 1">删除</view>
			</view>
			<view v-for="(children,c) in items.__config__.children" :key='c'>
				<u-form-item :label="children.__config__.label" :prop="children.__vModel__">
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey === 'comInput'" />
					<u-number-box v-model="dataForm[items.__vModel__][i][children.__vModel__]" :min="children.min"
						:max="children.max" :step="children.step" :input-width="120" :positive-integer="false"
						:input-height="60" v-if="children.__config__.jnpfKey == 'numInput'" />
					<jnpf-select v-model="dataForm[items.__vModel__][i][children.__vModel__]" placeholder="请选择下拉框组"
						:options="children.__slot__.options" :props="children.__config__.props"
						v-if="children.__config__.jnpfKey == 'select'" />
					<jnpf-tree-select v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						:placeholder="children.placeholder" :options="children.options"
						v-if="children.__config__.jnpfKey == 'treeSelect'" />
					<jnpf-cascader v-model="dataForm[items.__vModel__][i][children.__vModel__]" placeholder="请选择级联选择"
						:options="children.options" v-if="children.__config__.jnpfKey == 'cascader'" />
					<jnpf-date-time type="date" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'date'" />
					<jnpf-date-time type="time" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'time'" />
					<jnpf-city-select v-model="dataForm[items.__vModel__][i][children.__vModel__]" placeholder="请选择省市区"
						:level="2" v-if="children.__config__.jnpfKey == 'address'" />
					<jnpf-org-select type="organize" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'comSelect'" />
					<jnpf-org-select type="department" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'depSelect'" />
					<jnpf-org-select v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'userSelect'" />
					<jnpf-org-select type="position" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'posSelect'" />
					<jnpf-switch v-model="dataForm[items.__vModel__][i][children.__vModel__]"
						v-if="children.__config__.jnpfKey == 'switch'" />
				</u-form-item>
			</view>
		</view>
		<view class="jnpf-table-addBtn" @click="addTable(items)">
			<u-icon name="plus" color="#2979ff"></u-icon>添加
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Object,
				default () {
					return {}
				}
			},
			dataForm: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				list: {}
			}
		},

		created() {
			setTimeout(() => {
				this.addTable(this.items)
			}, 0)
		},

		methods: {
			addTable(items) {
				this.$forceUpdate();
				let childItem = {};
				let list = this.dataForm[items.__vModel__];
				for (var j = 0; j < items.__config__.children.length; j++) {
					let e = items.__config__.children[j]
					childItem[e.__vModel__] = '';
				}
				this.dataForm[items.__vModel__].push(childItem)
				this.$forceUpdate();
			},
			delItem(i, model) {
				this.$forceUpdate();
				this.dataForm[model].splice(i, 1);
				this.$forceUpdate();
			},
		}
	}
</script>

<style>
</style>
