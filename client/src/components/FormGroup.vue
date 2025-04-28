<template>
  <div class="group">
    <input v-model="data.name" type="text" placeholder="Name" required />
    <input v-model="data.email" type="email" placeholder="Email" required />
    <input
      v-model="data.phone"
      type="text"
      placeholder="(844) 448-0110"
      required
    />
    <button @click="$emit('remove')" v-if="canRemove">Remove</button>
  </div>
</template>

<script setup>
defineProps(["data", "canRemove"]);
defineEmits(["remove"]);
</script>
