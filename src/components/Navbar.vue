<template>
	<nav>
		<v-snackbar v-model="snackbar" timeout="2000" color="success" bottom right>
			Project added successfully
			<template v-slot:action="{attrs}">
				<v-btn v-bind="attrs" @click="snackbar=false">Close</v-btn>
			</template>
		</v-snackbar>

		<v-app-bar flat app>
			<v-app-bar-nav-icon class="grey--text" @click="toogleDrawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">Bras</span>
				<span>Coffee</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<div class="text-center">
				<v-menu open-on-hover offset-y>
					<template v-slot:activator="{on,attrs}">
						<v-btn text v-bind="attrs" v-on="on">
							<v-icon left>mdi-chevron-down</v-icon>
							<span>Menu</span>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(link,i) in links" :key="i" router :to="link.route">
							<v-list-item-title>{{link.text}}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>

			<v-btn @click="signOut" text color="grey lighten-1">
				<span>Sign out</span>
				<v-icon color="tomate" right>mdi-exit-to-app</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer app v-model="drawer" class="indigo">
			<v-row class="mt-5" justify="center">
				<v-col cols="4">
					<v-avatar size="70">
						<img src="https://api.adorable.io/avatars/186/me.png" alt />
					</v-avatar>
				</v-col>
			</v-row>
			<v-row justify="center">
				<p class="white--text subheading ma-0 pa-0">John Down Wayne</p>
			</v-row>

			<v-row justify="center">
				<Popup @showSnackbar="snackbar = true" />
			</v-row>

			<v-list>
				<v-list-item v-for="(link,i) in links" :key="i" router :to="link.route">
					<v-list-item-action>
						<v-icon class="white--text">{{link.icon}}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text font-weight-medium">{{link.text}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
import Popup from "./Popup";
export default {
	components: {
		Popup,
	},
	data() {
		return {
			drawer: false,
			links: [
				{ icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
				{ icon: "mdi-folder", text: "My projects", route: "/projects" },
				{ icon: "mdi-account", text: "Team", route: "/team" },
			],
			snackbar: true,
		};
	},
	methods: {
		toogleDrawer: function () {
			this.drawer = !this.drawer;
		},
		signOut: function () {
			this.$auth.logout();
		},
	},
};
</script>