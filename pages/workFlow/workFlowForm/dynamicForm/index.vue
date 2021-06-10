<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
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
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]"></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" v-if="items.__config__.jnpfKey == 'textarea'">
					<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]" type="textarea"></u-input>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="checkbox"
					v-if="items.__config__.jnpfKey == 'checkbox'">
					<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
						:options="items.__slot__.options" :props="items.__config__.props" multiple>
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="numInput"
					v-if="items.__config__.jnpfKey == 'numInput'">
					<u-number-box v-model="dataForm[items.__vModel__]" :min="items.min" :max="items.max"
						:step="items.step" :input-width="120" :positive-integer="false" :input-height="60">
					</u-number-box>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="select" v-if="items.__config__.jnpfKey == 'select'">
					<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
						:options="items.__slot__.options" :props="items.__config__.props">
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="radio" v-if="items.__config__.jnpfKey == 'radio'">
					<u-radio-group v-model="dataForm[items.__vModel__]">
						<u-radio v-for="(radios, radioIndex) in items.__slot__.options" :key="radioIndex"
							:name="radios[items.__config__.props.value]">
							{{ radios[items.__config__.props.label] }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="switch" v-if="items.__config__.jnpfKey == 'switch'">
					<jnpf-switch v-model="dataForm[items.__vModel__]"></jnpf-switch>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="cascader"
					v-if="items.__config__.jnpfKey == 'cascader'">
					<jnpf-cascader v-model="dataForm[items.__vModel__]" placeholder="请选择级联选择" :options="items.options">
					</jnpf-cascader>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="time" v-if="items.__config__.jnpfKey == 'time'">
					<jnpf-date-time type="time" v-model="dataForm[items.__vModel__]"></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="date" v-if="items.__config__.jnpfKey == 'date'">
					<jnpf-date-time type="date" v-model="dataForm[items.__vModel__]"></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="uploadImg"
					v-if="items.__config__.jnpfKey == 'uploadImg'">
					<jnpf-upload v-model="dataForm[items.__vModel__]"></jnpf-upload>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="rate" v-if="items.__config__.jnpfKey == 'rate'">
					<u-rate v-model="dataForm[items.__vModel__]" size="40"
						@change="changeRate($event,items.__vModel__)">
					</u-rate>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="slider" v-if="items.__config__.jnpfKey == 'slider'">
					<u-slider v-model="dataForm[items.__vModel__]" :step="items.step" :min="items.min" :max="items.max"
						style="width: 100%;">
						<view class="">
							<view class="badge-button">
								{{dataForm[items.__vModel__]}}
							</view>
						</view>
					</u-slider>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="comSelect"
					v-if="items.__config__.jnpfKey == 'comSelect'">
					<jnpf-org-select type="organize" v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="depSelect"
					v-if="items.__config__.jnpfKey == 'depSelect'">
					<jnpf-org-select type="department" v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="userSelect"
					v-if="items.__config__.jnpfKey == 'userSelect'">
					<jnpf-org-select v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="posSelect"
					v-if="items.__config__.jnpfKey == 'posSelect'">
					<jnpf-org-select type="position" v-model="dataForm[items.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="divider"
					v-if="items.__config__.jnpfKey == 'divider'">
					<u-divider>{{items.__slot__.default}}</u-divider>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="address"
					v-if="items.__config__.jnpfKey == 'address'">
					<jnpf-city-select v-model="dataForm[items.__vModel__]" placeholder="请选择省市区" :level="2">
					</jnpf-city-select>
				</u-form-item>
				<u-form-item :label="items.__config__.label" prop="treeSelect"
					v-if="items.__config__.jnpfKey == 'treeSelect'">
					<jnpf-tree-select v-model="dataForm[items.__vModel__]" placeholder="请选择树形选择"
						:options="items.options">
					</jnpf-tree-select>
				</u-form-item>
				<u-form-item prop="groupTitle" v-if="items.__config__.jnpfKey == 'groupTitle'">
					<jnpf-group :content="items.content" :content-position="items['content-position']"></jnpf-group>
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
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]"></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'textarea'">
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]" type="textarea"></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="checkbox"
							v-if="card.__config__.jnpfKey == 'checkbox'">
							<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
								:options="card.__slot__.options" :props="card.__config__.props" multiple>
							</jnpf-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="numInput"
							v-if="card.__config__.jnpfKey == 'numInput'">
							<u-number-box v-model="dataForm[card.__vModel__]" :min="card.min" :max="card.max"
								:step="card.step" :input-width="120" :positive-integer="false" :input-height="60">
							</u-number-box>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="select"
							v-if="card.__config__.jnpfKey == 'select'">
							<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
								:options="card.__slot__.options" :props="card.__config__.props">
							</jnpf-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="radio"
							v-if="card.__config__.jnpfKey == 'radio'">
							<u-radio-group v-model="dataForm[card.__vModel__]">
								<u-radio v-for="(radioCard, radioIndex) in card.__slot__.options" :key="radioIndex"
									:name="radioCard[card.__config__.props.value]">
									{{ radioCard[card.__config__.props.label] }}
								</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="switch"
							v-if="card.__config__.jnpfKey == 'switch'">
							<jnpf-switch v-model="dataForm[card.__vModel__]"></jnpf-switch>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="cascader"
							v-if="card.__config__.jnpfKey == 'cascader'">
							<jnpf-cascader v-model="dataForm[card.__vModel__]" placeholder="请选择级联选择"
								:options="card.options">
							</jnpf-cascader>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="time"
							v-if="card.__config__.jnpfKey == 'time'">
							<jnpf-date-time type="time" v-model="dataForm[card.__vModel__]"></jnpf-date-time>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="date"
							v-if="card.__config__.jnpfKey == 'date'">
							<jnpf-date-time type="date" v-model="dataForm[card.__vModel__]"></jnpf-date-time>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="uploadImg"
							v-if="card.__config__.jnpfKey == 'uploadImg'">
							<jnpf-upload v-model="dataForm[card.__vModel__]"></jnpf-upload>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="rate"
							v-if="card.__config__.jnpfKey == 'rate'">
							<u-rate v-model="dataForm[card.__vModel__]" size="40"
								@change="changeRate($event,card.__vModel__)">
							</u-rate>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="slider"
							v-if="card.__config__.jnpfKey == 'slider'">
							<u-slider v-model="dataForm[card.__vModel__]" :step="card.step" :min="card.min"
								:max="card.max" style="width: 100%;">
								<view class="">
									<view class="badge-button">
										{{dataForm[card.__vModel__]}}
									</view>
								</view>
							</u-slider>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="comSelect"
							v-if="card.__config__.jnpfKey == 'comSelect'">
							<jnpf-org-select type="organize" v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="depSelect"
							v-if="card.__config__.jnpfKey == 'depSelect'">
							<jnpf-org-select type="department" v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="userSelect"
							v-if="card.__config__.jnpfKey == 'userSelect'">
							<jnpf-org-select v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="posSelect"
							v-if="card.__config__.jnpfKey == 'posSelect'">
							<jnpf-org-select type="position" v-model="dataForm[card.__vModel__]"></jnpf-org-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="divider"
							v-if="card.__config__.jnpfKey == 'divider'">
							<u-divider>{{card.__slot__.default}}</u-divider>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="address"
							v-if="card.__config__.jnpfKey == 'address'">
							<jnpf-city-select v-model="dataForm[card.__vModel__]" placeholder="请选择省市区" :level="2">
							</jnpf-city-select>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="treeSelect"
							v-if="card.__config__.jnpfKey == 'treeSelect'">
							<jnpf-tree-select v-model="dataForm[card.__vModel__]" placeholder="请选择树形选择"
								:options="card.options">
							</jnpf-tree-select>
						</u-form-item>
						<u-form-item prop="groupTitle" v-if="card.__config__.jnpfKey == 'groupTitle'">
							<jnpf-group :content="card.content" :content-position="card['content-position']">
							</jnpf-group>
						</u-form-item>
					</block>
				</view>

				<!-- 子表 -->
				<view class="jnpf-table" v-if="items.__config__.jnpfKey == 'table'">
					<view class="jnpf-table-item" v-for="(tableItem,tableIndex) in dataForm[items.__vModel__]"
						:key='tableIndex'>
						<view class="jnpf-table-item-title u-flex u-row-between">
							<text class="jnpf-table-item-title-num">设计子表({{tableIndex+1}})</text>
							<view class="jnpf-table-item-title-action" v-if="dataForm.table.length>1"
								@click="delItem(tableIndex)">删除
							</view>
						</view>
						<view v-for="(childItem, childIndex) in items.__config__.children" :key="childIndex">
							<u-form-item :label="childItem.__config__.label" prop="dataForm.table[i].comInput"
								v-if="childItem.__config__.jnpfKey='comInput'">
								<u-input v-model="dataForm[childItem.__vModel__]" placeholder="请输入"></u-input>
							</u-form-item>
						</view>
					</view>
					<view class="jnpf-table-addBtn" @click="addItem(items)">
						<u-icon name="plus" color="#2979ff"></u-icon>添加
					</view>
				</view>
			</view>
		</u-form>
	</view>
