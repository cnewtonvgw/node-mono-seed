export const bundleErrors = {
    cannotAssignUsersToNonSpecialOfferBundles: () => {
        return new Error('Cannot assign users to bundles that are not marked as "Special Offers".');
    },
    bundleAlreadyArchived: () => {
        return new Error('Cannot archive bundle, already archived.');
    },
    bundleNotYetArchived: () => {
        return new Error('Cannot un-archive bundle, not yet archived.');
    },
    cannotUpdateArchivedBundle: () => {
        return new Error('Cannot update bundles that are archived.');
    },
    cannotUpdateExpiredBundle: () => {
        return new Error('Cannot update bundles that have expired.');
    },
    descriptionMustBeMinimumLength: () => {
        return new Error('Description must be at least 5 characters long.');
    },
    descriptionTooLong: () => {
        return new Error('Description cannot exceed 35 characters long.');
    },
    startTimeCannotBeInThePast: () => {
        return new Error('Bundle start time must be in the future.');
    },
    startTimeMustBeBeforeExpiryTime: () => {
        return new Error('Bundle start time must be before expiry time.');
    },
    expiryTimeCannotBeInThePast: () => {
        return new Error('Bundle expiry time must be in the future.');
    },
    currencyValuesCannotBeNegative: () => {
        return new Error('Curreny values cannot be negative (price, sweeps, gold coins).');
    },
    onetimeOfferMustAlsoBeSpecialOffer: () => {
        return new Error('A one-time bundle must also be a special offer.');
    },
};