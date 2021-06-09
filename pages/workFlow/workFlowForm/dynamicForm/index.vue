<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<view v-for="(item,index) in this.filedList.fields" :key='index'>
				<u-form-item :label="item.__config__.label" prop="billRule"
					v-if="item.__config__.jnpfKey == 'billRule'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="createUser"
					v-if="item.__config__.jnpfKey == 'createUser'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="createTime"
					v-if="item.__config__.jnpfKey == 'createTime'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="modifyUser"
					v-if="item.__config__.jnpfKey == 'modifyUser'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="modifyTime"
					v-if="item.__config__.jnpfKey == 'modifyTime'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="currOrganize"
					v-if="item.__config__.jnpfKey == 'currOrganize'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="currDept"
					v-if="item.__config__.jnpfKey == 'currDept'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="currPosition"
					v-if="item.__config__.jnpfKey == 'currPosition'">
					<u-input v-model="dataForm[item.__vModel__]" placeholder="系统自动生成" disabled></u-input>
				</u-form-item>


				<u-form-item :label="item.__config__.label" v-if="item.__config__.jnpfKey == 'comInput'">
					<u-input placeholder="请输入" v-model="dataForm[item.__vModel__]"></u-input>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="checkbox"
					v-if="item.__config__.jnpfKey == 'checkbox'">
					<jnpf-select v-model="dataForm[item.__vModel__]" placeholder="请选择下拉框组"
						:options="item.__slot__.options" multiple>
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="numInput"
					v-if="item.__config__.jnpfKey == 'numInput'">
					<u-number-box v-model="dataForm[item.__vModel__]" :min="item.min" :max="item.max" :step="item.step"
						:input-width="120" :positive-integer="false" :input-height="60"></u-number-box>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="select" v-if="item.__config__.jnpfKey == 'select'">
					<jnpf-select v-model="dataForm[item.__vModel__]" placeholder="请选择下拉框组"
						:options="item.__slot__.options">
					</jnpf-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="radio" v-if="item.__config__.jnpfKey == 'radio'">
					<u-radio-group v-model="dataForm[item.__vModel__]">
						<u-radio v-for="(item, radioIndex) in item.__slot__.options" :key="radioIndex" :name="item.id">
							{{ item.fullName }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="switch" v-if="item.__config__.jnpfKey == 'switch'">
					<jnpf-switch v-model="dataForm[item.__vModel__]"></jnpf-switch>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="cascader"
					v-if="item.__config__.jnpfKey == 'cascader'">
					<jnpf-cascader v-model="dataForm[item.__vModel__]" placeholder="请选择级联选择" :options="item.options">
					</jnpf-cascader>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="time" v-if="item.__config__.jnpfKey == 'time'">
					<jnpf-date-time type="time" v-model="dataForm[item.__vModel__]"></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="date" v-if="item.__config__.jnpfKey == 'date'">
					<jnpf-date-time type="date" v-model="dataForm[item.__vModel__]"></jnpf-date-time>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="uploadImg"
					v-if="item.__config__.jnpfKey == 'uploadImg'">
					<jnpf-upload v-model="dataForm[item.__vModel__]"></jnpf-upload>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="rate" v-if="item.__config__.jnpfKey == 'rate'">
					<u-rate v-model="dataForm[item.__vModel__]" size="40" @change="changeRate($event,item.__vModel__)">
					</u-rate>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="slider" v-if="item.__config__.jnpfKey == 'slider'">
					<u-slider v-model="dataForm[item.__vModel__]" :step="item.step" :min="item.min" :max="item.max"
						style="width: 100%;">
						<view class="">
							<view class="badge-button">
								{{dataForm[item.__vModel__]}}
							</view>
						</view>
					</u-slider>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="comSelect"
					v-if="item.__config__.jnpfKey == 'comSelect'">
					<jnpf-org-select type="organize" v-model="dataForm[item.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="depSelect"
					v-if="item.__config__.jnpfKey == 'depSelect'">
					<jnpf-org-select type="department" v-model="dataForm[item.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="userSelect"
					v-if="item.__config__.jnpfKey == 'userSelect'">
					<jnpf-org-select v-model="dataForm[item.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="posSelect"
					v-if="item.__config__.jnpfKey == 'posSelect'">
					<jnpf-org-select type="position" v-model="dataForm[item.__vModel__]"></jnpf-org-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="divider" v-if="item.__config__.jnpfKey == 'divider'">
					<u-divider>{{item.__slot__.default}}</u-divider>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="address" v-if="item.__config__.jnpfKey == 'address'">
					<jnpf-city-select v-model="dataForm[item.__vModel__]" placeholder="请选择省市区" :level="2">
					</jnpf-city-select>
				</u-form-item>
				<u-form-item :label="item.__config__.label" prop="treeSelect"
					v-if="item.__config__.jnpfKey == 'treeSelect'">
					<jnpf-tree-select v-model="dataForm[item.__vModel__]" placeholder="请选择树形选择" :options="item.options">
					</jnpf-tree-select>
				</u-form-item>
				<u-form-item prop="groupTitle" v-if="item.__config__.jnpfKey == 'groupTitle'">
					<jnpf-group :content="item.content" :content-position="item['content-position']"></jnpf-group>
				</u-form-item>
				<!-- 卡片 -->
				<view class="jnpf-card" v-if="item.__config__.jnpfKey == 'card'">
					<block  v-for="(card,i) in item.__config__.children">
						<u-form-item :label="card.__config__.label" v-if="card.__config__.jnpfKey == 'comInput'">
							<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]"></u-input>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="numInput"
							v-if="card.__config__.jnpfKey == 'numInput'">
							<u-number-box v-model="dataForm[card.__vModel__]" :min="card.min" :max="card.max" :step="card.step"
								:input-width="120" :positive-integer="false" :input-height="60"></u-number-box>
						</u-form-item>
						<u-form-item :label="card.__config__.label" prop="switch" v-if="card.__config__.jnpfKey == 'switch'">
							<jnpf-switch v-model="dataForm[card.__vModel__]"></jnpf-switch>
						</u-form-item>
					</block>
				</view>
			</view>
		</u-form>
	</view>
</template>


<script>
	import {
		DynamicInfo
	} from '@/api/workFlow/workFlowForm'
	export default {
		name: 'dynamicForm',
		data() {
			return {
				filedList: [],
				setting: {},
				dataForm: {},
				rules: {},
				options: [],
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
				console.log(data)
				this.dataForm.id = data.id || '';
				this.setting = data;
				this.filedList = JSON.parse(this.setting.formConf);
				let fields = this.filedList.fields;
				console.log(fields)
				let defaultValue;
				let vModel;
				for (let i = 0; i < fields.length; i++) {
					defaultValue = fields[i].__config__.defaultValue;
					vModel = fields[i].__vModel__;
					if (defaultValue) this.$set(this.dataForm, vModel, defaultValue)
				}
				if (data.id) {
					DynamicInfo(data.id).then(res => {
						this.dataForm = JSON.parse(res.data.data)
					})
				}
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
