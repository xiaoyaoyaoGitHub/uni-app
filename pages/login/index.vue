<template>
	<view class="logo-v">
		<view class="login-bg">
			<image src="/static/bg.webp" mode="widthFix"></image>
		</view>
		<view class="logo-hd u-flex-col" style="">
			<view class="logoImg">
				<image src="/static/logo.webp" mode="widthFix"></image>
			</view>
			<view class="u-flex-col introduce">
				<text class="text-one">欢迎登录</text>
				<!-- <text class="u-font-24 text-two">倾心打造数字化平台</text> -->
			</view>
			<view class="loginSwitch u-flex-col">
				<view class="loginInputsBox u-flex-col">
					<u-form :model="formData" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
						label-width="150" label-align="left">
						<!--  -->
						<u-form-item prop="account" left-icon="account"
							:left-icon-style="{color:'#5E6472',fontSize:'36rpx'}">
							<u-input placeholder-style="color:#C8C9CC;font-size:32rpx" :custom-style="{fontSize:'36rpx'}" v-model="formData.account" placeholder="请输入帐号"
								font-size="32rpx" color="#2566F2">
							</u-input>
						</u-form-item>
						<u-form-item prop="password" left-icon="lock"
							:left-icon-style="{color:'#5E6472',fontSize:'36rpx'}">
							<u-input placeholder-style="color:#C8C9CC;font-size:32rpx" :custom-style="{fontSize:'36rpx'}" v-model="formData.password" type="password" placeholder="请输入密码"></u-input>
						</u-form-item>
						<u-form-item prop="code" left-icon="order"
							:left-icon-style="{color:'#5E6472',fontSize:'36rpx'}">
							<u-input placeholder-style="color:#C8C9CC;font-size:32rpx" :custom-style="{fontSize:'36rpx'}" v-model="formData.code" placeholder="请输入验证码"></u-input>
							<div class="login-code">
								<img :src="codeUrl" @click="getCode">
							</div>
						</u-form-item>
					</u-form>
					<view class="loginBtnBox">
						<u-button class="btn" :ripple="true" @click="login" type="primary" :loading="loading">{{ loading ? "登录中...":"登录"}}
						</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="copyright">@2022 智慧发改出品</view>
	</view>
</template>

<script>
	import {
		login,
		getCodeImg
	} from '@/api/common.js'
	import md5Libs from "uview-ui/libs/function/md5";
	import resources from '@/libs/resources'

	export default {
		data() {
			return {
				loading: false,
				codeUrl: '',
				formData: {
					account: "",
					password: "",
					code: "",
					uuid: ''
				},
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
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur',
					}],
				}
			}
		},
		onReady() {
			this.$refs.dataForm.setRules(this.rules);
		},
		onLoad() {
			// 获取验证码
			this.getCode()
			this.formData.password = ''
		},
		methods: {
			getCode() {
				getCodeImg().then(res => {
					this.codeUrl = res.data.img
					this.formData.uuid = res.data.uuid
					console.log(res.data.uuid)
				})
			},
			login() {
				this.$refs.dataForm.validate(valid => {
					if (valid) {
						this.loading = true
						let query = {
							account: this.formData.account,
							password: md5Libs.md5(this.formData.password),
							code: this.formData.code,
							uuid: this.formData.uuid
						}
						// #ifdef  APP-PLUS
						const clientId = plus.push.getClientInfo().clientid;
						query.clientId = clientId
						// #endif

						login(query).then(res => {

							let token = res?.data?.token
							this.$store.commit('user/SET_TOKEN', token)
							uni.setStorageSync('token', token)
							this.$store.dispatch('user/getCurrentUser').then(() => {
								this.loading = false
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}).catch((e) => {
								console.log(e)
								this.loading = false
							})
						}).catch((e) => {
							console.log(e)
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
			// height: 365rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.logo-hd {
			width: 100%;
			position: absolute;
			top: 281rpx;

			.logoImg {
				width: 168rpx;
				height: 168rpx;
				margin: 0 auto;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20%;
				}
			}

			.introduce {
				justify-content: center;
				align-items: center;

				.text-one {
					font-weight: 700;
					font-size: 44rpx;
					line-height: 44rpx;
					color: #071127;

				}

				.text-two {
					color: #999999;
				}
			}
		}
		.placeholderClass {
			color: red;
		}
		.loginSwitch {
			margin-top: 40rpx;
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

			.loginInputsBox {
				width: 100%;
				// margin-top: 80rpx;
				padding: 0 32rpx;

				.loginBtnBox {
					width: 602rpx;
					margin: auto;
					margin-top: 140rpx;
					.btn {
						font-size: 36rpx;
						line-height: 50rpx;
						padding: 15rpx 0;
						background: #2566F2;
						width: 100%;
					}
				}
			}
		}
	}
</style>
