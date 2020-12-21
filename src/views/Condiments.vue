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
							<span class="caption text-lowercase">Sort By description</span>
						</v-btn>
					</template>
					<span>Sort by description</span>
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
							<span class="caption text-lowercase">Sort by cost</span>
						</v-btn>
					</template>
					<span>Sort by cost</span>
				</v-tooltip>
				<v-spacer></v-spacer>
				<Popup>
					<template v-slot:button="{ on, attrs }">
						<v-btn class="warning" v-bind="attrs" v-on="on">
							<v-icon>mdi-plus</v-icon>
							<span>Condiment</span>
						</v-btn>
					</template>
					<template v-slot:title>Add condiment</template>
					<template v-slot:content="slotProps">
						<CondimentForm
							v-bind="slotProps.attr"
							v-on="slotProps.on"
							@updateCondimentList="getCondiments"
						/>
					</template>
				</Popup>
			</v-row>

			<!-- <v-card :class="`px-3 project ${project.status}`" v-for="(condiment,i) in condiment" :key="i"> -->
			<v-card
				:class="`px-3 condiment ongoing`"
				v-for="(condiment, i) in condiments"
				:key="i"
			>
				<v-row class="pa-3">
					<v-col cols="6" sm="6" md="5">
						<div class="caption grey--text">Condiment Title</div>
						<div>{{ condiment.description }}</div>
					</v-col>

					<v-col cols="6" sm="6" md="5">
						<div class="caption grey--text">Price</div>
						<div>{{ condiment.cost }}</div>
					</v-col>

					<v-col cols="1" sm="1" md="1">
						<Popup>
							<template v-slot:button="slotProps">
								<v-btn text v-bind="slotProps.attr" v-on="slotProps.on">
									<v-icon>mdi-square-edit-outline</v-icon>
								</v-btn>
							</template>
							<template v-slot:title>Edit condiment</template>
							<template v-slot:content="slotProps">
								<CondimentForm
									v-bind="slotProps.attr"
									v-on="slotProps.on"
									edit
									:id="condiment.id"
									@updateCondimentList="getCondiments"
								/>
							</template>
						</Popup>
					</v-col>
					<v-col cols="1" sm="1" md="1">
						<ConfirmDialog @accept="deleteCondiment(condiment.id)">
							<template v-slot:button="slotProps">
								<v-btn text v-bind="slotProps.attr" v-on="slotProps.on">
									<v-icon>mdi-trash-can-outline</v-icon>
								</v-btn>
							</template>
							<template v-slot:title>Delete condiment</template>
							<template v-slot:content
								>Do you really want to delete this condiment?</template
							>
						</ConfirmDialog>
					</v-col>
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
const condimentRepository = repositoryFactory.get("condimentRepository");

export default {
	components: {
		Popup: () => import("@/components/Popup"),
		CondimentForm: () => import("@/components/CondimentForm"),
		ConfirmDialog: () => import("@/components/ConfirmDialog"),
	},
	data() {
		return {
			/* 	projects: [
				{
					title: "Design new website",
					person: "Mary",
					due: "1st Jan 2020",
					status: "ongoing",
				},
				{
					title: "Create salary calculator",
					person: "John",
					due: "30 Nov 2019",
					status: "completed",
				},
				{
					title: "Async template",
					person: "Zelothes",
					due: "20 Dez 2020",
					status: "completed",
				},
				{
					title: "Inspect inventory",
					person: "Abigail",
					due: "9 Sep 2020",
					status: "late",
				},
			], */
			condiments: [],
		};
	},
	created() {
		this.getCondiments();
	},
	methods: {
		sortBy(prop) {
			this.condiments.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
		},
		async getCondiments() {
			const response = await condimentRepository.getCondiments();
			this.condiments = response.data;
		},
		async deleteCondiment(id) {
			const response = await condimentRepository.deleteCondiment(id);
			console.log(response)
			if (response.status == 200) {
				this.$eventHub.$emit("showSnackBar", "Condiment deleted successfully");
				this.getCondiments();
			} else {
				this.$eventHub.$emit(
					"showSnackBar",
					"It was not possible do delete this condiment."
				);
			}
		},
	},
};
</script>

<style scoped>
.condiment.ongoing {
	border-left: 4px solid lightskyblue;
}

.condiment.completed {
	border-left: 4px solid yellowgreen;
}

.condiment.late {
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
