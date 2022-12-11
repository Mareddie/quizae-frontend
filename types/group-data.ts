export interface GroupData {
    id: string|null,
    name: string|null,
    members: string[],
    memberOptions: string[],
    error: null,
    operationInProgress: boolean,
}
