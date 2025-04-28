<script setup>
import { reactive } from "vue";
import MainForm from "../components/MainForm.vue";
const notes = reactive([]);
</script>

<template>
  <main>
    <!-- <h1>Dashboard</h1> -->
    <section class="container-fluid">
      <MainForm />
    </section>
    <section>
      <!-- <SubmissionsTable /> -->
    </section>
  </main>
</template>
