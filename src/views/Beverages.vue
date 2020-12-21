<template>
	<div class="dashboard">
		<v-subheader>Dashboard</v-subheader>
		<v-container class="my-4">
			<v-row class="pa-3 mb-3">
				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							text
							small
							color="grey"
							@click="sortBy('description')"
							v-on="on"
							v-bind="attrs"
						>
							<v-icon left small>mdi-folder</v-icon>
							<span class="caption text-lowercase">Sort By Description</span>
						</v-btn>
					</template>
					<span>Sort by Description</span>
				</v-tooltip>

				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							text
							small
							color="grey"
							@click="sortBy('cost')"
							v-on="on"
							v-bind="attrs"
						>
							<v-icon left small>mdi-face</v-icon>
							<span class="caption text-lowercase">Sort By Cost</span>
						</v-btn>
					</template>
					<span>Sort by Cost</span>
				</v-tooltip>
				<v-spacer></v-spacer>
				<Popup>
					<template v-slot:button="{ on, attrs }">
						<v-btn class="warning" v-bind="attrs" v-on="on">
							<v-icon>mdi-plus</v-icon>
							<span>Beverage</span>
						</v-btn>
					</template>
					<template v-slot:title>Add beverage</template>
					<template v-slot:content="slotProps">
						<BeverageForm
							v-bind="slotProps.attr"
							v-on="slotProps.on"
							@updateBeverageList="getBeverages"
						/>
					</template>
				</Popup>
			</v-row>

			<!-- <v-card :class="`px-3 project ${project.status}`" v-for="(beverage,i) in beverage" :key="i"> -->
			<v-card
				:class="`px-3 beverage ongoing`"
				v-for="(beverage, i) in beverages"
				:key="i"
			>
				<v-row class="pa-3">
					<v-col cols="5" sm="5" md="5">
						<div class="caption grey--text">Beverage Title</div>
						<div>{{ beverage.description }}</div>
					</v-col>

					<v-col cols="5" sm="5" md="5">
						<div class="caption grey--text">Price</div>
						<div>{{ beverage.cost }}</div>
					</v-col>

					<v-col cols="1" sm="1" md="1">
						<Popup>
							<template v-slot:button="slotProps">
								<v-btn text v-bind="slotProps.attr" v-on="slotProps.on">
									<v-icon>mdi-square-edit-outline</v-icon>
								</v-btn>
							</template>
							<template v-slot:title>Edit beverage</template>
							<template v-slot:content="slotProps">
								<BeverageForm
									v-bind="slotProps.attr"
									v-on="slotProps.on"
									edit
									:id="beverage.id"
									@updateBeverageList="getBeverages"
								/>
							</template>
						</Popup>
					</v-col>
					<v-col cols="1" sm="1" md="1">
						<ConfirmDialog @accept="deleteBeverage(beverage.id)">
							<template v-slot:button="slotProps">
								<v-btn text v-bind="slotProps.attr" v-on="slotProps.on">
									<v-icon>mdi-trash-can-outline</v-icon>
								</v-btn>
							</template>
							<template v-slot:title>Delete beverage</template>
							<template v-slot:content
								>Do you really want to delete this beverage?</template
							>
						</ConfirmDialog>
					</v-col>

					<!-- <v-col cols="12" sm="6" md="2">
						<div class="caption grey--text">Due by</div>
						<div>{{project.due}}</div>
					</v-col>

					<v-col cols="12" sm="4" md="2">
						<div class="d-flex justify-end">
							<v-chip
								class="v-chip--active white--text caption my-2"
								:color="`${project.status}`"
							>{{project.status}}</v-chip>
						</div>
					</v-col>-->
				</v-row>
				<v-row class="pa-0" cols="12">
					<v-divider></v-divider>
				</v-row>
			</v-card>
		</v-container>
	</div>
</template>


<script>
import { repositoryFactory } from "@/repositories/repositoryFactory";

const beverageRepository = repositoryFactory.get("beverageRepository");

export default {
	components: {
		Popup: () => import("@/components/Popup"),
		BeverageForm: () => import("@/components/BeverageForm"),
		ConfirmDialog: () => import("@/components/ConfirmDialog"),
	},
	data() {
		return {
			beverages: [],
			};
		},
		created() {
		this.getBeverages();
	},
	methods: {
		sortBy(prop) {
			this.beverages.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
		},
		async getBeverages() {
			const response = await beverageRepository.getBeverages();

			this.beverages = response.data;
		},
		async deleteBeverage(id) {
			
			const response = await beverageRepository.deleteBeverage(id);
			if(response.status==200){
				this.$eventHub.$emit("showSnackBar", "Beverage deleted successfully");
				this.getBeverages()
			}else{
				this.$eventHub.$emit("showSnackBar", "It was not possible do delete this beverage.");
			}
		},
	},
};
</script>

<style scoped>
.beverage.ongoing {
	border-left: 4px solid lightskyblue;
}

.beverage.completed {
	border-left: 4px solid yellowgreen;
}

.beverage.late {
	border-left: 4px solid tomato;
}

.v-chip.ongoing {
	background: lightskyblue;
}

.v-chip.completed {
	background: yellowgreen;
}

.v-chip.late {
	background: tomato;
}
</style>
