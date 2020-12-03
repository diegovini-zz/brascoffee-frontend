<template>
	<div class="text-center">
		<v-dialog max-width="600px" v-model="dialog">
			<template v-slot:activator="{ on, attr }">
				<slot name="button" v-bind:attr="attr" v-bind:on="on"></slot>
			</template>
			<transition :duration="{leave:1000}">
			<v-card v-if="dialog">

				<v-card-title class="headline lighten-2">
					<slot name="title"></slot>
				</v-card-title>
				<v-card-text>
					<slot name="content"></slot>
				</v-card-text>
				<v-divider></v-divider>
			</v-card>
			</transition>
		</v-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
		};
	},
	created() {
		this.$eventHub.$on("closePopup", this.close);
	},
	beforeDestroy() {
		this.$eventHub.$off("closePopup");
	},
	methods: {
		close() {
			this.dialog = false;
		},
	},
};
</script>

