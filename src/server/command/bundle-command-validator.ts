import {
    BundleCommand,
    BundleCommandType,
    CreateBundleCommand,
    SetBundleArchiveStatusCommand,
    UpdateBundleBodyCommand,
    UpdateBundleExpiryCommand,
    UpdateBundleStartCommand,
} from './bundle-commands';
import { bundleErrors } from './bundle-command-errors';


export function validateCommand(request: any): BundleCommand {
    if (!('type' in request)) throw bundleErrors.unknownCommand();

    // Allows for exhaustive checking.
    const type: BundleCommandType = request.type;

    switch (type) {
        case BundleCommandType.CREATE: {
            return validateCreateCommand(request);
        }
        case BundleCommandType.SET_ARCHIVE: {
            return validateSetArchiveCommand(request);
        }
        case BundleCommandType.UPDATE_BODY: {
            return validateUpdateBodyCommand(request);
        }
        case BundleCommandType.UPDATE_START: {
            return validateUpdateStartCommand(request);
        }
        case BundleCommandType.UPDATE_EXPIRY: {
            return validateUpdateExpiryCommand(request);
        }
        default:
            const never: never = type;
            throw bundleErrors.unknownCommand();
    }
}

function validateCreateCommand(rawCommand: any): CreateBundleCommand {
    ensureHasPayload(rawCommand);
    return {
        type: BundleCommandType.CREATE,
        id: validateId(rawCommand.id),
        payload: {
            price: validateString(rawCommand.payload.price),
            sweeps: validateString(rawCommand.payload.sweeps),
            goldCoins: validateString(rawCommand.payload.goldCoins),
            isSpecialOffer: validateBoolean(rawCommand.payload.isSpecialOffer),
            isOneTimeOffer: validateBoolean(rawCommand.payload.isOneTimeOffer),
            description: validateString(rawCommand.payload.description),
            tagline: validateString(rawCommand.payload.tagline),
            startTime: validateDate(rawCommand.payload.startTime),
            expiryTime: validateDate(rawCommand.payload.expiryTime),
        },
    };
}

function validateSetArchiveCommand(rawCommand: any): SetBundleArchiveStatusCommand {
    return {
        type: BundleCommandType.SET_ARCHIVE,
        id: validateId(rawCommand.id),
        payload: validateBoolean(rawCommand.payload),
    };
}

function validateUpdateBodyCommand(rawCommand: any): UpdateBundleBodyCommand {
    ensureHasPayload(rawCommand);
    return {
        type: BundleCommandType.UPDATE_BODY,
        id: validateId(rawCommand.id),
        payload: {
            description: validateString(rawCommand.payload.description),
            tagline: validateString(rawCommand.payload.tagline),
        },
    };
}

function validateUpdateStartCommand(rawCommand: any): UpdateBundleStartCommand {
    return {
        type: BundleCommandType.UPDATE_START,
        id: validateId(rawCommand.id),
        payload: validateDate(rawCommand.payload),
    };
}

function validateUpdateExpiryCommand(rawCommand: any): UpdateBundleExpiryCommand {
    return {
        type: BundleCommandType.UPDATE_EXPIRY,
        id: validateId(rawCommand.id),
        payload: validateDate(rawCommand.payload),
    };
}

function ensureHasPayload(command: any): void {
    if (command.payload == null) {
        throw bundleErrors.malformedCommand();
    }
}

function validateId(id: any): string {
    if (typeof id !== 'string' || id.length <= 5) {
        throw bundleErrors.malformedCommand();
    }
    return id;
}

function validateBoolean(boolean: any): boolean {
    if (typeof boolean !== 'boolean') {
        throw bundleErrors.malformedCommand();
    }
    return boolean;
}

function validateString(string: any): string {
    if (typeof string !== 'string') {
        throw bundleErrors.malformedCommand();
    }
    return string;
}

function validateDate(rawDate: any): Date {
    const date = new Date(rawDate);

    if (isNaN(date.valueOf())) {
        throw bundleErrors.malformedCommand();
    }

    return date;
}