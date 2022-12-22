<template>
    <NuxtLayout name="main">
        <div class="row">
            <div class="col-lg-12">
                <p>
                    some content here
                </p>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {useHead} from "nuxt/app";
import {useState} from "#app";

useHead({
    title: 'Questions & Answers | Quizae',
});

useState('pageName').value = 'Questions & Answers';

// TODO: create a selector of group
// TODO: when group is selected, category selector (with ability to add or delete category)
// TODO: when category is selected, display a list of questions
// TODO: every question will have a modal window where it can be modified (incl. answers, correct answer)
</script>
