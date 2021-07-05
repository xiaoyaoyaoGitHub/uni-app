<template>
	<view class="logForm-v jnpf-wrap">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<view v-for="(items,index) in filedList.fields" :key='index'>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'billRule'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'createUser'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'createTime'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'modifyUser'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'modifyTime'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'currOrganize'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'currDept'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'currPosition'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>

				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'comInput'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]"></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'textarea'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]" type="textarea"></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'checkbox'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
						:options="items.__config__.options" :props="items.__config__.props" multiple>
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'numInput'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<u-number-box v-model="dataForm[items.__vModel__]" :min="items.min" :max="items.max"
						:step="items.step" :input-width="120" :positive-integer="false" :input-height="60">
					</u-number-box>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'select'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
						:options="items.__config__.options" :props="items.__config__.props">
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'radio'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<u-radio-group v-model="dataForm[items.__vModel__]">
						<u-radio v-for="(radios, radioIndex) in items.__config__.options" :key="radioIndex"
							:name="radios[items.__config__.props.value]">
							{{ radios[items.__config__.props.label] }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'switch'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<jnpf-switch v-model="dataForm[items.__vModel__]"></jnpf-switch>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'cascader'" :required='items.__config__.required'>
					<jnpf-cascader v-model="dataForm[items.__vModel__]" placeholder="请选择级联选择"
						:options="items.__config__.options">
					</jnpf-cascader>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'time'" :required='items.__config__.required'>
					<jnpf-date-time type="time" v-model="dataForm[items.__vModel__]"></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'date'" :required='items.__config__.required'>
					<jnpf-date-time type="date" v-model="dataForm[items.__vModel__]"></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'uploadImg'" :required='items.__config__.required'>
					<jnpf-upload v-model="dataForm[items.__vModel__]"></jnpf-upload>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'rate'" :required='items.__config__.required'>
					<u-rate v-model="dataForm[items.__vModel__]" size="40"
						@change="changeRate($event,items.__vModel__)">
					</u-rate>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'slider'" :required='items.__config__.required'>
					<u-slider v-model="dataForm[items.__vModel__]" :step="items.step" :min="items.min" :max="items.max"
						style="width: 100%;">
						<view class="">
							<view class="badge-button">
								{{dataForm[items.__vModel__]}}
							</view>
						</view>
					</u-slider>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'comSelect'" :required='items.__config__.required'>
					<jnpf-org-select type="organize" v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'depSelect'" :required='items.__config__.required'>
					<jnpf-org-select type="department" v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'userSelect'" :required='items.__config__.required'>
					<jnpf-org-select v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'posSelect'" :required='items.__config__.required'>
					<jnpf-org-select type="position" v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'divider'">
					<u-divider>{{items.__config__.default}}</u-divider>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'address'" :required='items.__config__.required'>
					<jnpf-city-select v-model="dataForm[items.__vModel__]" placeholder="请选择省市区" :level="2">
					</jnpf-city-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
					v-if="items.__config__.jnpfKey == 'treeSelect'" :required='items.__config__.required'>
					<jnpf-tree-select v-model="dataForm[items.__vModel__]" placeholder="请选择树形选择"
						:options="items.__config__.options">
					</jnpf-tree-select>
				</u-form-item>
				<u-form-item prop="groupTitle" v-if="items.__config__.jnpfKey == 'groupTitle'"
					:required='items.__config__.required' :prop="items.__vModel__">
					<jnpf-group :content="items.content" :content-position="items['content-position']"></jnpf-group>
				</u-form-item>
				<!-- 卡片 -->
				<view class="jnpf-card" v-if="items.__config__.jnpfKey == 'card'">
					<block v-for="(card,i) in items.__config__.children" :key='i'>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'billRule'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'createUser'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'createTime'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'modifyUser'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'modifyTime'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'currOrganize'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'currDept'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'currPosition'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>

						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'comInput'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]"></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'textarea'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]" type="textarea"></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'checkbox'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
								:options="card.__slot__.options" :props="card.__config__.props" multiple>
							</jnpf-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'numInput'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<u-number-box v-model="dataForm[card.__vModel__]" :min="card.min" :max="card.max"
								:step="card.step" :input-width="120" :positive-integer="false" :input-height="60">
							</u-number-box>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'select'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
								:options="card.__slot__.options" :props="card.__config__.props">
							</jnpf-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'radio'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<u-radio-group v-model="dataForm[card.__vModel__]">
								<u-radio v-for="(radios, radioIndex) in card.__slot__.options" :key="radioIndex"
									:name="radios[card.__config__.props.value]">
									{{ radios[card.__config__.props.label] }}
								</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'switch'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<jnpf-switch v-model="dataForm[card.__vModel__]"></jnpf-switch>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'cascader'" :required='card.__config__.required'>
							<jnpf-cascader v-model="dataForm[card.__vModel__]" placeholder="请选择级联选择"
								:options="card.__slot__.options">
							</jnpf-cascader>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'time'" :required='card.__config__.required'>
							<jnpf-date-time type="time" v-model="dataForm[card.__vModel__]"></jnpf-date-time>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'date'" :required='card.__config__.required'>
							<jnpf-date-time type="date" v-model="dataForm[card.__vModel__]"></jnpf-date-time>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'uploadImg'" :required='card.__config__.required'>
							<jnpf-upload v-model="dataForm[card.__vModel__]"></jnpf-upload>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'rate'" :required='card.__config__.required'>
							<u-rate v-model="dataForm[card.__vModel__]" size="40"
								@change="changeRate($event,card.__vModel__)">
							</u-rate>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'slider'" :required='card.__config__.required'>
							<u-slider v-model="dataForm[card.__vModel__]" :step="card.step" :min="card.min"
								:max="card.max" style="width: 100%;">
								<view class="">
									<view class="badge-button">
										{{dataForm[card.__vModel__]}}
									</view>
								</view>
							</u-slider>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'comSelect'" :required='card.__config__.required'>
							<jnpf-org-select type="organize" v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'depSelect'" :required='card.__config__.required'>
							<jnpf-org-select type="department" v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'userSelect'" :required='card.__config__.required'>
							<jnpf-org-select v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'posSelect'" :required='card.__config__.required'>
							<jnpf-org-select type="position" v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'divider'">
							<u-divider>{{card.__config__.default}}</u-divider>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'address'" :required='card.__config__.required'>
							<jnpf-city-select v-model="dataForm[card.__vModel__]" placeholder="请选择省市区" :level="2">
							</jnpf-city-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
							v-if="card.__config__.jnpfKey == 'treeSelect'" :required='card.__config__.required'>
							<jnpf-tree-select v-model="dataForm[card.__vModel__]" placeholder="请选择树形选择"
								:options="card.__slot__.options">
							</jnpf-tree-select>
						</u-form-item>
						<u-form-item prop="groupTitle" v-if="card.__config__.jnpfKey == 'groupTitle'"
							:required='card.__config__.required' :prop="card.__vModel__">
							<jnpf-group :content="card.content" :content-position="card['content-position']">
							</jnpf-group>
						</u-form-item>
					</block>
				</view>

				<!-- 子表 -->
				<!-- <view class="jnpf-table" v-if="items.__config__.jnpfKey == 'table'">
					<view class="jnpf-table-item" v-for="(tableItem,tableIndex) in dataForm[items.__vModel__]"
						:key='tableIndex'>
						<view class="jnpf-table-item-title u-flex u-row-between">
							<text class="jnpf-table-item-title-num">设计子表({{tableIndex+1}})</text>
							<view class="jnpf-table-item-title-action" v-if="dataForm.table.length>1"
								@click="delItem(tableIndex)">删除
							</view>
						</view>
						<view v-for="(childItem, childIndex) in items.__config__.children" :key="childIndex">
							<u-form-item :label="childItem.__config__.label" prop="dataForm.table[i].comInput">
								<u-input v-model="dataForm[childItem.__vModel__]" placeholder="请输入"></u-input>
							</u-form-item>
						</view>
					</view>
					<view class="jnpf-table-addBtn" @click="addItem(items)">
						<u-icon name="plus" color="#2979ff"></u-icon>添加
					</view>
				</view> -->
			</view>

		</u-form>
		<view class="buttom-actions">
			<u-button class="buttom-btn" @click="jnpf.goBack">{{filedList.cancelButtonText}}</u-button>
			<u-button class="buttom-btn" type="primary" @click="submit">{{filedList.confirmButtonText}}</u-button>
		</view>
	</view>
