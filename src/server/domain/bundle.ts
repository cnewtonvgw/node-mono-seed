import { bundleErrors } from './bundle-errors';
import {
    BundleArchivedEvent,
    BundleAssignedToUserEvent,
    BundleCreatedEvent,
    BundleDescriptionChangeEvent,
    BundleEventType,
    BundleExpiryChangeEvent,
    BundleStartTimeChangeEvent,
    BundleTaglineChangeEvent,
    BundleUnarchivedEvent,
    BundleUnassignedFromUserEvent,
} from '../event/bundle-events';

export interface Bundle {
    id: string;
    price: string;
    sweeps: string;
    goldCoins: string;
    isSpecialOffer: boolean;
    isOneTimeOffer: boolean;
    isArchived: boolean;
    assignedUsers: number[];
    description: string;
    tagline: string;
    startTime: Date;
    expiryTime: Date;
    version: number;
}

function preventUpdateOfArchivedBundle(bundle: Bundle): void {
    if (bundle.isArchived) {
        throw bundleErrors.cannotUpdateArchivedBundle();
    }
}

function preventUpdateOfExpiredBundle(bundle: Bundle): void {
    if (bundle.expiryTime.valueOf() < Date.now().valueOf()) {
        throw bundleErrors.cannotUpdateExpiredBundle();
    }
}

export const createBundle = (bundle: Bundle): BundleCreatedEvent => {
    const priceNum = parseFloat(bundle.price);
    const sweepsNum = parseFloat(bundle.sweeps);
    const goldCoinsNum = parseFloat(bundle.goldCoins);
    if (priceNum < 0 || sweepsNum < 0 || goldCoinsNum < 0) {
        throw bundleErrors.currencyValuesCannotBeNegative();
    }
    if (bundle.isOneTimeOffer && !bundle.isSpecialOffer) {
        throw bundleErrors.onetimeOfferMustAlsoBeSpecialOffer();
    }
    // Ignoring the obvious issue with a 'now' option.
    if (bundle.startTime.valueOf() < Date.now().valueOf()) {
        throw bundleErrors.startTimeCannotBeInThePast();
    }

    if (bundle.expiryTime.valueOf() < Date.now().valueOf()) {
        throw bundleErrors.expiryTimeCannotBeInThePast();
    }
    if (bundle.expiryTime.valueOf() < bundle.startTime.valueOf()) {
        throw bundleErrors.startTimeMustBeBeforeExpiryTime();
    }

    // Arbitrary rules to demonstrate business rule enforcement.
    if (bundle.description.length < 5) {
        throw bundleErrors.descriptionMustBeMinimumLength();
    }
    if (bundle.description.length > 35) {
        throw bundleErrors.descriptionTooLong();
    }

    const { id, version, ...payload } = bundle;

    return {
        type: BundleEventType.CREATED,
        id,
        version,
        payload,
    };
};

export const assignUsers = (bundle: Bundle, userIds: number[]): BundleAssignedToUserEvent[] => {
    preventUpdateOfArchivedBundle(bundle);
    preventUpdateOfExpiredBundle(bundle);
    if (!bundle.isSpecialOffer) {
        throw bundleErrors.cannotAssignUsersToNonSpecialOfferBundles();
    }

    return userIds.filter(removeUsersAlreadyInList(bundle.assignedUsers))
        .map((userIdToAssign, ii): BundleAssignedToUserEvent => {
            return {
                type: BundleEventType.ASSIGNED,
                id: bundle.id,
                version: bundle.version + ii + 1,
                payload: userIdToAssign,
            };
        });
};

function removeUsersAlreadyInList(assignments: number[]): (userId: number) => boolean {
    return (userId: number) => {
        for (const assigned of assignments) {
            if (assigned === userId) return false;
        }
        return true;
    };
}

