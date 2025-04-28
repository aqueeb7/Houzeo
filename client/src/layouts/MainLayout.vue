<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.clearToken();
  router.push("/");
};
</script>

<template>
  <div>
    <nav class="navbar bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1 text-white">Dashboard</span>
        <button class="btn btn-danger" @click="handleLogout">Logout</button>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
