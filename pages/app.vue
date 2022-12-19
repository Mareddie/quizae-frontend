<template>
    <NuxtLayout name="main">
        <div class="row">
            <div class="col-lg-12">
                <div class="alert alert-default-success" v-if="successMessage">
                    {{successMessage}}
                </div>
            </div>

            <DashboardMyGamesList />

            <DashboardMyGroupMembershipsList
                @group-left="(message) => updateSuccessMessage(message)" />

            <DashboardMyGroupsList
                @group-created="(message) => updateSuccessMessage(message)"
                @group-updated="(message) => updateSuccessMessage(message)"
                @group-deleted="(message) => updateSuccessMessage(message)" />
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h2 class="h5 m-0">Hello there, {{profile['firstName']}}!</h2>
                    </div>

                    <div class="card-body">
                        <p class="card-text">
                            First Name: {{profile['firstName']}} <br>
                            Last Name: {{profile['lastName']}} <br>
                            Email: {{profile['email']}} <br>
                            ID: {{profile['id']}} <br>
                        </p>

                        <a href="#" class="btn btn-warning">Log Out</a>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useHead, useFetch, useRequestHeaders} from "nuxt/app";
import {useState} from "#app";

useHead({
    title: 'Dashboard | Quizae',
});

useState('pageName').value = 'Dashboard';

const { data: profile } = await useFetch('/api/users/profile', {
    pick: ['firstName', 'lastName', 'email', 'id'] as any,
    headers: useRequestHeaders(['cookie'])
})

const successMessage = ref<string|null>(null);

const updateSuccessMessage = (message) => {
    successMessage.value = message;

    setTimeout(
        () => successMessage.value = null,
        3000
    );
}
</script>
