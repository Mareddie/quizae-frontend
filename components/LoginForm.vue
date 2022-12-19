<template>
    <div class="card">
        <form @submit.prevent="authenticate">
            <div class="card-body login-card-body">
                <div class="alert alert-danger" v-if="authError !== null">
                    {{authError.message}}
                </div>

                <div class="input-group mb-3">
                    <input
                        name="email"
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        v-model="email"
                        required>

                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>

                <div class="input-group mb-3">
                    <input
                        name="password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="password"
                        required>

                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>

                <div class="input-group mb-3">
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {navigateTo} from "#app";

const email = ref('');
const password = ref('');
const authError = ref(null);

async function authenticate() {
    // We can reset the error on multiple attempts
    authError.value = null;

    const response = await $fetch('/api/users/login', {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
        }
    }).catch((err) => {
        password.value = '';
        authError.value = err.data;
    });

    if (response !== undefined) {
        return navigateTo('/app');
    }
}
</script>
