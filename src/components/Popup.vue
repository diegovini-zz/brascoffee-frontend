<template>
	<div class="text-center">
		<v-dialog max-width="600px" v-model="dialog">
			<template v-slot:activator="{on,attr}">
				<v-btn v-bind="attr" v-on="on" class="mt-5 warning">Add project</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline lighten-2">Add project</v-card-title>
				<v-card-text>
					<v-form ref="form">
						<v-text-field
							label="title"
							v-model="title"
							prepend-icon="mdi-folder"
							:rules="[rules.minValue]"
						></v-text-field>
						<v-textarea
							label="content"
							v-model="content"
							prepend-icon="mdi-inbox"
							:rules="[rules.minValue]"
						></v-textarea>

						<v-menu :close-on-content-click="false" v-model="menuDueDate">
							<template v-slot:activator="{on,attrs}">
								<v-text-field
									label="Due date"
									:value="formattedDate"
									prepend-icon="mdi-calendar-today"
									readonly
									v-bind="attrs"
									v-on="on"
									:rules="[rules.minValue]"
								></v-text-field>
							</template>
							<v-date-picker v-model="dueDate" @input="menuDueDate=false"></v-date-picker>
						</v-menu>
						<v-btn class="warning mt-3 mx-0" @click="submit()" :loading="loading">Add project</v-btn>
					</v-form>




    
				</v-card-text>
				<v-divider></v-divider>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import db from '@/fb';

export default {
	data() {
		return {
			title: "",
      content: "",
      dueDate:null,
      menuDueDate:false,
      rules:{
        required: value => !!value || "Required field",
        minValue: value => value.length >= 3 || "Value must be longer than 3 letters",
        
      },
      loading:false,
      dialog:false,
      
      
		};
	},
	methods: {
		async submit() {
      if(this.$refs.form.validate()){
        const project = {
          title:this.title,
          content:this.content,
          due:this.dueDate,
          status: "ongoing",
          person :"Mary land"
        }

        try{
          this.loading = true;
          const response = await db.collection('projects').add(project);
          this.$emit("showSnackbar");
          this.loading = false;
          this.dialog = false;
          
        }
        catch(error){
          console.log(error);

        }
        
      }
		},
  },
  computed:{
    formattedDate(){
      
      return this.dueDate ? new Date(this.dueDate).toUTCString().substring(0,16) : ''
    }
  }
};
</script>

