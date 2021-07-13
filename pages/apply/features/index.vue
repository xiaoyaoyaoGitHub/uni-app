<template>
	<view>
		<template v-if="webType === '1'">
			<view class="logForm-v jnpf-wrap">
				<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
					label-width="150" label-align="left">
					<jnpfFormControl :formData='filedList' ref="formControl" :webType='webType' @submit="submitForm"
						:dataForm='dataForm' v-if="flag" />
					<view class="buttom-actions">
						<u-button class="buttom-btn" @click="jnpf.goBack">{{filedList.cancelButtonText}}</u-button>
						<u-button class="buttom-btn" type="primary" @click="submit">{{filedList.confirmButtonText}}
						</u-button>
					</view>
				</u-form>
			</view>
		</template>

		<template v-if="webType === '2'">
			<view class="features-v">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
					:sticky="true" :down="downOption" :up="upOption" :bottombar="false">
					<view class="features-hd u-flex">
						<u-dropdown ref="uDropdown">
							<u-dropdown-item v-model="sortValue" title="排序" :options="sortData"
								@change="changeSolt($event,sortData)" />
							<!-- 筛选 -->
							<u-dropdown-item title="筛选" v-model="screenAalue" class="dropdownItem">
								<u-form :model="filterForm" ref="filterForm" :errorType="['toast']"
									label-position="left" label-width="150" label-align="left">
									<view class="slot-content" v-for="(filter,index) in filter" :key='index'>
										<view class="u-p-l-16 u-p-r-16 slotList">
											<u-form-item :label="filter.__config__.label"
												v-if="filter.__config__.jnpfKey == 'comInput'">
												<u-input placeholder="请输入" v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="billRule"
												v-if="filter.__config__.jnpfKey == 'billRule'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="createUser"
												v-if="filter.__config__.jnpfKey == 'createUser'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="createTime"
												v-if="filter.__config__.jnpfKey == 'createTime'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="modifyUser"
												v-if="filter.__config__.jnpfKey == 'modifyUser'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="modifyTime"
												v-if="filter.__config__.jnpfKey == 'modifyTime'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="currOrganize"
												v-if="filter.__config__.jnpfKey == 'currOrganize'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="currDept"
												v-if="filter.__config__.jnpfKey == 'currDept'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="currPosition"
												v-if="filter.__config__.jnpfKey == 'currPosition'">
												<u-input v-model="filterForm[filter.__vModel__]" placeholder="系统自动生成"
													disabled />

											</u-form-item>
											<u-form-item :label="filter.__config__.label"
												v-if="filter.__config__.jnpfKey == 'textarea'">
												<u-input placeholder="请输入" v-model="filterForm[filter.__vModel__]"
													type="textarea" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="checkbox"
												v-if="filter.__config__.jnpfKey == 'checkbox'">
												<jnpf-checkbox v-model="filterForm[filter.__vModel__]"
													:options="filter.__slot__.options" placeholder="请选择下拉框组"
													:disabled="filter.disabled" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="numInput"
												v-if="filter.__config__.jnpfKey == 'numInput'">
												<u-number-box v-model="filterForm[filter.__vModel__]" :min="filter.min"
													:max="filter.max" :step="filter.step" :input-width="120"
													:positive-integer="false" :input-height="60" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="select"
												v-if="filter.__config__.jnpfKey == 'select'">
												<jnpf-select v-model="filterForm[filter.__vModel__]"
													placeholder="请选择下拉框组" :options="filter.__slot__.options"
													:props="filter.__config__.props" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="radio"
												v-if="filter.__config__.jnpfKey == 'radio'">
												<u-radio-group v-model="filterForm[filter.__vModel__]">
													<u-radio v-for="(radios, radioIndex) in filter.__slot__.options"
														:key="radioIndex" :name="radios[filter.__config__.props.value]">
														{{ radios[filter.__config__.props.label] }}
													</u-radio>
												</u-radio-group>
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="switch"
												v-if="filter.__config__.jnpfKey == 'switch'">
												<jnpf-switch v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="cascader"
												v-if="filter.__config__.jnpfKey == 'cascader'">
												<jnpf-cascader v-model="filterForm[filter.__vModel__]"
													placeholder="请选择级联选择" :options="filter.options" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="time"
												v-if="filter.__config__.jnpfKey == 'time'">
												<jnpf-date-time type="time" v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="date"
												v-if="filter.__config__.jnpfKey == 'date'">
												<jnpf-date-time type="date" v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="uploadImg"
												v-if="filter.__config__.jnpfKey == 'uploadImg'">
												<jnpf-upload v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="rate"
												v-if="filter.__config__.jnpfKey == 'rate'">
												<u-rate v-model="filterForm[filter.__vModel__]" size="40"
													@change="changeRate($event,filter.__vModel__)" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="slider"
												v-if="filter.__config__.jnpfKey == 'slider'">
												<u-slider v-model="filterForm[filter.__vModel__]" :step="filter.step"
													:min="filter.min" :max="filter.max" style="width: 100%;">
													<view class="">
														<view class="badge-button">
															{{filterForm[filter.__vModel__]}}
														</view>
													</view>
												</u-slider>
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="comSelect"
												v-if="filter.__config__.jnpfKey == 'comSelect'">
												<jnpf-org-select type="organize"
													v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="depSelect"
												v-if="filter.__config__.jnpfKey == 'depSelect'">
												<jnpf-org-select type="department"
													v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="userSelect"
												v-if="filter.__config__.jnpfKey == 'userSelect'">
												<jnpf-org-select v-model="filterForm[filter.__vModel__]" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="posSelect"
												v-if="filter.__config__.jnpfKey == 'posSelect'">
												<jnpf-org-select type="position"
													v-model="filterForm[filter.__vModel__]" />
											</u-form-item>

											<u-form-item :label="filter.__config__.label" prop="address"
												v-if="filter.__config__.jnpfKey == 'address'">
												<jnpf-city-select v-model="filterForm[filter.__vModel__]"
													placeholder="请选择省市区" :level="2" />
											</u-form-item>
											<u-form-item :label="filter.__config__.label" prop="treeSelect"
												v-if="filter.__config__.jnpfKey == 'treeSelect'">
												<jnpf-tree-select v-model="filterForm[filter.__vModel__]"
													placeholder="请选择树形选择" :options="filter.options" />
											</u-form-item>

										</view>
									</view>
									<view class="buttom-box">
										<u-button class="buttom-btn" @click="reset">重置</u-button>
										<u-button class="buttom-btn" type="primary" @click="retrieval">检索</u-button>
									</view>
								</u-form>
							</u-dropdown-item>
						</u-dropdown>
					</view>

					<view class="features-listBox u-p-l-16 u-p-r-16">
						<view class="features-list u-m-t-20" v-for="(item,index) in list" :key='index'>
							<u-swipe-action :index="index" :show="item.show" @click="handleClick" @open="open"
								:options="options" @content-click="goDetail(item.id)">
								<view class="features-item u-flex" v-for="(config,i) in configData" :key="i">
									<text>{{config.label+':'}}</text>
									<text class="u-p-l-16">{{item[config.prop]}}</text>
								</view>
							</u-swipe-action>
						</view>
					</view>
				</mescroll-body>
				<view class="com-addBtn" @click="add()">
					<u-icon name="plus" size="60" color="#fff" />
				</view>
			</view>
		</template>

		<template v-if="webType === '3'">
			<view></view>
		</template>
	</view>
