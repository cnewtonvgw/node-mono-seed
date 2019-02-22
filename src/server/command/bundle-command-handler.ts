import { BundleCommand, BundleCommandType } from './bundle-commands';
import { BundleRepository } from '../repository/bundle-repository';
import { bundleErrors } from './bundle-command-errors';
import {
    archiveBundle,
    assignUsers,
    createBundle,
    unarchiveBundle,
    updateBundleDescription,
    updateBundleExpiryTime,
    updateBundleStartTime,
    updateBundleTagline,
} from '../domain/bundle';
import { bundleReducer } from '../repository/bundle-reducer';


export async function handleBundleCommand(command: BundleCommand): Promise<void> {

    switch (command.type) {
        case BundleCommandType.CREATE: {
            const existing = await BundleRepository.getById(command.id);
            if (existing) {
                throw bundleErrors.commandConflicts();
            } else {
                // Got lazy with types here, this could/should belong in the domain.
                const event = createBundle({
                    ...command.payload,
                    id: command.id,
                    isArchived: false,
                    assignedUsers: [],
                    version: 1,
                });
                return BundleRepository.save(event);
            }
        }
        case BundleCommandType.SET_ARCHIVE: {
            const bundle = await BundleRepository.getById(command.id);
            if (!bundle) {
                throw bundleErrors.aggregateNotFound();
            } else {
                const event = command.payload ? archiveBundle(bundle) : unarchiveBundle(bundle);
                return BundleRepository.save(event);
            }
        }
        case BundleCommandType.UPDATE_BODY: {
            let bundle = await BundleRepository.getById(command.id);
            if (!bundle) {
                throw bundleErrors.aggregateNotFound();
            } else {
                // This was a mistake.
                const updateDescription = updateBundleDescription(bundle, command.payload.description);
                await BundleRepository.save(updateDescription);

                bundle = bundleReducer(updateDescription, bundle);
                const updateTagline = updateBundleTagline(bundle, command.payload.tagline);
                return BundleRepository.save(updateTagline);
            }
        }
        case BundleCommandType.UPDATE_START: {
            const bundle = await BundleRepository.getById(command.id);
            if (!bundle) {
                throw bundleErrors.aggregateNotFound();
            } else {
                const event = updateBundleStartTime(bundle, command.payload);
                return BundleRepository.save(event);
            }
        }
        case BundleCommandType.UPDATE_EXPIRY: {
            const bundle = await BundleRepository.getById(command.id);
            if (!bundle) {
                throw bundleErrors.aggregateNotFound();
            } else {
                const event = updateBundleExpiryTime(bundle, command.payload);
                return BundleRepository.save(event);
            }
        }
        case BundleCommandType.ASSIGN_USERS: {
            const bundle = await BundleRepository.getById(command.id);
            if (!bundle) {
                throw bundleErrors.aggregateNotFound();
            } else {
                const events = assignUsers(bundle, command.payload);
                await Promise.all(events.map(evt => BundleRepository.save(evt)));
                return;
            }
        }
        default:
            const never: never = command;
    }
}