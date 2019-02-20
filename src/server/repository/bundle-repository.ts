import { BundleEvent, BundleEventType } from '../event/bundle-events';
import { Bundle } from '../domain/bundle';
import { bundleReducer } from './bundle-reducer';


const eventStore: BundleEvent[] = [
    {
        id: 'TOTALLY-UNIQUE-GUID-1',
        version: 1,
        type: BundleEventType.CREATED,
        payload: {
            description: 'Seed bundle 1',
            tagline: 'Seeded!',
            expiryTime: new Date('2020/01/01'),
            startTime: new Date('2019/01/01'),
            goldCoins: '1000',
            price: '10.00',
            sweeps: '10.00',
            isSpecialOffer: false,
            isOneTimeOffer: false,
            assignedUsers: [],
        },
    },
    {
        id: 'TOTALLY-UNIQUE-GUID-2',
        version: 1,
        type: BundleEventType.CREATED,
        payload: {
            description: 'Seed bundle 2',
            tagline: 'Seeded!',
            expiryTime: new Date('2020/01/01'),
            startTime: new Date('2019/01/01'),
            goldCoins: '2200',
            price: '20.00',
            sweeps: '20.00',
            isSpecialOffer: false,
            isOneTimeOffer: false,
            assignedUsers: [],
        },
    },
    {
        id: 'TOTALLY-UNIQUE-GUID-3',
        version: 1,
        type: BundleEventType.CREATED,
        payload: {
            description: 'Seed bundle 3',
            tagline: 'Seeded!',
            expiryTime: new Date('2020/01/01'),
            startTime: new Date('2019/01/01'),
            goldCoins: '3600',
            price: '30.00',
            sweeps: '30.00',
            isSpecialOffer: false,
            isOneTimeOffer: false,
            assignedUsers: [],
        },
    },
];


export const BundleRepository = {
    getEvents: () => {
        return new Promise(res => {
            setTimeout(() => {
                res(eventStore);
            }, 150);
        });
    },
    getAll: () => {
        const unique = eventStore.filter(ev => ev.type === BundleEventType.CREATED).map(ev => ev.id);
        return Promise.all(unique.map(BundleRepository.getById));
    },
    getById: async (id: string): Promise<Bundle | undefined> => {
        return new Promise(res => {
            setTimeout(() => {
                const eventsForId = eventStore.filter(evt => evt.id === id);

                if (eventsForId.length === 0) res();

                res(bundleReducer(eventsForId));
            }, 50);
        });
    },

    save: async (event: BundleEvent): Promise<void> => {
        return new Promise(res => {
            setTimeout(() => {
                const currentVersion = getCurrentVersion(event.id);
                if (event.version !== currentVersion + 1) {
                    throw new Error('409 conflict');
                } else {
                    eventStore.push(event);
                    res();
                }
            }, 25);
        });
    },
};

function getCurrentVersion(id: string): number {
    const eventsForId = eventStore.filter(evt => evt.id === id);
    if (eventsForId.length === 0) return 0;
    return eventsForId[eventsForId.length - 1].version;
}