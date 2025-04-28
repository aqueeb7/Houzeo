<template>
  <!-- Group Fields -->
  <div class="row my-2">
    <div class="col-3">
      <h3>Contact Information</h3>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div
          v-for="(group, index) in formData.groups"
          :key="index"
          class="group-container"
        >
          <div class="card p-3 mb-3">
            <div class="d-flex justify-content-end">
              <button
                v-if="formData.groups.length > 2"
                type="button"
                class="btn btn-danger btn-sm"
                @click="removeGroup(index)"
              >
                Remove
              </button>
            </div>

            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="group.name"
                :class="{ 'is-invalid': errors[`groups.${index}.name`] }"
              />
              <div
                v-if="errors[`groups.${index}.name`]"
                class="invalid-feedback"
              >
                {{ errors[`groups.${index}.name`] }}
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="text"
                class="form-control"
                v-model="group.email"
                :class="{ 'is-invalid': errors[`groups.${index}.email`] }"
              />
              <div
                v-if="errors[`groups.${index}.email`]"
                class="invalid-feedback"
              >
                {{ errors[`groups.${index}.email`] }}
              </div>
            </div>

            <div class="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                class="form-control"
                placeholder="(844) 448-0110"
                v-model="group.mobileNumber"
                @input="() => formatPhoneNumber(index)"
                :class="{
                  'is-invalid': errors[`groups.${index}.mobileNumber`],
                }"
              />
              <div
                v-if="errors[`groups.${index}.mobileNumber`]"
                class="invalid-feedback"
              >
                {{ errors[`groups.${index}.mobileNumber`] }}
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-secondary mb-3" @click="addGroup">
          + Add More
        </button>

        <!-- Birth Date -->
        <div class="form-group">
          <label>Birth Date</label>
          <input
            type="date"
            class="form-control"
            v-model="formData.birthDate"
            :class="{ 'is-invalid': errors.birthDate }"
          />
          <div v-if="errors.birthDate" class="invalid-feedback">
            {{ errors.birthDate }}
          </div>
          <small class="form-text text-muted" v-if="formattedBirthDate">
            Formatted date: {{ formattedBirthDate }}
          </small>
        </div>

        <!-- Gender Radio Buttons -->
        <div class="form-group">
          <label>Gender</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              v-model="formData.gender"
              :class="{ 'is-invalid': errors.gender }"
            />
            <label class="form-check-label" for="male">Male</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              v-model="formData.gender"
            />
            <label class="form-check-label" for="female">Female</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="other"
              value="other"
              v-model="formData.gender"
            />
            <label class="form-check-label" for="other">Other</label>
          </div>
          <div v-if="errors.gender" class="invalid-feedback d-block">
            {{ errors.gender }}
          </div>
        </div>

        <!-- Language Checkboxes -->
        <div class="form-group">
          <label>Languages</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="angular"
              value="Angular"
              v-model="formData.languages"
              :class="{ 'is-invalid': errors.languages }"
            />
            <label class="form-check-label" for="angular">Angular</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="vuejs"
              value="VueJS"
              v-model="formData.languages"
            />
            <label class="form-check-label" for="vuejs">VueJS</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="reactjs"
              value="ReactJS"
              v-model="formData.languages"
            />
            <label class="form-check-label" for="reactjs">ReactJS</label>
          </div>
          <div v-if="errors.languages" class="invalid-feedback d-block">
            {{ errors.languages }}
          </div>
        </div>

        <!-- City Multi-Select -->
        <div class="form-group">
          <label>City</label>
          <select
            multiple
            v-model="formData.city"
            class="form-control"
            :class="{ 'is-invalid': errors.city }"
          >
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <div v-if="errors.city" class="invalid-feedback">
            {{ errors.city }}
          </div>
        </div>

        <!-- File Upload -->
        <div class="form-group">
          <label>File Upload (JPEG and PDF only)</label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="file"
              @change="handleFileUpload"
              accept=".jpeg,.jpg,.pdf"
              :class="{ 'is-invalid': errors.file }"
            />
            <label class="custom-file-label" for="file">
              {{ formData.file ? formData.file.name : "Choose file" }}
            </label>
          </div>
          <div v-if="errors.file" class="invalid-feedback d-block">
            {{ errors.file }}
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="col-9">
      <!-- Results Table -->
      <div>
        <h3 class="text-l font-bold">Submitted Forms</h3>
        <table class="w-full border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">Name & Email (Group)</th>
              <th class="border p-2">Birth Date</th>
              <th class="border p-2">Gender</th>
              <th class="border p-2">Languages</th>
              <th class="border p-2">Cities</th>
              <th class="border p-2">File</th>
            </tr>
          </thead>
          <tbody v-if="submittedData && submittedData.length > 0">
            <tr v-for="entry in submittedData" :key="entry.id">
              <td class="border p-2">
                <div v-for="group in entry.groups" :key="group.email">
                  <div><strong>Name:</strong> {{ group.name }}</div>
                  <div><strong>Email:</strong> {{ group.email }}</div>
                  <div><strong>Mobile:</strong> {{ group.mobileNumber }}</div>
                  <hr class="my-1" />
                </div>
              </td>
              <td class="border p-2">{{ formatBirthDate(entry.birthDate) }}</td>
              <td class="border p-2">{{ entry.gender }}</td>
              <td class="border p-2">{{ entry.languages.join(", ") }}</td>
              <td class="border p-2">{{ entry.city.join(", ") }}</td>
              <td class="border p-2">
                <a
                  v-if="entry.file"
                  :href="`http://localhost:3000/${entry.file.path.replace(
                    /\\\\/g,
                    '/'
                  )}`"
                  target="_blank"
                  class="text-blue-600 underline"
                >
                  {{ entry.file.originalName }}
                </a>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center">No Data Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";

// Form data state
const formData = reactive({
  groups: [
    {
      name: "",
      email: "",
      mobileNumber: "",
    },
    {
      name: "",
      email: "",
      mobileNumber: "",
    },
  ],
  birthDate: "",
  gender: "",
  languages: [],
  city: [],
  file: null,
});

// Other reactive state
const errors = reactive({});
const submitted = ref(false);
const submittedData = ref([]);

onMounted(() => {
  fetchSubmissions();
});

const formatBirthDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Cities data
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

// Computed properties
const formattedBirthDate = computed(() => {
  if (!formData.birthDate) return "";
  const date = new Date(formData.birthDate);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
});

// Methods
const addGroup = () => {
  formData.groups.push({
    name: "",
    email: "",
    mobileNumber: "",
  });
};

const removeGroup = (index) => {
  if (formData.groups.length > 2) {
    formData.groups.splice(index, 1);
  }
};

const formatPhoneNumber = (index) => {
  let number = formData.groups[index].mobileNumber.replace(/\D/g, "");
  if (number.length > 0) {
    if (number.length <= 3) {
      formData.groups[index].mobileNumber = `(${number}`;
    } else if (number.length <= 6) {
      formData.groups[index].mobileNumber = `(${number.substring(
        0,
        3
      )}) ${number.substring(3)}`;
    } else {
      formData.groups[index].mobileNumber = `(${number.substring(
        0,
        3
      )}) ${number.substring(3, 6)}-${number.substring(6, 10)}`;
    }
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileType = file.type;
    if (fileType === "image/jpeg" || fileType === "application/pdf") {
      formData.file = file;
      errors.file = null;
    } else {
      errors.file = "Only JPEG and PDF files are allowed";
      event.target.value = ""; // Clear the file input
    }
  }
};

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach((key) => delete errors[key]);
  let isValid = true;

  // Validate groups
  formData.groups.forEach((group, index) => {
    if (!group.name) {
      errors[`groups.${index}.name`] = "Name is required";
      isValid = false;
    }

    if (!group.email) {
      errors[`groups.${index}.email`] = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(group.email)) {
      errors[`groups.${index}.email`] = "Please enter a valid email";
      isValid = false;
    }

    if (!group.mobileNumber) {
      errors[`groups.${index}.mobileNumber`] = "Mobile number is required";
      isValid = false;
    }
  });

  // Validate other fields
  if (!formData.birthDate) {
    errors.birthDate = "Birth date is required";
    isValid = false;
  }

  if (!formData.gender) {
    errors.gender = "Please select a gender";
    isValid = false;
  }

  if (formData.languages.length === 0) {
    errors.languages = "Please select at least one language";
    isValid = false;
  }

  if (formData.city.length === 0) {
    errors.city = "Please select at least one city";
    isValid = false;
  }

  return isValid;
};

const handleApiErrors = (errorData) => {
  // Handle specific API errors
  if (errorData.errors) {
    for (const field in errorData.errors) {
      errors[field] = errorData.errors[field][0];
    }
  } else {
    errors.general = errorData.message || "An error occurred during submission";
  }
};

const submitForm = async () => {
  debugger;
  // Basic validation
  if (!validateForm()) return;

  try {
    const formDataToSend = new FormData();
    console.log(formData);

    // Append grouped fields
    formDataToSend.append("groups", JSON.stringify(formData.groups));

    // Append other fields
    formDataToSend.append("birthDate", formData.birthDate);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("languages", JSON.stringify(formData.languages));
    formDataToSend.append("city", JSON.stringify(formData.city));

    // Append file
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:3000/submit-form",
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle success
    console.log(typeof response.data.data);
    submittedData.value.push(response.data.data);
    submitted.value = true;
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
    if (error.response && error.response.data) {
      handleApiErrors(error.response.data);
    } else {
      errors.general = "An unexpected error occurred. Please try again.";
    }
  }
};

const fetchSubmissions = async () => {
  debugger;
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/submissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    submittedData.value = res.data.data;
    console.log("Submitted data:", submittedData.value);
  } catch (err) {
    console.error("Failed to fetch submissions:", err);
  }
};

const resetForm = () => {
  formData.groups = [{ name: "", email: "", mobileNumber: "" }];
  formData.birthDate = "";
  formData.gender = "";
  formData.languages = [];
  formData.city = [];
  formData.file = null;

  // If you're using a file input, also reset its DOM value manually
  const fileInput = document.getElementById("fileInput");
  if (fileInput) fileInput.value = "";
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.table-active {
  background-color: rgba(0, 0, 0, 0.075);
  font-weight: bold;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.custom-file {
  position: relative;
  display: inline-block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  margin-bottom: 0;
}
</style>
