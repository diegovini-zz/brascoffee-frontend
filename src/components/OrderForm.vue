<template>
	<div>
		<v-form ref="form">
			<v-autocomplete
				v-model="model"
				:items="items"
				:loading="isLoading"
				:search-input.sync="search"
				chips
				clearable
				hide-details
				hide-selected
				item-text="name"
				item-value="symbol"
				label="Search for a coin..."
				solo
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							Search for your favorite
							<strong>Cryptocurrency</strong>
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:selection="{ attr, on, item, selected }">
					<v-chip
						v-bind="attr"
						:input-value="selected"
						color="blue-grey"
						class="white--text"
						v-on="on"
					>
						<v-icon left>mdi-coin</v-icon>
						<span v-text="item.name"></span>
					</v-chip>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-avatar
						color="indigo"
						class="headline font-weight-light white--text"
					>
						{{ item.name.charAt(0) }}
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-text="item.name"></v-list-item-title>
						<v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-icon>mdi-coin</v-icon>
					</v-list-item-action>
				</template>
			</v-autocomplete>
			<v-text-field
				label="Beverage"
				v-model="order.beverage"
				prepend-icon="mdi-folder"
				:rules="[rules.minValue]"
			></v-text-field>

			<!-- <v-menu :close-on-content-click="false" v-model="menuDueDate">
				<template v-slot:activator="{on,attrs}">
					<v-text-field
						label="Due date"
						:value="formattedDate"
						prepend-icon="mdi-calendar-today"
						readonly
						v-bind="attrs"
						v-on="on"
						:rules="[rules.minValue]"
					></v-text-field>
				</template>
				<v-date-picker v-model="dueDate" @input="menuDueDate=false"></v-date-picker>
			</v-menu>-->
			<v-btn
				class="warning mt-3 mx-0"
				@click="submit()"
				:loading="loading"
				v-if="!edit"
				>Add order</v-btn
			>
			<v-btn
				class="warning mt-3 mx-0"
				@click="submit()"
				:loading="loading"
				v-else
				>Edit order</v-btn
			>
		</v-form>
	</div>
</template>
<script>
import { repositoryFactory } from "@/repositories/repositoryFactory";
const orderRepository = repositoryFactory.get("orderRepository");
const beverageRepository = repositoryFactory.get("beverageRepository");
const condimentRepository = repositoryFactory.get("condimentRepository");

export default {
	props: {
		edit: Boolean,
		id: Number,
		isLoading: false,
		items: [],
		model: null,
		search: null,
		tab: null,
	},
	data() {
		return {
			order: {},

			rules: {
				required: (value) => !!value || "Field Required",
				minValue: (value) =>
					value.length >= 3 || "Value must be longer than 3 letters",
			},
			loading: false,
		};
	},
	created() {
		if (this.edit) {
			this.getorderById(this.id);
		}
	},
	methods: {
		async submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				let successMessage = "";
				let response = {};

				if (!this.edit) {
					console.log(this.order);
					response = await orderRepository.addOrder(this.order);
					successMessage = "order added successfully";
				} else {
					response = await orderRepository.editorder(this.id, this.order);
					successMessage = "order edited successfully";
				}
				if (response.data) {
					this.$emit("updateorderList");

					this.$eventHub.$emit("showSnackBar", successMessage);

					this.$eventHub.$emit("closePopup");
					this.loading = false;
					response = {};
				}
			}
		},
		async getOrderById(id) {
			const response = await orderRepository.getOrderById(id);
			if (response.data) {
				this.order = response.data;
			}
		},
	},
	computed: {
		formattedDate() {
			return this.dueDate
				? new Date(this.dueDate).toUTCString().substring(0, 16)
				: "";
		},
	},
	watch: {
		model(val) {
			if (val != null) this.tab = 0;
			else this.tab = null;
		},
		search(val) {
			// Items have already been loaded
			if (this.items.length > 0) return;

			this.isLoading = true;

			// Lazily load input items
			fetch("https://api.coingecko.com/api/v3/coins/list")
				.then((res) => res.clone().json())
				.then((res) => {
					this.items = res;
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => (this.isLoading = false));
		},
	},
};
</script>

<style>
</style>