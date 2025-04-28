<template>
  <div class="container-fluid">
    <div class="row align-items-center vh-100">
      <div class="col-4 mx-auto">
        <div class="card" style="width: 28rem">
          <div class="card-header fw-bold">Login</div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  v-model="username"
                  type="email"
                  placeholder="admin@admin.com"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  :class="{ 'is-invalid': errors.username || errors.login }"
                />
              </div>
              <div v-if="errors.username" class="invalid-feedback d-block">
                {{ errors.username }}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Password</label
                >
                <input
                  v-model="password"
                  type="password"
                  placeholder="*******"
                  class="form-control"
                  id="exampleInputPassword1"
                  :class="{ 'is-invalid': errors.password || errors.login }"
                />
              </div>
              <div v-if="errors.password" class="invalid-feedback d-block mb-1">
                {{ errors.password }}
              </div>
              <div
                v-if="errors.login"
                class="invalid-feedback d-block mb-2"
                role="alert"
              >
                {{ errors.login }}
              </div>
              <button type="submit" class="btn btn-primary me-2">Login</button>
              <button
                @click="$router.push('/signup')"
                class="btn btn-info text-white"
              >
                Signup
              </button>
              <p v-if="token">Logged in! Token: {{ token }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");

const errors = reactive({});

const validateForm = () => {
  // reset error
  Object.keys(errors).forEach((key) => delete errors[key]);

  let isValid = true;

  if (!username.value) {
    errors.username = "Email Required";
    isValid = false;
  }

  if (!password.value) {
    errors.password = "Password is Required";
    isValid = false;
  }
  return isValid;
};

const handleLogin = async () => {
  // Basic validation
  if (!validateForm()) return;
  try {
    await authStore.login({
      email: username.value,
      password: password.value,
    });
    router.push("/main");
  } catch (error) {
    console.log(error);
    errors.login = "Invalid email or password. Please try again.";
  }
};
</script>
