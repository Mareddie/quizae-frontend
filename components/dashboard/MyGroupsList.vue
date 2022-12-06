<template>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <h2 class="h5 m-0">My Groups</h2>
            </div>

            <div class="card-body table-responsive p-0">
                <table class="table table-head-fixed text-nowrap">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(group, key) in groups">
                        <td>{{group.name}}</td>
                        <td>{{groupMembers(key)}}</td>
                        <td>
                            <a href="#" role="button" class="btn btn-sm btn-primary mx-1">Manage Memberships</a>
                            <a href="#" role="button" class="btn btn-sm btn-danger mx-1">Delete</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch, useRequestHeaders} from "nuxt/app";

const {data: groups} = await useFetch(
    '/api/groups/my-own',
    { key: undefined, headers: useRequestHeaders(['cookie']) }
);

const groupMembers = (key: number) => {
    const {value: loadedGroups} = groups;

    if (!loadedGroups) {
        return null;
    }

    return loadedGroups[key]['userMemberships'].map((membership: any) => {
        return membership.user?.email;
    }).join(', ');
};
</script>
