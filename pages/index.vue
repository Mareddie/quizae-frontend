<template>
    <NuxtLayout name="auth">
        <div class="login-logo">
            <a href="/"><b>Quizae</b></a>
        </div>

        <LoginForm></LoginForm>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useHead} from "nuxt/app";

useHead({
    title: 'Login | Quizae',
});
</script>
