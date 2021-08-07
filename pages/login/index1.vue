<template>
	<view class="logo-v">
		<view class="login-bg">
			<image src="/static/login-bg.png" mode="widthFix"></image>
		</view>
		<view class="logo-hd u-flex-col">
			<view class="logoImg">
				<image src="/static/logo.png" mode="widthFix"></image>
			</view>
			<view class="loginSwitch u-flex-col">
				<view class="tabs" :class="{'active2': loginMethod == 'password'}">
					<text class="tab u-m-r-64 u-font-28" :class="{'active':loginMethod == 'verification'}"
						@click="changeTab('verification')">验证码登录</text>
					<text class="tab u-m-l-64 u-font-28" :class="{'active':loginMethod == 'password'}"
						@click="changeTab('password')">密码登录</text>
				</view>
				<view class="loginInputBox u-flex-col">
					<u-form :model="formData" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
						label-width="150" label-align="left">
						<u-form-item prop="account">
							<u-input v-model="formData.account" placeholder="请输入帐号"></u-input>
						</u-form-item>
						<u-form-item prop="password" v-if="loginMethod == 'password'">
							<u-input v-model="formData.password" type="password" placeholder="请输入密码"></u-input>
						</u-form-item>
						<u-form-item prop="smsCode" v-if="loginMethod == 'verification'">
							<u-input placeholder="请输入验证码" v-model="formData.smsCode" type="text">
							</u-input>
							<u-button slot="right" type="primary" size="mini" @click="getCode">{{codeTips}}</u-button>
						</u-form-item>
						<view v-if="loginMethod == 'verification' && isFirstLogin">
							<u-form-item prop="userName">
								<u-input v-model="formData.userName" type="text" placeholder="请输入姓名"></u-input>
							</u-form-item>
							<u-form-item prop="companyName">
								<u-input v-model="formData.companyName" type="text" placeholder="请输入公司名"></u-input>
							</u-form-item>
						</view>
					</u-form>
					<view class="loginBtnBox u-m-t-64">
						<u-button @click="defaultLogin" type="primary" :loading="loading">{{ loading ? "登录中...":"登录"}}
						</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="copyright">Copyright © 2021 引迈信息技术有限公司出品</view>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	import {
		login,
		clickSms,
		loginSms
	} from '@/api/common.js'
	import md5Libs from "uview-ui/libs/function/md5";
	import resources from '@/libs/resources'

	export default {
		data() {
			return {
				codeTips: '',
				loading: false,
				loginMethod: 'verification',
				mode: 1,
				formData: {
					account: "",
					password: "",
					userName: '',
					companyName: '',
					smsCode: ''
				},
				isFirstLogin: false,
				rules: {
					account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur',
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					}],
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur',
					}],
					companyName: [{
						required: true,
						message: '请输入公司名',
						trigger: 'blur',
					}],
					smsCode: [{
							required: true,
							message: '请输入验证码',
							trigger: ['change', 'blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change', 'blur'],
						}
					],
				}
			}
		},
		onReady() {
			this.$refs.dataForm.setRules(this.rules);
		},
		methods: {
			changeTab(loginMethod) {
				this.formData.password = '';
				this.formData.userName = '';
				this.formData.companyName = '';
				this.formData.smsCode = '';
				this.isFirstLogin = false;
				this.loginMethod = loginMethod;
			},
			codeChange(text) {
				this.codeTips = text;
			},
			// 获取验证码
			getCode() {
				const valid = this.$u.test.mobile(this.formData.account)
				if (!valid) return this.$u.toast('请输入正确手机号！')
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					clickSms(this.formData.account).then(res => {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
						if (res.data == 0) this.isFirstLogin = true;
					}).catch(() => {
						uni.hideLoading();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			/* 点击登录 */
			defaultLogin() {
				let _this = this
				if (this.loginMethod == 'verification') {
					this.loginSms()
				} else {
					this.login(this.formData.account, this.formData.password)
				}
			},
			//验证码登录
			loginSms() {
				this.$refs.dataForm.validate(valid => {
					if (valid) {
						let data = {
							mode: this.mode, //后端语言
							mobile: this.formData.account, //电话
							smsCode: this.formData.smsCode, //短信码
							contacts: this.formData.userName, //用户名称
							company: this.formData.companyName //公司名字
						}
						loginSms(data).then(res => {
							this.login(this.formData.account, res.data)
						}).catch(() => {})
					}
				});
			},
			//公共登录
			login(account, password) {
				this.$refs.dataForm.validate(valid => {
					if (valid) {
						this.loading = true
						let query = {
							account: account,
							password: md5Libs.md5(password)
						}
						// #ifdef  APP-PLUS
						const clientId = plus.push.getClientInfo().clientid;
						query.clientId = clientId
						// #endif
						login(query).then(res => {
							this.loading = false
							let token = res.data.token
							this.$store.commit('user/SET_TOKEN', token)
							uni.setStorageSync('token', token)
							uni.switchTab({
								url: '/pages/index/index'
							});
						}).catch(() => {
							this.loading = false
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {}

	.logo-v {
		.login-bg {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.logo-hd {
			width: 100%;
			position: absolute;
			top: 180rpx;

			.logoImg {
				width: 160rpx;
				height: 160rpx;
				margin: 0 auto;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20%;
				}
			}

		}

		.loginSwitch {
			margin-top: 100rpx;
			justify-content: center;
			align-items: center;

			.tabs {
				color: #999999;
				position: relative;

				&::after {
					content: "";
					width: 64rpx;
					height: 4rpx;
					background-color: #356efe;
					margin-top: 15rpx;
					position: absolute;
					left: 0;
					bottom: -15rpx;
					display: block;
					border-radius: 50rpx;
				}

				// &.active1 {
				// 	&::after {
				// 		left: 0;
				// 	}
				// }

				&.active2 {
					&::after {
						left: 70%;
					}
				}

				.tab {
					width: 50%;
					height: 80upx;
					text-align: center;
					color: #AEAFB5;
					font-size: 32upx;

					&.active {
						color: #3281ff;
					}
				}

			}

			.loginInputBox {
				width: 100%;
				margin-top: 80rpx;
				padding: 0 64rpx;

				.loginBtnBox {}
			}
		}
	}
</style>