</template>

<script>
	import {
		config,
		create,
		update,
		wirteBack
	} from '@/api/apply/features.js'
	export default {
		data() {
			return {
				filedList: [],
				setting: {},
				dataForm: {
					// table: []
				},
				rules: {},
				tableVmodel: [],
				options: [],
				customStyle: {
					height: '43px',
				},
				isId: false,
				featuresId: ''
			}
		},
		mounted() {
			this.$refs.dataForm.setRules(this.rules);
		},
		onLoad(option) {
			let featuresId = option.featuresId
			/* 判断url里面有没有id 返回true/false  修改表单的id*/
			this.isId = Object.prototype.hasOwnProperty.call(option, 'id');
			this.featuresId = option.featuresId
			if (this.isId) {
				this.id = option.id
				wirteBack(this.id, featuresId).then(res => {
					this.dataForm = JSON.parse(res.data.data)
					this.dataForm.id = this.id
				})
			}
			this.init(featuresId);

		},
		methods: {
			init(id) {
				this.$nextTick(function() {
					config(id).then(res => {
						this.filedList = JSON.parse(res.data.formData);
						let fields = this.filedList.fields;
						let required;
						let label;
						let vModel;
						let children;
						let cardRequired;
						let cardVModel;
						let cardLabel;
						for (let i = 0; i < fields.length; i++) {
							required = fields[i].__config__.required;
							label = fields[i].__config__.label;
							vModel = fields[i].__vModel__;
							children = fields[i].__config__.children || [];
							if (required) {
								this.rules[vModel] = [{
									required: true,
									message: label + '不能为空',
									trigger: 'blur'
								}];
								if (vModel.indexOf('dateField') >= 0 ||
									vModel.indexOf('selectField') >= 0 || vModel.indexOf(
										'radioField') >= 0) {
									this.rules[vModel] = this.rules[vModel].map(o => ({
										type: 'number',
										...o
									}))
								} else if (vModel.indexOf('checkboxField') >= 0) {
									this.rules[vModel] = this.rules[vModel].map(o => ({
										type: 'array',
										...o
									}))
								}
							}
							for (let c = 0; c < children.length; c++) {
								cardRequired = children[c].__config__.required;
								cardVModel = children[c].__vModel__;
								cardLabel = children[c].__config__.label;
								if (cardRequired) {
									this.rules[cardVModel] = [{
										required: true,
										message: cardLabel + '不能为空',
										trigger: 'blur'
									}];
									if (card_vModel.indexOf('dateField') >= 0 ||
										card_vModel.indexOf('selectField') >= 0 || card_vModel.indexOf(
											'radioField') >= 0) {
										this.rules[cardVModel] = this.rules[cardVModel].map(o => ({
											type: 'number',
											...o
										}))
									} else if (cardVModel.indexOf('checkboxField') >= 0) {
										this.rules[cardVModel] = this.rules[cardVModel].map(o => ({
											type: 'array',
											...o
										}))
									}
								}
							}
						}
					})
				})
			},
			submit() {
				this.$refs.dataForm.validate((valid) => {
					if (valid) {
						const method = this.dataForm.id ? update : create;
						let data = {
							data: JSON.stringify(this.dataForm)
						}
						if (this.isId) {
							data.id = this.id
						}
						method(data, this.featuresId).then(res => {
							uni.showToast({
								title: res.msg,
								complete: () => {
									setTimeout(() => {
										this.eventHub.$emit('refresh')
										uni.navigateBack()
									}, 1500)
								}
							})
						})
					}
				})
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
