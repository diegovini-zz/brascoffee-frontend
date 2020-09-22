<template>
	<div class="team">
		<v-subheader>Team</v-subheader>
		<v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="4" md="4" v-for="(person,i) in team" :key="i">
          <v-card flat class="ma-3 text-center">
            <v-responsive class="pt-4">
              <v-avatar size="70" color="blue">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="headline">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>
                  mdi-message
                </v-icon>
                <span>Message me</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
	</div>
</template>

<script>
export default{
  data(){
    return {
      team:[
        {name:"John Dow",role:"Project Manager", avatar:"https://api.adorable.io/avatars/140/abott@adorable.png"},
        {name:"Codewiz",role:"Developer", avatar:"https://api.adorable.io/avatars/140/codewiz@adorable.png"},
        {name:"Testz",role:"Tester", avatar:"https://api.adorable.io/avatars/140/testz@adorable.png"},
        {name:"Wannabee",role:"Product Owner", avatar:"https://api.adorable.io/avatars/140/wannabee@adorable.png"},
      ]
    }
  }
}
</script>
