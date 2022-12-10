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
                            <button type="button"
                                    class="btn btn-sm btn-primary"
                                    data-toggle="modal"
                                    data-target="#edit-group-modal"
                                    @click="prefillGroupFormModal(key)">
                                Edit Group
                            </button>
                            <a href="#" role="button" class="btn btn-sm btn-danger mx-1">Delete</a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="modal fade" id="edit-group-modal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Group</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form @submit.prevent="editGroup">
                                <div class="modal-body">
                                    <div class="alert alert-danger" v-if="groupEditError">
                                        {{groupEditError}}
                                    </div>

                                    <div class="form-group">
                                        <label for="groupName">Group name</label>
                                        <input type="text" class="form-control" id="groupName" placeholder="Enter Group Name" v-model="groupEditName" required>
                                    </div>


                                    <div class="form-group">
                                        <label>Group members</label>
                                        <VueMultiselect v-model="groupEditMembers"
                                                        :options="groupEditMembersOptions"
                                                        :multiple="true"
                                                        :taggable="true"
                                                        placeholder="Search or add member by email"
                                                        tag-placeholder="Add member by email"
                                                        @tag="addGroupMember" />
                                    </div>
                                </div>

                                <div class="modal-footer justify-content-between">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" id="close-edit-group-modal">Close</button>
                                    <button type="submit" class="btn btn-primary" v-if="!groupEditInProgress">Save</button>
                                    <button type="button" class="btn btn-primary disabled" v-if="groupEditInProgress">Saving...</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useFetch, useRequestHeaders} from "nuxt/app";
import VueMultiselect from "vue-multiselect"

const emit = defineEmits<{
    (e: 'groupUpdated', message: string): void
}>();

const {data: groups, refresh: groupsRefresh} = await useFetch(
    '/api/groups/my-own',
    { key: undefined, headers: useRequestHeaders(['cookie']) }
);

const groupEditName = ref<string|null>(null);
const groupEditId = ref<string|null>(null);
const groupEditMembers = ref<string[]>([]);
const groupEditMembersOptions = ref<string[]>([]);
const groupEditError = ref<string|null>(null);
const groupEditInProgress = ref<boolean>(false);

const groupMembers = (key: number): string|null => {
    const {value: loadedGroups} = groups;

    if (!loadedGroups) {
        return null;
    }

    return getMembershipUserEmails(key, loadedGroups).join(', ');
};

const prefillGroupFormModal = (key: number) => {
    const {value: loadedGroups} = groups;

    if (!loadedGroups || !loadedGroups.hasOwnProperty(key)) {
        return;
    }

    groupEditName.value = loadedGroups[key]['name'];
    groupEditId.value = loadedGroups[key]['id'];

    groupEditMembers.value = useClone(getMembershipUserEmails(key, loadedGroups));
    groupEditMembersOptions.value = useClone(getMembershipUserEmails(key, loadedGroups));
    groupEditError.value = null;
    groupEditInProgress.value = false;
};

const addGroupMember = (newMember: string) => {
    const someEmailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validated = String(newMember)
        .toLowerCase()
        .trim()
        .match(someEmailRegexp);

    if (!validated) {
        return;
    }

    groupEditMembers.value.push(validated[0]);
    groupEditMembersOptions.value.push(validated[0]);
};

const getMembershipUserEmails = (key: number, loadedGroups: any): string[] => {
    return loadedGroups[key]['userMemberships'].map((membership: any) => {
        return membership.user?.email;
    });
};

const editGroup = async () => {
    groupEditError.value = null;
    groupEditInProgress.value = true;

    const response = await $fetch(`/api/groups/${groupEditId.value}`, {
        method: 'PATCH',
        body: {
            users: groupEditMembers.value,
            name: groupEditName.value,
        },
        headers: useRequestHeaders(['cookie']),
    }).catch((err) => err.data);

    groupEditInProgress.value = false;

    if (response.error) {
        groupEditError.value = response.error;
        return;
    }

    // We can close modal after successful edit
    document.getElementById('close-edit-group-modal').click();

    emit('groupUpdated', 'Group was successfully updated');

    return groupsRefresh();
};

// TODO: Logic for deleting groups
// TODO: Logic for creating groups
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
