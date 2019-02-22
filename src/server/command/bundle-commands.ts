export enum BundleCommandType {
    CREATE,
    SET_ARCHIVE,
    UPDATE_BODY,
    UPDATE_EXPIRY,
    UPDATE_START,
    ASSIGN_USERS,
}


export interface CreateBundleCommand {
    type: BundleCommandType.CREATE;
    id: string;
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

export interface SetBundleArchiveStatusCommand {
    type: BundleCommandType.SET_ARCHIVE;
    id: string;
    payload: boolean;
}

export interface UpdateBundleBodyCommand {
    type: BundleCommandType.UPDATE_BODY;
    id: string;
    payload: {
        description: string;
        tagline: string;
    };
}

export interface UpdateBundleExpiryCommand {
    type: BundleCommandType.UPDATE_EXPIRY;
    id: string;
    payload: Date;
}

export interface UpdateBundleStartCommand {
    type: BundleCommandType.UPDATE_START;
    id: string;
    payload: Date;
}

export interface AssignUsersToBundleCommand {
    type: BundleCommandType.ASSIGN_USERS;
    id: string;
    payload: number[];
}

export type BundleCommand =
    | CreateBundleCommand
    | SetBundleArchiveStatusCommand
    | UpdateBundleBodyCommand
    | UpdateBundleExpiryCommand
    | UpdateBundleStartCommand
    | AssignUsersToBundleCommand;