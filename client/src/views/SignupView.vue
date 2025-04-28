<template>
  <div class="container-fluid">
    <div class="row align-items-center vh-100">
      <div class="col-4 mx-auto">
        <div class="card" style="width: 28rem">
          <div class="card-header fw-bold">Sign Up</div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                  v-model="name"
                  placeholder="John Doe"
                  required
                  type="text"
                  class="form-control"
                  id="nameInput"
                  aria-describedby="name"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  v-model="email"
                  placeholder="example@hotmail.com"
                  type="email"
                  required
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
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
                />
              </div>
              <button type="submit" class="btn btn-primary me-2">
                Register
              </button>
              <button
                @click="$router.push('/')"
                class="btn btn-info text-white"
              >
                Login
              </button>
              <p v-if="message">{{ message }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");

const handleSubmit = async () => {
  try {
    const res = await axios.post("http://localhost:3000/signup", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    message.value = res.data.message;
  } catch (err) {
    message.value = err.response?.data?.error || "Error occurred";
  }
};
</script>