export const unassignUsers = (bundle: Bundle, userIds: number[]): BundleUnassignedFromUserEvent[] => {
    preventUpdateOfArchivedBundle(bundle);
    preventUpdateOfExpiredBundle(bundle);
    if (!bundle.isSpecialOffer) {
        throw bundleErrors.cannotAssignUsersToNonSpecialOfferBundles();
    }

    return userIds.filter(removeUsersNotInList(bundle.assignedUsers))
        .map((userIdToAssign, ii): BundleUnassignedFromUserEvent => {
            return {
                type: BundleEventType.UNASSIGNED,
                id: bundle.id,
                version: bundle.version + ii,
                payload: userIdToAssign,
            };
        });
};

function removeUsersNotInList(assignments: number[]): (userId: number) => boolean {
    return (userId: number) => {
        for (const assigned of assignments) {
            if (assigned === userId) return true;
        }
        return false;
    };
}

export const archiveBundle = (bundle: Bundle): BundleArchivedEvent => {
    if (bundle.isArchived) {
        throw bundleErrors.bundleAlreadyArchived();
    }

    return {
        type: BundleEventType.ARCHIVED,
        id: bundle.id,
        version: bundle.version + 1,
    };
};

export const unarchiveBundle = (bundle: Bundle): BundleUnarchivedEvent => {
    if (!bundle.isArchived) {
        throw bundleErrors.bundleNotYetArchived();
    }

    return {
        type: BundleEventType.UNARCHIVED,
        id: bundle.id,
        version: bundle.version + 1,
    };
};

export const updateBundleDescription = (bundle: Bundle, description: string): BundleDescriptionChangeEvent => {
    preventUpdateOfArchivedBundle(bundle);
    preventUpdateOfExpiredBundle(bundle);

    // Arbitrary rules to demonstrate business rule enforcement.
    if (description.length < 5) {
        throw bundleErrors.descriptionMustBeMinimumLength();
    }
    if (description.length > 35) {
        throw bundleErrors.descriptionTooLong();
    }

    return {
        type: BundleEventType.DESCRIPTION_CHANGE,
        id: bundle.id,
        version: bundle.version + 1,
        payload: description,
    };
};

export const updateBundleTagline = (bundle: Bundle, tagline: string): BundleTaglineChangeEvent => {
    preventUpdateOfArchivedBundle(bundle);
    preventUpdateOfExpiredBundle(bundle);

    return {
        type: BundleEventType.TAGLINE_CHANGE,
        id: bundle.id,
        version: bundle.version + 1,
        payload: tagline,
    };
};

export const updateBundleStartTime = (bundle: Bundle, startTime: Date): BundleStartTimeChangeEvent => {
    preventUpdateOfArchivedBundle(bundle);
    preventUpdateOfExpiredBundle(bundle);

    // Ignoring the obvious issue with a 'now' option.
    if (startTime.valueOf() < Date.now().valueOf()) {
        throw bundleErrors.startTimeCannotBeInThePast();
    }

    if (startTime.valueOf() > bundle.expiryTime.valueOf()) {
        throw bundleErrors.startTimeMustBeBeforeExpiryTime();
    }

    return {
        type: BundleEventType.START_CHANGE,
        id: bundle.id,
        version: bundle.version + 1,
        payload: startTime,
    };
};

export const updateBundleExpiryTime = (bundle: Bundle, expiryTime: Date): BundleExpiryChangeEvent => {
    preventUpdateOfArchivedBundle(bundle);
    preventUpdateOfExpiredBundle(bundle);

    if (expiryTime.valueOf() < Date.now().valueOf()) {
        throw bundleErrors.expiryTimeCannotBeInThePast();
    }

    if (expiryTime.valueOf() < bundle.startTime.valueOf()) {
        throw bundleErrors.startTimeMustBeBeforeExpiryTime();
    }

    return {
        type: BundleEventType.EXPIRY_CHANGE,
        id: bundle.id,
        version: bundle.version + 1,
        payload: expiryTime,
    };
};