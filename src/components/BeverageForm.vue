<template>
	<div>
		<v-form ref="form">
			<v-text-field
				label="Description"
				v-model="beverage.description"
				prepend-icon="mdi-folder"
				:rules="[rules.minValue]"
			></v-text-field>
			<v-text-field
				label="Cost"
				prefix="$"
				type="text"
				v-model.lazy="beverage.cost"
				prepend-icon="mdi-folder"
				:rules="[rules.required]"
				v-currency
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
			<v-btn class="warning mt-3 mx-0" @click="submit()" :loading="loading"
				>Add Beverage</v-btn
			>
		</v-form>
	</div>
</template>
<script>
import { repositoryFactory } from "@/repositories/repositoryFactory";
const beverageRepository = repositoryFactory.get("beverageRepository");

export default {
	props: {
		edit: Boolean,
		id: Number,
	},
	data() {
		return {
			beverage: {},

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
			this.getBeverageById(this.id);
		}
	},
	methods: {
		async submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				let successMessage = "";
				let response = {};

				if (!this.edit) {
					response = await beverageRepository.addBeverage(this.beverage);
					successMessage = "Beverage added successfully";
				} else {
					response = await beverageRepository.editBeverage(
						this.id,
						this.beverage
					);
					successMessage = "Beverage edited successfully";
				}
				if (response.data) {
					this.$emit("updateBeverageList");

					this.$eventHub.$emit("showSnackBar", successMessage);
					
					this.$eventHub.$emit("closePopup");
					this.loading = false;
					response = {};
				}
			}
		},
		async getBeverageById(id) {
			const response = await beverageRepository.getBeverageById(id);
			if (response.data) {
				this.beverage = response.data;
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
};
</script>

<style>
</style>