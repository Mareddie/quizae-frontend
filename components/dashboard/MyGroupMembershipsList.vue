<template>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <h2 class="h5 m-0">My Group Memberships</h2>
            </div>

            <div class="card-body" v-if="error">
                <div class="alert alert-danger">
                    {{error}}
                </div>
            </div>

            <div class="card-body table-responsive p-0">
                <table class="table table-head-fixed text-nowrap" v-if="groups.length > 0">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(group, key) in groups">
                        <td>{{group.name}}</td>
                        <td>{{getGroupMembers(useClone(group))}}</td>
                        <td>{{group.owner.email}}</td>
                        <td>
                            <button class="btn btn-sm btn-danger mx-1"
                                    data-toggle="modal"
                                    data-target="#leave-group-modal"
                                    @click="leaveCandidate = group.id">
                                Leave
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="card-body" v-else>You are not a member of any group.</div>

                <div class="modal fade" id="leave-group-modal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-content bg-danger">
                                <div class="modal-header">
                                    <h4 class="modal-title">Are You Sure About That</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <form @submit.prevent="">
                                    <div class="modal-body">
                                        <p>Do you really want to leave this group?</p>
                                    </div>
                                    <div class="modal-footer justify-content-between">
                                        <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-outline-light" @click="leaveGroup" v-if="leaveInProgress === false">Leave Group</button>
                                        <button type="submit" class="btn btn-outline-light disabled" @click="leaveGroup" v-else>Leaving...</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch, useRequestHeaders} from "nuxt/app";
import {getMembershipUserEmails, getGroupMembers} from "~/composables/groupUtils";

const {data: groups, refresh: groupsRefresh} = await useFetch(
    '/api/groups/my-memberships',
    { key: undefined, headers: useRequestHeaders(['cookie']) as any }
);

const emit = defineEmits<{
    (e: 'groupLeft', message: string): void,
}>();

const leaveCandidate = ref<string|null>(null);
const leaveInProgress = ref<boolean>(false);
const error = ref<string|null>(null);

const leaveGroup = async () => {
    leaveInProgress.value = true;

    const response = await $fetch(
        `/api/groups/${leaveCandidate.value}/leave`,
        {
            method: 'PATCH',
            headers: useRequestHeaders(['cookie']) as any,
        }).catch((err) => err.data) as any;

    leaveInProgress.value = false;

    document.getElementById('leave-group-modal')?.click();

    if (response.error) {
        error.value = response.message;
        return;
    }

    emit('groupLeft', 'You successfully left the group');

    return groupsRefresh();
};
</script>
