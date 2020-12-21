<template>
	<div>
		<v-form ref="form">
			<v-text-field
				label="Description"
				v-model="condiment.description"
				prepend-icon="mdi-folder"
				:rules="[rules.minValue]"
			></v-text-field>
			<v-text-field
				label="Cost"
				prefix="$"
				type="text"
				v-model.lazy="condiment.cost"
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
			<v-btn class="warning mt-3 mx-0" @click="submit()" :loading="loading" v-if="!edit"
				>Add Condiment</v-btn
			>
			<v-btn class="warning mt-3 mx-0" @click="submit()" :loading="loading" v-else
				>Edit Condiment</v-btn
			>
		</v-form>
	</div>
</template>
<script>
import { repositoryFactory } from "@/repositories/repositoryFactory";
const condimentRepository = repositoryFactory.get("condimentRepository");

export default {
	props: {
		edit: Boolean,
		id: Number,
	},
	data() {
		return {
			condiment: {},

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
			this.getCondimentById(this.id);
		}
	},
	methods: {
		async submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				let successMessage = "";
				let response = {};

				if (!this.edit) {
					console.log(this.condiment)
					response = await condimentRepository.addCondiment(this.condiment);
					successMessage = "Condiment added successfully";
				} else {
					response = await condimentRepository.editCondiment(
						this.id,
						this.condiment
					);
					successMessage = "Condiment edited successfully";
				}
				if (response.data) {
					this.$emit("updateCondimentList");

					this.$eventHub.$emit("showSnackBar", successMessage);
					
					this.$eventHub.$emit("closePopup");
					this.loading = false;
					response = {};
				}
			}
		},
		async getCondimentById(id) {
			const response = await condimentRepository.getCondimentById(id);
			if (response.data) {
				this.condiment = response.data;
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