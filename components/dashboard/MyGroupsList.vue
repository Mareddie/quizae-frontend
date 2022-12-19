<template>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">My Groups</h2>

                <div class="card-tools">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-primary float-right"
                                data-toggle="modal"
                                data-target="#cu-group-modal" @click="prefillGroupFormModal('create')">
                            Create Group
                        </button>
                    </div>
                </div>
            </div>

            <div class="card-body table-responsive p-0">
                <table class="table table-head-fixed text-nowrap" v-if="groups.length > 0">
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
                        <td>{{getGroupMembers(useClone(group))}}</td>
                        <td>
                            <button type="button"
                                    class="btn btn-sm btn-primary"
                                    data-toggle="modal"
                                    data-target="#cu-group-modal"
                                    @click="prefillGroupFormModal('update', key)">
                                Edit Group
                            </button>
                            <button type="button"
                                    class="btn btn-sm btn-danger mx-1"
                                    data-toggle="modal"
                                    data-target="#delete-group-modal"
                                    @click="prefillGroupFormModal('delete', key)">
                                Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="card-body" v-else>You don't have any groups, but you can create one!</div>

                <div class="modal fade" id="delete-group-modal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-content bg-danger">
                                <div class="modal-header">
                                    <h4 class="modal-title">Are You Sure About That</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <form @submit.prevent="mutateGroup('delete', 'delete-group-modal')">
                                    <div class="modal-body">
                                        <div class="alert alert-danger" v-if="groupData.error">
                                            {{groupData.error}}
                                        </div>

                                        <p>Do you really want to delete this group? Data about games and questions will be lost.</p>
                                    </div>
                                    <div class="modal-footer justify-content-between">
                                        <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-outline-light">Delete Group</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="cu-group-modal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">{{groupData.modalHeading}}</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form @submit.prevent="mutateGroup(groupData.action, 'cu-group-modal')">
                                <div class="modal-body">
                                    <div class="alert alert-danger" v-if="groupData.error">
                                        {{groupData.error}}
                                    </div>

                                    <div class="form-group">
                                        <label for="groupName">Group name</label>
                                        <input type="text" class="form-control" id="groupName" placeholder="Enter Group Name" v-model="groupData.name" required>
                                    </div>


                                    <div class="form-group">
                                        <label>Group members</label>
                                        <VueMultiselect v-model="groupData.members"
                                                        :options="groupData.memberOptions"
                                                        :multiple="true"
                                                        :taggable="true"
                                                        placeholder="Search or add member by email"
                                                        tag-placeholder="Add member by email"
                                                        @tag="addGroupMember" />
                                    </div>
                                </div>

                                <div class="modal-footer justify-content-between">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" id="close-cu-group-modal">Close</button>
                                    <button type="submit" class="btn btn-primary" v-if="!groupData.operationInProgress">Save</button>
                                    <button type="button" class="btn btn-primary disabled" v-if="groupData.operationInProgress">Saving...</button>
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
import VueMultiselect from "vue-multiselect/src";
import {getMembershipUserEmails, getGroupMembers, GroupDataInterface, OperationDirectionsInterface} from "~/composables/groupUtils";

const emit = defineEmits<{
    (e: 'groupUpdated', message: string): void,
    (e: 'groupDeleted', message: string): void,
    (e: 'groupCreated', message: string): void,
}>();

const {data: groups, refresh: groupsRefresh} = await useFetch(
    '/api/groups/my-own',
    { key: undefined, headers: useRequestHeaders(['cookie']) as any }
);

const groupData: GroupDataInterface = reactive({
    modalHeading: null,
    action: null,
    id: null,
    name: null,
    members: [],
    memberOptions: [],
    error: null,
    operationInProgress: false,
});

const prefillGroupFormModal = (action: string, key?: number) => {
    groupData.id = null;
    groupData.name = null;
    groupData.members = [];
    groupData.memberOptions = [];
    groupData.error = null;
    groupData.operationInProgress = false;
    groupData.action = action;

    switch (action) {
        case 'create':
            groupData.modalHeading = 'Create Group';
            break;
        case 'update':
            groupData.modalHeading = 'Update Group';
            break;
    }

    if (key === undefined) {
        return;
    }

    const {value: loadedGroups} = groups;

    if (!loadedGroups || !loadedGroups.hasOwnProperty(key)) {
        return;
    }

    groupData.name = loadedGroups[key]['name'];
    groupData.id = loadedGroups[key]['id'];

    if (action === 'update') {
        groupData.members = useClone(getMembershipUserEmails(loadedGroups[key]));
        groupData.memberOptions = useClone(getMembershipUserEmails(loadedGroups[key]));
    }
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

    groupData.members.push(validated[0]);
    groupData.memberOptions.push(validated[0]);
};

const mutateGroup = async (action: string, modalId: string) => {
    groupData.error = null;
    groupData.operationInProgress = true;

    const directions = determineOperationDirections(action);

    if (directions === undefined) {
        throw new Error(`Cannot mutate group - unknown action ${action}!`);
    }

    const response = await $fetch(directions.request, directions.opts).catch((err) => err.data) as any;

    groupData.operationInProgress = false;

    if (response.error) {
        groupData.error = response.message;
        return;
    }

    // We can close modal after successful action
    document.getElementById(modalId)?.click();

    emit(directions.eventName as any, directions.eventMessage);

    return groupsRefresh();
};

const determineOperationDirections = (action: string): OperationDirectionsInterface|undefined => {
    if (action === 'create') {
        return {
            request: '/api/groups/create',
            opts: {
                method: 'POST',
                body: {
                    users: groupData.members,
                    name: groupData.name,
                },
                headers: useRequestHeaders(['cookie']),
            },
            eventName: 'groupCreated',
            eventMessage: 'Group was successfully created',
        }
    }

    if (action === 'update') {
        return {
            request: `/api/groups/${groupData.id}`,
            opts: {
                method: 'PATCH',
                body: {
                    users: groupData.members,
                    name: groupData.name,
                },
                headers: useRequestHeaders(['cookie']),
            },
            eventName: 'groupUpdated',
            eventMessage: 'Group was successfully updated',
        }
    }

    if (action === 'delete') {
        return {
            request: `/api/groups/${groupData.id}`,
            opts: {
                method: 'DELETE',
                headers: useRequestHeaders(['cookie']),
            },
            eventName: 'groupDeleted',
            eventMessage: 'Group was successfully deleted',
        }
    }

    return undefined;
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
