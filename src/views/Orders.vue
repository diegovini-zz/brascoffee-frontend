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
				<v-spacer></v-spacer>
				<Popup>
					<template v-slot:button="{ on, attrs }">
						<v-btn class="warning" v-bind="attrs" v-on="on">
							<v-icon>mdi-plus</v-icon>
							<span>Order</span>
						</v-btn>
					</template>
					<template v-slot:title>Place order</template>
					<template v-slot:content="slotProps">
						<OrderForm
							v-bind="slotProps.attr"
							v-on="slotProps.on"
							@updateOrderList="getOrders"
						/>
					</template>
				</Popup>
			</v-row>
			

			<!-- <v-card :class="`px-3 project ${project.status}`" v-for="(beverage,i) in beverage" :key="i"> -->
			<v-card :class="`px-3 beverage ongoing`" v-for="(order,i) in orders" :key="i">
				<v-row class="pa-3">
					<v-col cols="6" sm="6" md="5">
						<div class="caption grey--text">Beverage Ordered</div>
						<div>{{order.beverage.description}}</div>
					</v-col>

					<v-col cols="6" sm="6" md="5">
						<div class="caption grey--text">Final Price</div>
						<div>{{order.finalPrice}}</div>
					</v-col>

					

				<v-col cols="1" sm="1" md="1">
						<Popup>
							<template v-slot:button="slotProps">
								<v-btn text v-bind="slotProps.attr" v-on="slotProps.on">
									<v-icon>mdi-square-edit-outline</v-icon>
								</v-btn>
							</template>
							<template v-slot:title>Edit order</template>
							<template v-slot:content="slotProps">
								<OrderForm
									v-bind="slotProps.attr"
									v-on="slotProps.on"
									edit
									:id="order.id"
									@updateOrderList="getOrders"
								/>
							</template>
						</Popup>
					</v-col>
					<v-col cols="1" sm="1" md="1">
						<ConfirmDialog @accept="deleteOrder(order.id)">
							<template v-slot:button="slotProps">
								<v-btn text v-bind="slotProps.attr" v-on="slotProps.on">
									<v-icon>mdi-trash-can-outline</v-icon>
								</v-btn>
							</template>
							<template v-slot:title>Delete order</template>
							<template v-slot:content
								>Do you really want to delete this order?</template
							>
						</ConfirmDialog>
					</v-col>
					<v-col cols="12" sm="12" md="12">
						<div class="caption grey--text">Condiments</div>
						<div v-for="(orderCondiment,i) in order.condiments" :key="i">
							<v-chip class="v-chip--active" color="warning">{{orderCondiment.condiment.description}}</v-chip>
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
const orderRepository = repositoryFactory.get("orderRepository");


export default {
		components: {
		Popup: () => import("@/components/Popup"),
		OrderForm: () => import("@/components/OrderForm"),
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
			orders: [],
		};
	},
	created() {
		this.getOrders();
		
	},
	methods: {
		sortBy(prop) {
			this.orders.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
		},
		async getOrders() {
			const response = await orderRepository.getOrders();
			this.orders = response.data;
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
