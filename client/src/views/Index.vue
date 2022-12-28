<template>
  <div class="home">
    <label></label>
    <input type="text" v-model="name">
    <input type="email" v-model="email">
    <input type="date" v-model="dob">
    <input type="number" v-model="age">

    <button @click="createStudent">Create Student</button>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return{
      students: null,
      name: null,
      email: null,
      age: null,
      dob: null,


    }
  },
  created() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      try{
        const res = await axios.get("http://localhost:3000/api/v1/students/")
        this.students = res.data
        console.log(this.students);
      }catch (err) {
        console.log(err)
      }
    },
    async createStudent() {
      try{
        let student = {
          name: this.name,
          email: this.email,
          age: this.age,
          dob: this.dob
        }
        await axios.post("http://localhost:3000/api/v1/students/", student)

      }catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>
