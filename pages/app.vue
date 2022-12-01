<template>
    <NuxtLayout name="auth">
        <div class="login-logo">
            <a href="/"><b>Quizae</b></a>
        </div>

        <div class="card">
            <div class="card-body login-card-body">
                <h2>Hello there!</h2>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useHead} from "nuxt/app";

useHead({
    title: 'Home | Quizae',
});
</script>