</template>


<script>
	import {
		DynamicInfo
	} from '@/api/workFlow/workFlowForm'
	import {
		previewDataInterface
	} from '@/api/common.js'
	export default {
		name: 'dynamicForm',
		data() {
			return {
				filedList: [],
				setting: {},
				dataForm: {
					// table: []
				},
				rules: {},
				tableVmodel: [],
				options: []
			}
		},
		onLoad(url) {

		},
		methods: {
			changeRate(e, model) {
				let rateVal = e;
				this.$set(this.dataForm, model, rateVal)
			},
			init(data) {
				this.dataForm.id = data.id || '';
				this.setting = data;
				this.filedList = JSON.parse(this.setting.formConf);
				let fields = this.filedList.fields;
				console.log(fields)
				let defaultValue;
				let vModel;
				let dataType;
				let propsUrl;
				let dynamicList;
				let _options;
				let jnpfKey;
				let children;
				for (let i = 0; i < fields.length; i++) {
					defaultValue = fields[i].__config__.defaultValue;
					vModel = fields[i].__vModel__;
					dataType = fields[i].__config__.dataType;
					propsUrl = fields[i].__config__.propsUrl;
					jnpfKey = fields[i].__config__.jnpfKey;
					if (defaultValue) this.$set(this.dataForm, vModel, defaultValue);
					if (jnpfKey == 'card') {
						children = fields[i].__config__.children;
						let card_defaultValue;
						let card_vModel;
						let card_dataType;
						let card_propsUrl;
						let card_dynamicList;
						let card_options;
						let card_jnpfKey;
						for (let j = 0; j < children.length; j++) {
							card_dataType = children[j].__config__.dataType;
							card_propsUrl = children[j].__config__.propsUrl;
							card_jnpfKey = children[j].__config__.jnpfKey;
							card_defaultValue = children[j].__config__.defaultValue;
							card_vModel = children[j].__vModel__;
							if (card_defaultValue) this.$set(this.dataForm,card_vModel,card_defaultValue);
							if (card_dataType == 'dynamic') {
								this.dynamicHandel(card_propsUrl,children[j],card_jnpfKey)
							}
						}
					}
					if (dataType == 'dynamic') {
						this.dynamicHandel(propsUrl,fields[i],jnpfKey)
					}
				}

				if (data.id) {
					DynamicInfo(data.id).then(res => {
						this.dataForm = JSON.parse(res.data.data)
					})
				}
			},
			
			dynamicHandel(propsUrl,item,jnpfKey){
				previewDataInterface(propsUrl).then(res => {
					if (res.data) {
						if (jnpfKey == 'select' || jnpfKey == 'radio' || jnpfKey == 'checkbox') {
							item.__slot__.options = res.data;
						} else {
							item.options = res.data;
						}
					}
				})
			},
			
			addItem(item) {
				let childItem = {}
				let list = this.dataForm.table
				for (var j = 0; j < item.__config__.children.length; j++) {
					let e = item.__config__.children[j]
					childItem[e.__vModel__] = e.__config__.defaultValue
				}
				this.dataForm.table.push(childItem)
			},
			submit(eventType) {
				this.$refs.dataForm.validate((valid) => {
					if (valid) {
						const query = {
							flowId: this.setting.flowId,
							data: JSON.stringify(this.dataForm),
							id: this.setting.id
						}
						this.$emit('eventReciver', query, eventType)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.badge-button {
		padding: 4rpx 6rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 1;
	}
</style>
