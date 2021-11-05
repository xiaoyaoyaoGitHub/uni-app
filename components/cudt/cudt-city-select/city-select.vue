<template>
	<u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :closeable="true" :safe-area-inset-bottom="true"
		:z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close">
		<u-tabs v-if="value" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs">
		</u-tabs>
		<view class="area-box">
			<view class="u-flex" :class="{ 'shift-25':isShift25,'shift-50':isShift50 }">
				<view class="area-item" :class="{ 'level1':level===0 }">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group>
								<u-cell-item v-for="(item,index) in provinces" :title="item[props.label]" :arrow="false"
									:index="index" :key="index" @click="provinceChange">
									<template slot="right-icon">
										<u-icon v-if="isChooseP&&province===index" size="34" name="checkbox-mark">
										</u-icon>
									</template>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseP">
								<u-cell-item v-for="(item,index) in citys" :title="item[props.label]" :arrow="false"
									:index="index" :key="index" @click="cityChange">
									<template slot="right-icon">
										<u-icon v-if="isChooseC&&city===index" size="34" name="checkbox-mark"></u-icon>
									</template>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseC">
								<u-cell-item v-for="(item,index) in areas" :title="item[props.label]" :arrow="false"
									:index="index" :key="index" @click="areaChange">
									<template slot="right-icon">
										<u-icon v-if="isChooseA&&area===index" size="34" name="checkbox-mark"></u-icon>
									</template>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseA">
								<u-cell-item v-for="(item,index) in streets" :title="item[props.label]" :arrow="false"
									:index="index" :key="index" @click="streetChange">
									<u-icon v-if="isChooseS&&area===index" slot="right-icon" size="34"
										name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		getProvinceSelector
	} from '@/api/common.js'
	/**
	 * city-select 省市区级联选择器
	 * @property {String Number} z-index 弹出时的z-index值（默认1075）
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
	 */
	export default {
		name: 'city-select',
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			level: {
				type: Number,
				default: 2
			},
			defaultValue: {
				type: Array,
				default () {
					return [];
				}
			},
			props: {
				type: Object,
				default: () => ({
					label: 'fullName',
					value: 'id'
				})
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				cityValue: "",
				isChooseP: false, //是否已经选择了省
				province: 0, //省级下标
				provinces: [],
				isChooseC: false, //是否已经选择了市
				city: 0, //市级下标
				citys: [],
				isChooseA: false, //是否已经选择了区
				area: 0, //区级下标
				areas: [],
				isChooseS: false, //是否已经选择了街道
				street: 0, //街道下标
				streets: [],
				tabsIndex: 0
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					if (val) setTimeout(() => this.setDefaultValue(), 10);
				}
			},
		},
		mounted() {
			this.init();
		},
		computed: {
			isShift25() {
				return this.tabsIndex === 2;
			},
			isShift50() {
				return this.tabsIndex > 2;
			},
			genTabsList() {
				let tabsList = [{
					name: "请选择"
				}];
				if (this.isChooseP) {
					tabsList[0]['name'] = this.provinces[this.province][this.props.label];
					if (this.level > 0) {
						tabsList[1] = {
							name: "请选择"
						};
					}
				}
				if (this.isChooseC) {
					tabsList[1]['name'] = this.citys[this.city][this.props.label];
					if (this.level > 1) {
						tabsList[2] = {
							name: "请选择"
						};
					}
				}
				if (this.isChooseA) {
					tabsList[2]['name'] = this.areas[this.area][this.props.label];
					if (this.level > 2) {
						tabsList[3] = {
							name: "请选择"
						};
					}
				}
				if (this.isChooseS) {
					tabsList[3]['name'] = this.streets[this.street][this.props.label];
				}
				return tabsList;
			},
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			init() {
				getProvinceSelector('-1').then(res => {
					this.provinces = res.data.list
					this.setDefaultValue()
				})
			},
			setDefaultValue() {
				if (!this.defaultValue.length) return
				this.setProvince("", this.defaultValue[0])
			},
			setProvince(label = "", value = "") {
				this.provinces.map((v, k) => {
					if (value ? v[this.props.value] == value : v[this.props.label] == label) {
						this.isChooseP = true;
						this.province = k;
						if (this.level === 0) return this.setValue(true)
						getProvinceSelector(this.provinces[k][this.props.value]).then(res => {
							this.citys = res.data.list;
							if (this.level >= 1) this.setCity("", this.defaultValue[1])
						})
					}
				})
			},
			setCity(label = "", value = "") {
				this.citys.map((v, k) => {
					if (value ? v[this.props.value] == value : v[this.props.label] == label) {
						this.isChooseC = true;
						this.city = k;
						if (this.level === 1) return this.setValue(true)
						getProvinceSelector(this.citys[k][this.props.value]).then(res => {
							this.areas = res.data.list;
							if (this.level >= 2) this.setArea("", this.defaultValue[2])
						})
					}
				})
			},
			setArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v[this.props.value] == value : v[this.props.label] == label) {
						this.isChooseA = true;
						this.area = k;
						if (this.level === 2) return this.setValue(true)
						getProvinceSelector(this.areas[k][this.props.value]).then(res => {
							this.streets = res.data.list;
							if (this.level === 3) this.setStreet("", this.defaultValue[3])
						})
					}
				})
			},
			setStreet(label = "", value = "") {
				this.streets.map((v, k) => {
					if (value ? v[this.props.value] == value : v[this.props.label] == label) {
						this.isChooseS = true;
						this.street = k;
						this.setValue(true)
					}
				})
			},
			close() {
				this.$emit('input', false);
			},
			tabsChange(index) {
				this.tabsIndex = index;
			},
			provinceChange(index) {
				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.isChooseS = false;
				this.province = index;
				if (this.level === 0) return this.setValue()
				this.tabsIndex = 1;
				getProvinceSelector(this.provinces[index][this.props.value]).then(res => {
					this.citys = res.data.list;
				})
			},
			cityChange(index) {
				this.isChooseC = true;
				this.isChooseA = false;
				this.isChooseS = false;
				this.city = index;
				if (this.level === 1) return this.setValue()
				this.tabsIndex = 2;
				getProvinceSelector(this.citys[index][this.props.value]).then(res => {
					this.areas = res.data.list;
				})
			},
			areaChange(index) {
				this.isChooseA = true;
				this.isChooseS = false;
				this.area = index;
				if (this.level === 2) return this.setValue()
				this.tabsIndex = 3;
				getProvinceSelector(this.areas[index][this.props.value]).then(res => {
					this.streets = res.data.list;
				})
			},
			streetChange(index) {
				this.isChooseS = true;
				this.street = index;
				this.setValue()
			},
			setValue(isInit = false) {
				if (isInit) this.tabsIndex = this.level
				let result = []
				for (let i = 0; i < this.level + 1; i++) {
					if (i === 0) result.push({
						value: this.provinces[this.province][this.props.value],
						label: this.provinces[this.province][this.props.label]
					})
					if (i === 1) result.push({
						value: this.citys[this.city][this.props.value],
						label: this.citys[this.city][this.props.label]
					})
					if (i === 2) result.push({
						value: this.areas[this.area][this.props.value],
						label: this.areas[this.area][this.props.label]
					})
					if (i === 3) result.push({
						value: this.streets[this.street][this.props.value],
						label: this.streets[this.street][this.props.label]
					})
				}
				this.$emit('city-change', result);
				if (!isInit) this.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.u-tabs {
		padding-right: 80rpx;
	}

	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;

		>view {
			width: 200%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.shift-25 {
				transform: translateX(-25%);
			}

			&.shift-50 {
				transform: translateX(-50%);
			}
		}

		.area-item {
			width: 50%;
			height: 800rpx;

			&.level1 {
				width: 150%;
			}
		}
	}
</style>
