<template>
	<view>
		<view v-for="(items,index) in formData.fields" :key='index'>
			<u-form-item v-if="items.__config__.jnpfKey != 'table' && items.__config__.jnpfKey != 'card'"
				:label="items.__config__.label" :required='items.__config__.required' :prop="items.__vModel__">
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'billRule'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'createUser'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'createTime'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'modifyUser'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'modifyTime'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'currOrganize'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'currDept'" />
				<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled
					v-if="items.__config__.jnpfKey == 'currPosition'" />

				<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]"
					v-if="items.__config__.jnpfKey == 'comInput'" />
				<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]" type="textarea"
					v-if="items.__config__.jnpfKey == 'textarea'" />
				<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
					:options="items.__slot__.options" :props="items.__config__.props" multiple
					v-if="items.__config__.jnpfKey == 'checkbox'">
				</jnpf-select>
				<u-number-box v-model="dataForm[items.__vModel__]" :min="items.min" :max="items.max" :step="items.step"
					:input-width="120" :positive-integer="false" :input-height="60"
					v-if="items.__config__.jnpfKey == 'numInput'">
				</u-number-box>
				<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
					:options="items.__slot__.options" :props="items.__config__.props"
					v-if="items.__config__.jnpfKey == 'select'">
				</jnpf-select>
				<u-radio-group v-model="dataForm[items.__vModel__]" v-if="items.__config__.jnpfKey == 'radio'">
					<u-radio v-for="(radios, radioIndex) in items.__slot__.options" :key="radioIndex"
						:name="radios[items.__config__.props.value]">
						{{ radios[items.__config__.props.label] }}
					</u-radio>
				</u-radio-group>
				<jnpf-switch v-model="dataForm[items.__vModel__]" v-if="items.__config__.jnpfKey == 'switch'" />

				<jnpf-cascader v-model="dataForm[items.__vModel__]" placeholder="请选择级联选择" :options="items.options"
					v-if="items.__config__.jnpfKey == 'cascader'" />

				<jnpf-date-time type="time" v-model="dataForm[items.__vModel__]"
					v-if="items.__config__.jnpfKey == 'time'" />
				<jnpf-date-time type="date" v-model="dataForm[items.__vModel__]"
					v-if="items.__config__.jnpfKey == 'date'" />
				<jnpf-upload v-model="dataForm[items.__vModel__]" v-if="items.__config__.jnpfKey == 'uploadImg'">
				</jnpf-upload>
				<u-rate v-model="dataForm[items.__vModel__]" size="40" @change="changeRate($event,items.__vModel__)"
					v-if="items.__config__.jnpfKey == 'rate'">
				</u-rate>
				<u-slider v-model="dataForm[items.__vModel__]" :step="items.step" :min="items.min" :max="items.max"
					style="width: 100%;" v-if="items.__config__.jnpfKey == 'slider'">
					<view class="">
						<view class="badge-button">
							{{dataForm[items.__vModel__]}}
						</view>
					</view>
				</u-slider>
				<jnpf-org-select type="organize" v-model="dataForm[items.__vModel__]"
					v-if="items.__config__.jnpfKey == 'comSelect'" />
				<jnpf-org-select type="department" v-model="dataForm[items.__vModel__]"
					v-if="items.__config__.jnpfKey == 'depSelect'" />
				<jnpf-org-select v-model="dataForm[items.__vModel__]" v-if="items.__config__.jnpfKey == 'userSelect'" />
				<jnpf-org-select type="position" v-model="dataForm[items.__vModel__]"
					v-if="items.__config__.jnpfKey == 'posSelect'" />
				<u-divider v-if="items.__config__.jnpfKey == 'divider'">{{items.__config__.default}}</u-divider>
				<jnpf-city-select v-model="dataForm[items.__vModel__]" placeholder="请选择省市区" :level="2"
					v-if="items.__config__.jnpfKey == 'address'" />
				<jnpf-tree-select v-model="dataForm[items.__vModel__]" placeholder="请选择树形选择" :options="items.options"
					v-if="items.__config__.jnpfKey == 'treeSelect'" />
				<jnpf-group :content="items.content" :content-position="items['content-position']"
					v-if="items.__config__.jnpfKey == 'groupTitle'" />
			</u-form-item>
			<!-- 卡片 -->
			<view class="jnpf-card" v-if="items.__config__.jnpfKey == 'card'">
				<block v-for="(card,i) in items.__config__.children" :key='i'>
					<u-form-item :label="card.__config__.label" :required='card.__config__.required'
						:prop="card.__vModel__">
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'billRule'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'createUser'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'createTime'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'modifyUser'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'modifyTime'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'currOrganize'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'currDept'" />
						<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled
							v-if="card.__config__.jnpfKey == 'currPosition'" />

						<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'comInput'" />
						<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]" type="textarea"
							v-if="card.__config__.jnpfKey == 'textarea'" />
						<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
							:options="card.__slot__.options" :props="card.__config__.props" multiple
							v-if="card.__config__.jnpfKey == 'checkbox'">
						</jnpf-select>
						<u-number-box v-model="dataForm[card.__vModel__]" :min="card.min" :max="card.max"
							:step="card.step" :input-width="120" :positive-integer="false" :input-height="60"
							v-if="card.__config__.jnpfKey == 'numInput'">
						</u-number-box>
						<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
							:options="card.__slot__.options" :props="card.__config__.props"
							v-if="card.__config__.jnpfKey == 'select'">
						</jnpf-select>
						<u-radio-group v-model="dataForm[card.__vModel__]" v-if="card.__config__.jnpfKey == 'radio'">
							<u-radio v-for="(radios, radioIndex) in card.__slot__.options" :key="radioIndex"
								:name="radios[card.__config__.props.value]">
								{{ radios[card.__config__.props.label] }}
							</u-radio>
						</u-radio-group>
						<jnpf-switch v-model="dataForm[card.__vModel__]" v-if="card.__config__.jnpfKey == 'switch'">
						</jnpf-switch>
						<jnpf-cascader v-model="dataForm[card.__vModel__]" placeholder="请选择级联选择" :options="card.options"
							v-if="card.__config__.jnpfKey == 'cascader'" />

						<jnpf-date-time type="time" v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'time'"></jnpf-date-time>
						<jnpf-date-time type="date" v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'date'"></jnpf-date-time>
						<jnpf-upload v-model="dataForm[card.__vModel__]" v-if="card.__config__.jnpfKey == 'uploadImg'">
						</jnpf-upload>
						<u-rate v-model="dataForm[card.__vModel__]" size="40"
							@change="changeRate($event,card.__vModel__)" v-if="card.__config__.jnpfKey == 'rate'">
						</u-rate>
						<u-slider v-model="dataForm[card.__vModel__]" :step="card.step" :min="card.min" :max="card.max"
							style="width: 100%;" v-if="card.__config__.jnpfKey == 'slider'">
							<view class="">
								<view class="badge-button">
									{{dataForm[card.__vModel__]}}
								</view>
							</view>
						</u-slider>
						<jnpf-org-select type="organize" v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'comSelect'" />
						<jnpf-org-select type="department" v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'depSelect'" />
						<jnpf-org-select v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'userSelect'" />
						<jnpf-org-select type="position" v-model="dataForm[card.__vModel__]"
							v-if="card.__config__.jnpfKey == 'posSelect'" />
						<u-divider v-if="card.__config__.jnpfKey == 'divider'">{{card.__config__.default}}
						</u-divider>
						<jnpf-city-select v-model="dataForm[card.__vModel__]" placeholder="请选择省市区" :level="2"
							v-if="card.__config__.jnpfKey == 'address'" />
						<jnpf-tree-select v-model="dataForm[card.__vModel__]" placeholder="请选择树形选择"
							:options="card.options" v-if="card.__config__.jnpfKey == 'treeSelect'" />
						<jnpf-group :content="card.content" :content-position="card['content-position']"
							v-if="card.__config__.jnpfKey == 'groupTitle'" />
					</u-form-item>
				</block>
			</view>

			<!-- 子表 -->
			<!-- #ifndef MP -->
			<view v-if="items.__config__.jnpfKey == 'table'">
				<jnpfChildrenTable :items='items' :dataForm='dataForm'></jnpfChildrenTable>
			</view>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<template v-if="items.__config__.jnpfKey == 'table'">
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
								<u-number-box v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									:min="children.min" :max="children.max" :step="children.step" :input-width="120"
									:positive-integer="false" :input-height="60"
									v-if="children.__config__.jnpfKey == 'numInput'" />
								<jnpf-select v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									placeholder="请选择下拉框组" :options="children.__slot__.options"
									:props="children.__config__.props" v-if="children.__config__.jnpfKey == 'select'" />
								<jnpf-tree-select v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									:placeholder="children.placeholder" :options="children.options"
									v-if="children.__config__.jnpfKey == 'treeSelect'" />
								<jnpf-cascader v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									placeholder="请选择级联选择" :options="children.options"
									v-if="children.__config__.jnpfKey == 'cascader'" />
								<jnpf-date-time type="date" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									v-if="children.__config__.jnpfKey == 'date'" />
								<jnpf-date-time type="time" v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									v-if="children.__config__.jnpfKey == 'time'" />
								<jnpf-city-select v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									placeholder="请选择省市区" :level="2" v-if="children.__config__.jnpfKey == 'address'" />
								<jnpf-org-select type="organize"
									v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									v-if="children.__config__.jnpfKey == 'comSelect'" />
								<jnpf-org-select type="department"
									v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									v-if="children.__config__.jnpfKey == 'depSelect'" />
								<jnpf-org-select v-model="dataForm[items.__vModel__][i][children.__vModel__]"
									v-if="children.__config__.jnpfKey == 'userSelect'" />
								<jnpf-org-select type="position"
									v-model="dataForm[items.__vModel__][i][children.__vModel__]"
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
			<!-- #endif -->
		</view>
	</view>

</template>

<script>
	import jnpfChildrenTable from '@/components/jnpf/jnpf-childrenTable/index.vue'
	export default {
		components: {
			jnpfChildrenTable
		},
		props: {
			formData: {
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
			},
			judgeShow: {
				type: Function
			},
			judgeWrite: {
				type: Function
			},
			webType: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				options: [],
			}
		},
		
		methods: {
			// #ifdef MP-WEIXIN
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
			// #endif


			submitForm() {
				this.$emit('submit', this.dataForm)
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.logForm-v {
		padding-bottom: 140rpx;

		.btnBox {
			width: 100%;
			height: 86rpx;
			position: fixed;
			bottom: 0rpx;

			.u-size-medium {
				width: 100%;
				border: 'none',
			}
		}
	}
</style>
