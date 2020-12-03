<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="290">
			<template v-slot:activator="{ on, attrs }">
				<slot name="button" v-bind:attr="attrs" v-bind:on="on"></slot>
			</template>
			<v-card>
				<v-card-title class="headline">
					<slot name="title"></slot>
				</v-card-title>
				<v-card-text>
					<slot name="content"></slot>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="cancel">Cancel</v-btn>
					<v-btn color="green darken-1" text @click="accept">Accept</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
		};
	},
	methods: {
		accept() {
			this.$emit("accept");
			this.dialog = false;
		},
		cancel() {
			this.dialog = false;
		},
	},
};
</script>