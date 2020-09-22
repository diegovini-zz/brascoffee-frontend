<template>
	<div class="projects">
		<v-subheader>Projects</v-subheader>
		<v-container class="my-5">
			<v-expansion-panels :accordion="true">
				<v-expansion-panel v-for="(project,i) in myProjects" :key="i">
					<v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
					<v-expansion-panel-content>
						<div class="grey--text">{{project.content}}</div>
						<div class="font-weight-medium">Due date: {{project.due}}</div>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			projects: [
				{
					title: "Design new website",
					person: "Mary",
					due: "1st Jan 2020",
					status: "ongoing",
					content: "lorem ipsum lorem ipsum generator",
				},
				{
					title: "Create salary calculator",
					person: "John",
					due: "30 Nov 2019",
					status: "completed",
					content: "lorem ipsum lorem ipsum generator",
				},
				{
					title: "Async template",
					person: "Zelothes",
					due: "20 Dez 2020",
					status: "completed",
					content: "lorem ipsum lorem ipsum generator",
				},
				{
					title: "Inspect inventory",
					person: "Abigail",
					due: "9 Sep 2020",
					status: "late",
					content: "lorem ipsum lorem ipsum generator",
				},
				{
					title: "Evaluate project",
					person: "Abigail",
					due: "12 Nov 2020",
					status: "ongoing",
					content: "Evaluate the project and see if it is feasible",
				},
			],
		};
	},
	computed: {
		myProjects() {
			return this.projects.filter((project) => project.person === "Abigail");
		},
	},
};
</script>