</template>

<script>
	import {
		config,
		list,
		delList,
		create
	} from '@/api/apply/features.js'
	import resources from '@/libs/resources.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import jnpfFormControl from "@/components/jnpf/jnpf-formControl/index.vue"
	export default {
		components: {
			jnpfFormControl
		},
		mixins: [MescrollMixin],
		data() {
			return {
				sortValue: 1,
				screenAalue: 2,
				options1: [{
						label: '降序',
						value: 1,
					},
					{
						label: '升序',
						value: 2,
					},

				],
				downOption: {
					use: true,
					auto: true
				},
				upOption: {
					page: {
						num: 0,
						size: 5,
						time: null
					},
					empty: {
						use: true,
						icon: resources.message.nodata,
						tip: "暂无数据",
						fixed: true,
						top: "300rpx",
						zIndex: 9
					},
					textNoMore: '没有更多数据',
				},
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				id: '',
				list: [],
				sortData: [],
				filter: [],
				configData: [],
				filterForm: {},
				page: {},
				upCallbackData: '',
				filedList: {},
				dataForm: {},
				webType: '',
				featuresId: '',
				flag: false,
				rules: {},
			}
		},
		onLoad(option) {



			this.id = option.id;
			this.featuresId = option.id;
			this.init();
			this.eventHub.$on('refresh', () => {
				this.list = [];
				this.mescroll.resetUpScroll();
				this.$forceUpdate();
			})
		},

		onUnload() {
			this.eventHub.$off('refresh')
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					if (this.$refs.dataForm) {
						this.$refs.dataForm.setRules(this.rules);
					}
				}, 300)
			})
		},
		methods: {
			// init() {
			// 	config(this.id).then(res => {
			// 		this.formData = JSON.parse(res.data.formData)
			// 		this.webType = res.data.webType
			// 		this.flowEngine(res.data)
			// 	})
			// },


			init() {
				this.$nextTick(function() {
					config(this.id).then(res => {
						this.flowEngine(res.data)
						this.filedList = JSON.parse(res.data.formData);
						this.webType = res.data.webType
						let fields = this.filedList.fields;
						let required;
						let label;
						let vModel;
						let children;
						let cardRequired;
						let cardVModel;
						let cardLabel;
						let jnpfKey;
						this.flag = true
						for (let i = 0; i < fields.length; i++) {
							required = fields[i].__config__.required;
							label = fields[i].__config__.label;
							vModel = fields[i].__vModel__;
							jnpfKey = fields[i].__config__.jnpfKey;
							if (required) {
								this.rules[vModel] = [{
									required: true,
									message: label + '不能为空',
									trigger: 'blur'
								}];
								if (vModel.indexOf('dateField') >= 0 ||
									vModel.indexOf('selectField') >= 0 || vModel.indexOf('radioField') >=
									0 || vModel.indexOf(
										'switchField') >= 0 || vModel.indexOf(
										'numInputField') >= 0) {
									this.rules[vModel] = this.rules[vModel].map(o => ({
										type: 'number',
										...o
									}))
								} else if (vModel.indexOf('checkboxField') >= 0 || vModel.indexOf(
										'addressField') >= 0) {
									this.rules[vModel] = this.rules[vModel].map(o => ({
										type: 'array',
										...o
									}))
								}
							}
							if (jnpfKey == 'card' || jnpfKey == 'table') {
								children = fields[i].__config__.children || [];
								let item = {};
								for (let c = 0; c < children.length; c++) {
									cardRequired = children[c].__config__.required;
									cardVModel = children[c].__vModel__;
									cardLabel = children[c].__config__.label;
									item[cardVModel] = '';
									if (cardRequired) {
										this.rules[cardVModel] = [{
											required: true,
											message: cardLabel + '不能为空',
											trigger: 'blur'
										}];
										if (cardVModel.indexOf('dateField') >= 0 ||
											cardVModel.indexOf('selectField') >= 0 || cardVModel.indexOf(
												'radioField') >= 0 ||
											cardVModel.indexOf('switchField') >= 0 || cardVModel.indexOf(
												'numInputField') >= 0) {
											this.rules[cardVModel] = this.rules[cardVModel].map(o => ({
												type: 'number',
												...o
											}))
										} else if (cardVModel.indexOf('checkboxField') >= 0 || cardVModel
											.indexOf(
												'addressField') >= 0) {
											this.rules[cardVModel] = this.rules[cardVModel].map(o => ({
												type: 'array',
												...o
											}))
										}
									}
									this.dataForm[vModel] = [];
									this.dataForm[vModel].push(item)
								}
							}
						}
					})
				})
			},








			/* 初始化处理 */
			flowEngine(data) {
				let configList = JSON.parse(data.columnData);
				/* 排序赋值 */
				let sortData = [];
				for (let i = 0; i < configList.sortList.length; i++) {
					let descItem = {
						label: configList.sortList[i].label + '倒序',
						sidx: configList.sortList[i].prop,
						value: configList.sortList[i].prop + 'desc',
						sort: 'desc'
					}
					let ascItem = {
						label: configList.sortList[i].label + '升序',
						sidx: configList.sortList[i].prop,
						value: configList.sortList[i].prop + 'asc',
						sort: 'asc'
					}

					sortData.push(descItem, ascItem)
				}
				this.sortData = sortData
				/* 筛选赋值 */
				this.filter = configList.searchList;

				this.configData = configList.columnList
			},

			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},

			handleClick(index) {
				const item = this.list[index];
				delList(this.id, item.id).then(res => {
					this.$u.toast(res.msg)
					this.list.splice(index, 1)
				})
			},


			retrieval() {
				this.upCallbackData = '0'
				this.mescroll.resetUpScroll();
				this.$refs.uDropdown.close();
			},
			reset() {
				this.filterForm = {}
				this.mescroll.resetUpScroll();
				this.$refs.uDropdown.close();
			},

			changeSolt(e, data) {
				for (let i = 0; i < data.length; i++) {
					this.upCallbackData = data[i]
					if (e == data[i].value) return this.mescroll.resetUpScroll();
				}
			},

			/* 渲染列表页 */
			upCallback(page) {
				this.page = page;
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					featuresId: this.id,
					sort: 'asc'
				}
				switch (typeof(this.upCallbackData)) {
					case 'string':
						query.json = this.filterForm
						break
					case 'object':
						query.sort = this.upCallbackData.sort,
							query.sidx = this.upCallbackData.sidx
						break
					default:
				}

				list(query, {
					load: page.num == 1
				}).then(res => {
					this.mescroll.endSuccess(res.data.list.length);
					if (page.num == 1) this.list = [];
					let list = res.data.list.map(o => ({
						show: false,
						...o
					}));
					this.list = this.list.concat(list);

				}).catch(() => {
					this.mescroll.endErr();
				})
			},

			add(id) {
				const url = './form?featuresId=' + this.id
				uni.navigateTo({
					url: url
				})
			},

			goDetail(id) {
				let url = './form?id=' + id + '&&featuresId=' + this.id
				if (this.scanType) {
					url = './form?id=' + id + "&featuresId=" + this.id + '&type=' + this.scanType
				}
				uni.navigateTo({
					url: url
				})
			},


			submitForm(dataForm) {
				let data = {
					data: JSON.stringify(dataForm)
				}
				create(data, this.featuresId).then(res => {
					uni.showToast({
						title: res.msg,
						complete: () => {
							setTimeout(() => {
								uni.navigateBack()
							}, 1500)
						}
					})
				})
			},
			submit() {
				this.$refs.dataForm.validate((valid) => {
					if (valid) {
						this.$refs.formControl.submitForm()
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
	
	.buttom-box {
		background-color: #fff;
		display: flex;
		width: 100%;
		height: 88rpx;
		box-shadow: 0 -2rpx 8rpx #e1e5ec;
		z-index: 20;

		.buttom-btn {
			width: 100%;
			/* #ifndef MP */
			height: 88rpx !important;
			line-height: 88rpx !important;
			border-radius: 0 !important;

			&::after {
				border: none !important;
			}

			/* #endif */
			/* #ifdef MP */
			.u-btn {
				width: 100%;
				height: 88rpx !important;
				line-height: 88rpx !important;
				border-radius: 0 !important;

				&::after {
					border: none !important;
				}
			}

			/* #endif */
		}

		;
	}



	.features-v {
		.slotList {
			background-color: #FFFFFF;
		}

		.features-hd {
			width: 100%;
			background-color: #FFFFFF;
			justify-content: space-evenly;
			color: #999999;
			box-shadow: 2px 2px 5px #c4c4c4;
		}

		.features-listBox {
			.features-list {
				background-color: #FFFFFF;

				.features-item {
					padding: 20rpx 32rpx;
					color: #9A9A9A;
				}
			}
		}
	}
</style>
