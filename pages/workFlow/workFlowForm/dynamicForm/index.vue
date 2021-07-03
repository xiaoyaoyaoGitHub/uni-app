<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<view v-for="(items,index) in filedList.fields" :key='index'>
				<template v-if="items.__config__.jnpfKey == 'billRule'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'createUser'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'createTime'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'modifyUser'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'modifyTime'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'currOrganize'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'currDept'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'currPosition'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)">
						<u-input v-model="dataForm[items.__vModel__]" placeholder="系统自动生成" disabled></u-input>
					</u-form-item>
				</template>

				<template v-if="items.__config__.jnpfKey == 'comInput'">
					<u-form-item :label="items.__config__.label" v-if="judgeShow(items.__vModel__)"
						:prop="items.__vModel__" :required='items.__config__.required'>
						<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]"
							:disabled="judgeWrite(items.__vModel__)"></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'textarea'">
					<u-form-item :label="items.__config__.label" v-if="judgeShow(items.__vModel__)"
						:prop="items.__vModel__" :required='items.__config__.required'>
						<u-input placeholder="请输入" v-model="dataForm[items.__vModel__]" type="textarea"
							:disabled="judgeWrite(items.__vModel__)"></u-input>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'checkbox'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
							:options="items.__slot__.options" :props="items.__config__.props" multiple
							:disabled="judgeWrite(items.__vModel__)">
						</jnpf-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'numInput'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<u-number-box v-model="dataForm[items.__vModel__]" :min="items.min" :max="items.max"
							:step="items.step" :input-width="120" :positive-integer="false" :input-height="60"
							:disabled="judgeWrite(items.__vModel__)">
						</u-number-box>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'select'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-select v-model="dataForm[items.__vModel__]" placeholder="请选择下拉框组"
							:options="items.__slot__.options" :props="items.__config__.props"
							:disabled="judgeWrite(items.__vModel__)">
						</jnpf-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'radio'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<u-radio-group v-model="dataForm[items.__vModel__]">
							<u-radio v-for="(radios, radioIndex) in items.__slot__.options" :key="radioIndex"
								:name="radios[items.__config__.props.value]" :disabled="judgeWrite(items.__vModel__)">
								{{ radios[items.__config__.props.label] }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'switch'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-switch v-model="dataForm[items.__vModel__]" :disabled="judgeWrite(items.__vModel__)">
						</jnpf-switch>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'cascader'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-cascader v-model="dataForm[items.__vModel__]" placeholder="请选择级联选择"
							:options="items.options" :disabled="judgeWrite(items.__vModel__)">
						</jnpf-cascader>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'time'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-date-time type="time" v-model="dataForm[items.__vModel__]"
							:disabled="judgeWrite(items.__vModel__)"></jnpf-date-time>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'date'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-date-time type="date" v-model="dataForm[items.__vModel__]"
							:disabled="judgeWrite(items.__vModel__)"></jnpf-date-time>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'uploadImg'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-upload v-model="dataForm[items.__vModel__]" :disabled="judgeWrite(items.__vModel__)">
						</jnpf-upload>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'rate'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<u-rate v-model="dataForm[items.__vModel__]" size="40"
							@change="changeRate($event,items.__vModel__)" :disabled="judgeWrite(items.__vModel__)">
						</u-rate>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'slider'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<u-slider v-model="dataForm[items.__vModel__]" :step="items.step" :min="items.min"
							:max="items.max" style="width: 100%;" :disabled="judgeWrite(items.__vModel__)">
							<view class="">
								<view class="badge-button">
									{{dataForm[items.__vModel__]}}
								</view>
							</view>
						</u-slider>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'comSelect'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-org-select type="organize" v-model="dataForm[items.__vModel__]"
							:disabled="judgeWrite(items.__vModel__)"></jnpf-org-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'depSelect'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-org-select type="department" v-model="dataForm[items.__vModel__]"
							:disabled="judgeWrite(items.__vModel__)"></jnpf-org-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'userSelect'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						:required='items.__config__.required'>
						<jnpf-org-select v-model="dataForm[items.__vModel__]" :disabled="judgeWrite(items.__vModel__)">
						</jnpf-org-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'posSelect'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-org-select type="position" v-model="dataForm[items.__vModel__]"
							:disabled="judgeWrite(items.__vModel__)"></jnpf-org-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'divider'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<u-divider>{{items.__slot__.default}}</u-divider>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'address'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-city-select v-model="dataForm[items.__vModel__]" placeholder="请选择省市区" :level="2"
							:disabled="judgeWrite(items.__vModel__)">
						</jnpf-city-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'treeSelect'">
					<u-form-item :label="items.__config__.label" :prop="items.__vModel__"
						v-if="judgeShow(items.__vModel__)" :required='items.__config__.required'>
						<jnpf-tree-select v-model="dataForm[items.__vModel__]" placeholder="请选择树形选择"
							:options="items.options" :disabled="judgeWrite(items.__vModel__)">
						</jnpf-tree-select>
					</u-form-item>
				</template>
				<template v-if="items.__config__.jnpfKey == 'groupTitle'">
					<u-form-item :prop="items.__vModel__" v-if="judgeShow(items.__vModel__)"
						:required='items.__config__.required'>
						<jnpf-group :content="items.content" :content-position="items['content-position']"></jnpf-group>
					</u-form-item>
				</template>

				<!-- 卡片 -->
				<view class="jnpf-card">
					<block v-for="(card,i) in items.__config__.children" :key='i'>
						<template v-if="card.__config__.jnpfKey == 'billRule'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'createUser'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'createTime'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'modifyUser'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'modifyTime'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'currOrganize'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'currDept'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'currPosition'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)">
								<u-input v-model="dataForm[card.__vModel__]" placeholder="系统自动生成" disabled></u-input>
							</u-form-item>
						</template>

						<template v-if="card.__config__.jnpfKey == 'comInput'">
							<u-form-item :label="card.__config__.label" v-if="judgeShow(card.__vModel__)"
								:prop="card.__vModel__" :required='card.__config__.required'>
								<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)"></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'textarea'">
							<u-form-item :label="card.__config__.label" v-if="judgeShow(card.__vModel__)"
								:prop="card.__vModel__" :required='card.__config__.required'>
								<u-input placeholder="请输入" v-model="dataForm[card.__vModel__]" type="textarea"
									:disabled="judgeWrite(card.__vModel__)"></u-input>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'checkbox'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
									:options="card.__slot__.options" :props="card.__config__.props" multiple
									:disabled="judgeWrite(card.__vModel__)">
								</jnpf-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'numInput'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<u-number-box v-model="dataForm[card.__vModel__]" :min="card.min" :max="card.max"
									:step="card.step" :input-width="120" :positive-integer="false" :input-height="60"
									:disabled="judgeWrite(card.__vModel__)">
								</u-number-box>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'select'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-select v-model="dataForm[card.__vModel__]" placeholder="请选择下拉框组"
									:options="card.__slot__.options" :props="card.__config__.props"
									:disabled="judgeWrite(card.__vModel__)">
								</jnpf-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'radio'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<u-radio-group v-model="dataForm[card.__vModel__]">
									<u-radio v-for="(radios, radioIndex) in card.__slot__.options" :key="radioIndex"
										:name="radios[card.__config__.props.value]"
										:disabled="judgeWrite(card.__vModel__)">
										{{ radios[card.__config__.props.label] }}
									</u-radio>
								</u-radio-group>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'switch'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-switch v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)">
								</jnpf-switch>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'cascader'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-cascader v-model="dataForm[card.__vModel__]" placeholder="请选择级联选择"
									:options="card.options" :disabled="judgeWrite(card.__vModel__)">
								</jnpf-cascader>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'time'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-date-time type="time" v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)"></jnpf-date-time>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'date'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-date-time type="date" v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)"></jnpf-date-time>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'uploadImg'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-upload v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)">
								</jnpf-upload>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'rate'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<u-rate v-model="dataForm[card.__vModel__]" size="40"
									@change="changeRate($event,card.__vModel__)"
									:disabled="judgeWrite(card.__vModel__)">
								</u-rate>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'slider'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<u-slider v-model="dataForm[card.__vModel__]" :step="card.step" :min="card.min"
									:max="card.max" style="width: 100%;" :disabled="judgeWrite(card.__vModel__)">
									<view class="">
										<view class="badge-button">
											{{dataForm[card.__vModel__]}}
										</view>
									</view>
								</u-slider>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'comSelect'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-org-select type="organize" v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)"></jnpf-org-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'depSelect'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-org-select type="department" v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)"></jnpf-org-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'userSelect'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								:required='card.__config__.required'>
								<jnpf-org-select v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)">
								</jnpf-org-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'posSelect'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-org-select type="position" v-model="dataForm[card.__vModel__]"
									:disabled="judgeWrite(card.__vModel__)"></jnpf-org-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'divider'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<u-divider>{{card.__slot__.default}}</u-divider>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'address'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-city-select v-model="dataForm[card.__vModel__]" placeholder="请选择省市区" :level="2"
									:disabled="judgeWrite(card.__vModel__)">
								</jnpf-city-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'treeSelect'">
							<u-form-item :label="card.__config__.label" :prop="card.__vModel__"
								v-if="judgeShow(card.__vModel__)" :required='card.__config__.required'>
								<jnpf-tree-select v-model="dataForm[card.__vModel__]" placeholder="请选择树形选择"
									:options="card.options" :disabled="judgeWrite(card.__vModel__)">
								</jnpf-tree-select>
							</u-form-item>
						</template>
						<template v-if="card.__config__.jnpfKey == 'groupTitle'">
							<u-form-item :prop="card.__vModel__" v-if="judgeShow(card.__vModel__)"
								:required='card.__config__.required'>
								<jnpf-group :content="card.content" :content-position="card['content-position']">
								</jnpf-group>
							</u-form-item>
						</template>
					</block>
				</view>


				<!-- 子表 -->
				<template v-if="items.__config__.jnpfKey == 'table'">
					<view class="jnpf-table" v-if="judgeShow(items.__vModel__)">
						<view class="jnpf-table-item" v-for="(tableItem,tableIndex) in dataForm[items.__vModel__]"
							:key='tableIndex'>
							<view class="jnpf-table-item-title u-flex u-row-between">
								<text class="jnpf-table-item-title-num">设计子表({{tableIndex+1}})</text>
								<view class="jnpf-table-item-title-action" v-if="dataForm.table.length>1"
									@click="delItem(tableIndex)">删除
								</view>
							</view>
							<view v-for="(childItem, childIndex) in items.__config__.children" :key="childIndex">
								<u-form-item :label="childItem.__config__.label" :prop="childItem.__vModel__">
									<u-input v-model="dataForm[childItem.__vModel__]" placeholder="请输入"></u-input>
								</u-form-item>
							</view>
						</view>
						<view class="jnpf-table-addBtn" @click="addItem(items)">
							<u-icon name="plus" color="#2979ff"></u-icon>添加
						</view>
					</view>
				</template>
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
				options: [],
				limit: {}
			}
		},
		onLoad(url) {

		},
		mounted() {
			this.$refs.dataForm.setRules(this.rules)
		},
		methods: {
			changeRate(e, model) {
				let rateVal = e;
				this.$set(this.dataForm, model, rateVal)
			},
			init(data) {
				this.dataForm.id = data.id || '';
				this.setting = data;
				console.log(this.setting)
				this.filedList = JSON.parse(this.setting.formConf);
				console.log(this.filedList)
				let fields = this.filedList.fields;
				let defaultValue;
				let vModel;
				let dataType;
				let propsUrl;
				let dynamicList;
				let _options;
				let jnpfKey;
				let children;
				let required;
				let label;
				
				for (let i = 0; i < fields.length; i++) {
					defaultValue = fields[i].__config__.defaultValue;
					vModel = fields[i].__vModel__;
					dataType = fields[i].__config__.dataType;
					propsUrl = fields[i].__config__.propsUrl;
					jnpfKey = fields[i].__config__.jnpfKey;
					required = fields[i].__config__.required;
					label = fields[i].__config__.label;
					if (required) {
						this.rules[vModel] = [{
							required : true,
							message : label+'不能为空',
							trigger : 'blur'
						}];
					}
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
							if (card_defaultValue) this.$set(this.dataForm, card_vModel, card_defaultValue);
							if (card_dataType == 'dynamic') {
								this.dynamicHandel(card_propsUrl, children[j], card_jnpfKey)
							}
						}
					}
					if (dataType == 'dynamic') {
						this.dynamicHandel(propsUrl, fields[i], jnpfKey)
					}
				}
				
				if (data.id) {
					DynamicInfo(data.id).then(res => {
						this.dataForm = JSON.parse(res.data.data)
					})
				}
			},

			dynamicHandel(propsUrl, item, jnpfKey) {
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
			/* 可见 */
			judgeShow(id) {
				if (this.setting.opType == 4) return true
				if (!this.setting.formOperates || !this.setting.formOperates.length) return true
				let arr = this.setting.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return true
				let item = arr[0]
				return item.read
			},
			/* 可写 */
			judgeWrite(id) {
				if (this.setting.readonly) return true
				if (!this.setting.formOperates || !this.setting.formOperates.length) return false
				let arr = this.setting.formOperates.filter(o => o.id === id) || []
				if (!arr.length) return true
				let item = arr[0]
				return !item.write
			},
			submit(eventType) {
				console.log(this.rules)
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

<style lang="scss" scoped>
	uni-view {
		display: inline;
	}

	.badge-button {
		padding: 4rpx 6rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 1;
	}
</style>
