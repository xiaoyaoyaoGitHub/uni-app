<template>
	<view class="operate-v">
		<scroll-view class="operate-area" scroll-y>
			<view class="u-p-l-32 u-p-r-32 u-p-t-10"
				v-if="config.eventType === 'revoke' || config.eventType === 'recall'">
				<u-input v-model="dataForm.handleOpinion" type="textarea" placeholder="请输入撤回原因" height="500" />
			</view>
			<view class="jnpf-wrap">
				<u-form :model="dataForm" label-position="left" label-width="150" class="jnpf-form"
					v-if="config.eventType === 'audit' || config.eventType === 'reject'">
					<u-form-item label="审批意见" prop="handleOpinion">
						<u-input v-model="dataForm.handleOpinion" type="textarea" placeholder="请输入审批意见" />
					</u-form-item>
					<u-form-item label="加签人员" prop="freeApproverUserId"
						v-if="config.eventType === 'audit' && config.hasFreeApprover">
						<jnpf-org-select v-model="dataForm.freeApproverUserId" />
					</u-form-item>
					<u-form-item label="抄送人员" prop="copyIds" v-if="config.isCustomCopy">
						<jnpf-org-select v-model="dataForm.copyIds" multiple />
					</u-form-item>
					<u-form-item label="审批签名" prop="signImg" v-if="config.hasSign">
						<Signature ref="sig" v-model="dataForm.signImg"></Signature>
					</u-form-item>
				</u-form>
			</view>
		</scroll-view>
		<view class="flowBefore-actions">
			<u-button class="buttom-btn" type="primary" @click="handleClick">{{config.title}}</u-button>
		</view>
	</view>
</template>

<script>
	import Signature from '../components/sin-signature/sin-signature.vue'
	export default {
		components: {
			Signature,
		},
		data() {
			return {
				config: {},
				dataForm: {
					handleOpinion: '',
					signImg: '',
					copyIds: '',
					freeApproverUserId: ''
				},
			};
		},
		onLoad(option) {
			const config = JSON.parse(decodeURIComponent(option.config))
			uni.setNavigationBarTitle({
				title: config.title
			});
			this.config = config
		},
		methods: {
			handleClick() {
				if (this.config.hasSign && !this.dataForm.signImg) {
					uni.showToast({
						title: '请签名',
						icon: 'none'
					})
					return
				}
				const query = {
					...this.dataForm,
					eventType: this.config.eventType
				}
				this.eventHub.$emit('operate', query);
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.operate-v {
		height: 100%;
		display: flex;
		flex-direction: column;

		.operate-area {
			flex: 1;
		}
	}
</style>
