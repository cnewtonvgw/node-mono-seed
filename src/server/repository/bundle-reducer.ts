import { BundleEvent, BundleEventType } from '../event/bundle-events';
import { Bundle } from '../domain/bundle';


export const bundleReducer = (events: BundleEvent | BundleEvent[], initialState?: Bundle): Bundle => {
    let bundle: Bundle = { ...initialState } as any;
    bundle.assignedUsers = (bundle.assignedUsers || []).slice(0);

    events = Array.isArray(events) ? events : [events];

    for (const event of events) {
        switch (event.type) {
            case BundleEventType.CREATED: {
                bundle = {
                    ...event.payload,
                    id: event.id,
                    isArchived: false,
                    assignedUsers: [],
                    version: 1,
                };
                break;
            }
            case BundleEventType.ARCHIVED: {
                bundle.isArchived = true;
                break;
            }
            case BundleEventType.UNARCHIVED: {
                bundle.isArchived = false;
                break;
            }
            case BundleEventType.ASSIGNED: {
                bundle.assignedUsers.push(event.payload);
                break;
            }
            case BundleEventType.UNASSIGNED: {
                bundle.assignedUsers.splice(bundle.assignedUsers.indexOf(event.payload), 1);
                break;
            }
            case BundleEventType.DESCRIPTION_CHANGE: {
                bundle.description = event.payload;
                break;
            }
            case BundleEventType.TAGLINE_CHANGE: {
                bundle.tagline = event.payload;
                break;
            }
            case BundleEventType.EXPIRY_CHANGE: {
                bundle.expiryTime = event.payload;
                break;
            }
            case BundleEventType.START_CHANGE: {
                bundle.startTime = event.payload;
                break;
            }
            default:
                const never: never = event;
        }
        bundle.version = event.version;
    }
    return bundle;
};