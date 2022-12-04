<template>
    <NuxtLayout name="auth">
        <div class="login-logo">
            <a href="/"><b>Quizae</b></a>
        </div>

        <div class="card">
            <div class="card-body login-card-body">
                <h2>Hello there, {{data['firstName']}}!</h2>

                <p>
                    First Name: {{data['firstName']}} <br>
                    Last Name: {{data['lastName']}} <br>
                    Email: {{data['email']}} <br>
                    ID: {{data['id']}} <br>
                </p>

                <a href="#" class="btn btn-warning">Log Out</a>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useHead, useFetch, useRequestHeaders} from "nuxt/app";

useHead({
    title: 'Home | Quizae',
});

const headers = useRequestHeaders(['cookie']) as any;

const { data } = await useFetch('/api/profile', { headers })
</script>
