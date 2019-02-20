export enum BundleEventType {
    CREATED,
    ARCHIVED,
    UNARCHIVED,
    ASSIGNED,
    UNASSIGNED,
    DESCRIPTION_CHANGE,
    TAGLINE_CHANGE,
    EXPIRY_CHANGE,
    START_CHANGE,
}


export interface BundleCreatedEvent {
    type: BundleEventType.CREATED;
    id: string;
    version: number;
    payload: {
        price: string;
        sweeps: string;
        goldCoins: string;
        isSpecialOffer: boolean;
        isOneTimeOffer: boolean;
        description: string;
        tagline: string;
        startTime: Date;
        expiryTime: Date;
    };
}

export interface BundleArchivedEvent {
    type: BundleEventType.ARCHIVED;
    id: string;
    version: number;
}

export interface BundleUnarchivedEvent {
    type: BundleEventType.UNARCHIVED;
    id: string;
    version: number;
}

export interface BundleAssignedToUserEvent {
    type: BundleEventType.ASSIGNED;
    id: string;
    version: number;
    payload: number;
}

export interface BundleUnassignedFromUserEvent {
    type: BundleEventType.UNASSIGNED;
    id: string;
    version: number;
    payload: number;
}

export interface BundleDescriptionChangeEvent {
    type: BundleEventType.DESCRIPTION_CHANGE;
    id: string;
    version: number;
    payload: string;
}

export interface BundleTaglineChangeEvent {
    type: BundleEventType.TAGLINE_CHANGE;
    id: string;
    version: number;
    payload: string;
}

export interface BundleExpiryChangeEvent {
    type: BundleEventType.EXPIRY_CHANGE;
    id: string;
    version: number;
    payload: Date;
}

export interface BundleStartTimeChangeEvent {
    type: BundleEventType.START_CHANGE;
    id: string;
    version: number;
    payload: Date;
}


export type BundleEvent =
    { id: string, version: number }
    & (
    | BundleCreatedEvent
    | BundleArchivedEvent
    | BundleUnarchivedEvent
    | BundleAssignedToUserEvent
    | BundleUnassignedFromUserEvent
    | BundleDescriptionChangeEvent
    | BundleTaglineChangeEvent
    | BundleExpiryChangeEvent
    | BundleStartTimeChangeEvent);