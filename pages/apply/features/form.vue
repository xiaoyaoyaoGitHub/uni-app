<template>
	<view class="logForm-v jnpf-wrap">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<view v-for="(items,index) in filedList.fields" :key='index'>
				<u-form-item :label="items.__config__.label" prop="billRule"
					v-if="items.__config__.jnpfKey == 'billRule'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="createUser"
					v-if="items.__config__.jnpfKey == 'createUser'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="createTime"
					v-if="items.__config__.jnpfKey == 'createTime'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="modifyUser"
					v-if="items.__config__.jnpfKey == 'modifyUser'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="modifyTime"
					v-if="items.__config__.jnpfKey == 'modifyTime'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="currOrganize"
					v-if="items.__config__.jnpfKey == 'currOrganize'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="currDept"
					v-if="items.__config__.jnpfKey == 'currDept'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="currPosition"
					v-if="items.__config__.jnpfKey == 'currPosition'">
					<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>

				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'comInput'">
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'textarea'">
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]" type="textarea" :required='items.__config__.required'></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="checkbox"
					v-if="items.__config__.jnpfKey == 'checkbox'">
					<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
						:options="items.__config__.options" :props="items.__config__.props" multiple :required='items.__config__.required'>
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="numInput"
					v-if="items.__config__.jnpfKey == 'numInput'">
					<u-number-box v-model="dataForm[items.__vModel__]" :min="items.min" :max="items.max"
						:step="items.step" :input-width="120" :positive-integer="false" :input-height="60" :required='items.__config__.required'>
					</u-number-box>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="select" v-if="items.__config__.jnpfKey == 'select'">
					<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
						:options="items.__config__.options" :props="items.__config__.props" :required='items.__config__.required'>
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="radio" v-if="items.__config__.jnpfKey == 'radio'">
					<u-radio-group v-model="dataForm[items.__vModel__]">
						<u-radio v-for="(radios, radioIndex) in items.__config__.options" :key="radioIndex"
							:name="radios[items.__config__.props.value]" :required='items.__config__.required'>
							{{ radios[items.__config__.props.label] }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="switch" v-if="items.__config__.jnpfKey == 'switch'">
					<jnpf-switch v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-switch>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="cascader"
					v-if="items.__config__.jnpfKey == 'cascader'">
					<jnpf-cascader v-model="dataForm[items.__vModel__]" placeholder="请选择级联选择"
						:options="items.__config__.options" :required='items.__config__.required'>
					</jnpf-cascader>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="time" v-if="items.__config__.jnpfKey == 'time'">
					<jnpf-date-time type="time" v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="date" v-if="items.__config__.jnpfKey == 'date'">
					<jnpf-date-time type="date" v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="uploadImg"
					v-if="items.__config__.jnpfKey == 'uploadImg'">
					<jnpf-upload v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-upload>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="rate" v-if="items.__config__.jnpfKey == 'rate'">
					<u-rate v-model="dataForm[items.__vModel__]" size="40"
						@change="changeRate($event,items.__vModel__)" :required='items.__config__.required'>
					</u-rate>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="slider" v-if="items.__config__.jnpfKey == 'slider'">
					<u-slider v-model="dataForm[items.__vModel__]" :step="items.step" :min="items.min" :max="items.max"
						style="width: 100%;" :required='items.__config__.required'>
						<view class="">
							<view class="badge-button">
								{{dataForm[items.__vModel__]}}
							</view>
						</view>
					</u-slider>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="comSelect"
					v-if="items.__config__.jnpfKey == 'comSelect'">
					<jnpf-org-select type="organize" v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="depSelect"
					v-if="items.__config__.jnpfKey == 'depSelect'">
					<jnpf-org-select type="department" v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="userSelect"
					v-if="items.__config__.jnpfKey == 'userSelect'">
					<jnpf-org-select v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="posSelect"
					v-if="items.__config__.jnpfKey == 'posSelect'">
					<jnpf-org-select type="position" v-model="dataForm[items.__vModel__]" :required='items.__config__.required'></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="divider"
					v-if="items.__config__.jnpfKey == 'divider'">
					<u-divider>{{items.__config__.default}}</u-divider>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="address"
					v-if="items.__config__.jnpfKey == 'address'">
					<jnpf-city-select v-model="dataForm[items.__vModel__]" placeholder="请选择省市区" :level="2" :required='items.__config__.required'>
					</jnpf-city-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="treeSelect"
					v-if="items.__config__.jnpfKey == 'treeSelect'">
					<jnpf-tree-select v-model="dataForm[items.__vModel__]" placeholder="请选择树形选择"
						:options="items.__config__.options" :required='items.__config__.required'>
					</jnpf-tree-select>
				</u-form-item>
				<u-form-item prop="groupTitle" v-if="items.__config__.jnpfKey == 'groupTitle'">
					<jnpf-group :content="items.content" :content-position="items['content-position']" :required='items.__config__.required'></jnpf-group>
				</u-form-item>
				<!-- 卡片 -->
				<view class="jnpf-card" v-if="items.__config__.jnpfKey == 'card'">
					<block v-for="(card,i) in items.__config__.children" :key='i'>
						<u-form-item :label="card.__config__.label" prop="billRule"
							v-if="card.__config__.jnpfKey == 'billRule'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="createUser"
							v-if="card.__config__.jnpfKey == 'createUser'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="createTime"
							v-if="card.__config__.jnpfKey == 'createTime'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="modifyUser"
							v-if="card.__config__.jnpfKey == 'modifyUser'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="modifyTime"
							v-if="card.__config__.jnpfKey == 'modifyTime'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="currOrganize"
							v-if="card.__config__.jnpfKey == 'currOrganize'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="currDept"
							v-if="card.__config__.jnpfKey == 'currDept'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="currPosition"
							v-if="card.__config__.jnpfKey == 'currPosition'">
							<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
						</u-form-item>
						
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'comInput'">
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'textarea'">
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]" type="textarea" :required='card.__config__.required'></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="checkbox"
							v-if="card.__config__.jnpfKey == 'checkbox'">
							<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
								:options="card.__config__.options" :props="card.__config__.props" multiple :required='card.__config__.required'>
							</jnpf-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="numInput"
							v-if="card.__config__.jnpfKey == 'numInput'">
							<u-number-box v-model="dataForm[card.__vModel__]" :min="card.min" :max="card.max"
								:step="card.step" :input-width="120" :positive-integer="false" :input-height="60" :required='card.__config__.required'>
							</u-number-box>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="select" v-if="card.__config__.jnpfKey == 'select'">
							<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
								:options="card.__config__.options" :props="card.__config__.props" :required='card.__config__.required'>
							</jnpf-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="radio" v-if="card.__config__.jnpfKey == 'radio'">
							<u-radio-group v-model="dataForm[card.__vModel__]">
								<u-radio v-for="(radios, radioIndex) in card.__config__.options" :key="radioIndex"
									:name="radios[card.__config__.props.value]" :required='card.__config__.required'>
									{{ radios[card.__config__.props.label] }}
								</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="switch" v-if="card.__config__.jnpfKey == 'switch'">
							<jnpf-switch v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-switch>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="cascader"
							v-if="card.__config__.jnpfKey == 'cascader'">
							<jnpf-cascader v-model="dataForm[card.__vModel__]" placeholder="请选择级联选择"
								:options="card.__config__.options" :required='card.__config__.required'>
							</jnpf-cascader>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="time" v-if="card.__config__.jnpfKey == 'time'">
							<jnpf-date-time type="time" v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-date-time>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="date" v-if="card.__config__.jnpfKey == 'date'">
							<jnpf-date-time type="date" v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-date-time>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="uploadImg"
							v-if="card.__config__.jnpfKey == 'uploadImg'">
							<jnpf-upload v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-upload>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="rate" v-if="card.__config__.jnpfKey == 'rate'">
							<u-rate v-model="dataForm[card.__vModel__]" size="40"
								@change="changeRate($event,card.__vModel__)" :required='card.__config__.required'>
							</u-rate>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="slider" v-if="card.__config__.jnpfKey == 'slider'">
							<u-slider v-model="dataForm[card.__vModel__]" :step="card.step" :min="card.min" :max="card.max"
								style="width: 100%;" :required='card.__config__.required'>
								<view class="">
									<view class="badge-button">
										{{dataForm[card.__vModel__]}}
									</view>
								</view>
							</u-slider>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="comSelect"
							v-if="card.__config__.jnpfKey == 'comSelect'">
							<jnpf-org-select type="organize" v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="depSelect"
							v-if="card.__config__.jnpfKey == 'depSelect'">
							<jnpf-org-select type="department" v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="userSelect"
							v-if="card.__config__.jnpfKey == 'userSelect'">
							<jnpf-org-select v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="posSelect"
							v-if="card.__config__.jnpfKey == 'posSelect'">
							<jnpf-org-select type="position" v-model="dataForm[card.__vModel__]" :required='card.__config__.required'></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="divider"
							v-if="card.__config__.jnpfKey == 'divider'">
							<u-divider>{{card.__config__.default}}</u-divider>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="address"
							v-if="card.__config__.jnpfKey == 'address'">
							<jnpf-city-select v-model="dataForm[card.__vModel__]" placeholder="请选择省市区" :level="2" :required='card.__config__.required'>
							</jnpf-city-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="treeSelect"
							v-if="card.__config__.jnpfKey == 'treeSelect'">
							<jnpf-tree-select v-model="dataForm[card.__vModel__]" placeholder="请选择树形选择"
								:options="card.__config__.options" :required='card.__config__.required'>
							</jnpf-tree-select>
						</u-form-item>
						<u-form-item prop="groupTitle" v-if="card.__config__.jnpfKey == 'groupTitle'">
							<jnpf-group :content="card.content" :content-position="card['content-position']" :required='card.__config__.required'></jnpf-group>
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
		onReady() {
			this.$refs.dataForm.setRules(this.rules);
		},
		onLoad(option) {
			let featuresId = option.featuresId
			/* 判断url里面有没有id 返回true/false  修改表单的id*/
			this.isId = Object.prototype.hasOwnProperty.call(option, 'id');
			this.featuresId = option.featuresId
			if (this.isId) {
				this.id = option.id
				wirteBack(this.id,featuresId).then(res =>{
					this.dataForm = JSON.parse(res.data.data)
					this.dataForm.id = this.id
				})
			}
			this.init(featuresId)
		},
		methods: {
			init(id) {
				config(id).then(res => {
					this.filedList = JSON.parse(res.data.formData);
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
