export const bundleErrors = {
    unknownCommand: () => {
        return new Error('Unknown command type');
    },
    malformedCommand: () => {
        return new Error('Invalid command structure');
    },
    commandConflicts: () => {
        return new Error('Command conflicts');
    },
    aggregateNotFound: () => {
        return new Error('Aggregate not found');
    },
};

