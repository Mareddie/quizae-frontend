<template>
    <Body class="login-page">
        <div class="login-box">
            <slot/>
        </div>
    </Body>
</template>

<script setup>
import {useHead} from "nuxt/app";

useHead({
    script: [
        {src: '/script/jquery.min.js'},
        {src: '/script/bootstrap.bundle.min.js'},
        {src: '/script/adminlte.min.js'},
    ],
    link: [
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback'
        },
        {rel: 'stylesheet', href: '/css/fontawesome-all.min.css'},
        {rel: 'stylesheet', href: '/css/icheck-bootstrap.min.css'},
        {rel: 'stylesheet', href: '/css/adminlte.min.css'}
    ]
});
</script>
