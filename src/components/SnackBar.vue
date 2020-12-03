<template>
  <div>
    <v-snackbar v-model="snackbar" timeout="2000" color="success" bottom right>
			{{snackbarText}}
			<template v-slot:action="{attrs}">
				<v-btn v-bind="attrs" @click="snackbar=false">Close</v-btn>
			</template>
		</v-snackbar>
  </div>
</template>

<script>
export default {
  props:{
    snackbarText
  },
  data(){
    return{
      snackbar: true,
    }
  }
  
}
</script>