<template>
	<div class="dashboard">
		<v-subheader>Dashboard</v-subheader>
		<v-container class="my-4">
			<v-row class="pa-3 mb-3">
				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn text small color="grey" @click="sortBy('title')" v-on="on" v-bind="attrs">
							<v-icon left small>mdi-folder</v-icon>
							<span class="caption text-lowercase">By Project Name</span>
						</v-btn>
					</template>
					<span>Sort by project Title</span>
				</v-tooltip>

				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn text small color="grey" @click="sortBy('person')" v-on="on" v-bind="attrs">
							<v-icon left small>mdi-face</v-icon>
							<span class="caption text-lowercase">By Person</span>
						</v-btn>
					</template>
					<span>Sort by Person</span>
				</v-tooltip>
			</v-row>

			<v-card :class="`px-3 project ${project.status}`" v-for="(project,i) in projects" :key="i">
				<v-row class="pa-3">
					<v-col cols="12" sm="12" md="6">
						<div class="caption grey--text">Project Title</div>
						<div>{{project.title}}</div>
					</v-col>

					<v-col cols="12" sm="6" md="2">
						<div class="caption grey--text">Person</div>
						<div>{{project.person}}</div>
					</v-col>

					<v-col cols="12" sm="6" md="2">
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
const beverageRepository = repositoryFactory.get("beverageRepository");

export default {
	data() {
		return {
			projects: [
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
			],
			beverages: [],
		};
	},
	created() {
		this.getBeverages();
	},
	methods: {
		sortBy(prop) {
			this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
		},
		async getBeverages() {
			const response = await beverageRepository.getBeverages();

			this.beverages = response.data;
		},
	},
};
</script>

<style scoped>
.project.ongoing {
	border-left: 4px solid lightskyblue;
}

.project.completed {
	border-left: 4px solid yellowgreen;
}

.project.late {
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
