export interface GroupDataInterface {
    modalHeading: string|null,
    action: string|null,
    id: string|null,
    name: string|null,
    members: string[],
    memberOptions: string[],
    error: null,
    operationInProgress: boolean,
}

export interface OperationDirectionsInterface {
    request: string,
    opts: any,
    eventName: string,
    eventMessage: string
}

export function getMembershipUserEmails(loadedGroup: any): string[] {
    return loadedGroup['userMemberships'].map((membership: any) => {
        return membership.user?.email;
    });
}

export function getGroupMembers(loadedGroup: any): string|null {
    if (!loadedGroup) {
        return null;
    }

    return getMembershipUserEmails(loadedGroup).join(', ');
}
