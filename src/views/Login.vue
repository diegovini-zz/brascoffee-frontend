<template>
	<div>
		<v-app>
			<v-main>
				<v-container class="fill-height">
					<v-row align="center" justify="center">
						<v-col cols="12" sm="8" md="6">
							<v-card class="elevation-12">
								<v-toolbar color="primary" dark flat>
									<v-toolbar-title class="title">Brascoffee - Login</v-toolbar-title>
									<v-spacer></v-spacer>
								</v-toolbar>
								<v-card-text>
									<v-form ref="form">
										<v-text-field
											label="Login"
											type="text"
											prepend-icon="mdi-account"
											v-model="authPayload.username"
										></v-text-field>
										<v-text-field
											label="Password"
											type="password"
											prepend-icon="mdi-lock"
											v-model="authPayload.password"
										></v-text-field>
									</v-form>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="primary" @click="submit">Login</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>

<script>
import { repositoryFactory } from "../repositories/repositoryFactory";
const authRepository = repositoryFactory.get("authRepository");

export default {
	data() {
		return {
			authPayload: {},
		};
	},
	methods: {
		async submit() {
			try {
				const response = await authRepository.login(this.authPayload);
				if (response.data) {
					this.$auth.login(response.data);

					this.$router.push({ name: "orders" });
				}
			} catch (error) {}
		},
	},
};
</script>