<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">{{pageName}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useState} from "#app";

const pageName = useState('pageName', () => '');
</script>
