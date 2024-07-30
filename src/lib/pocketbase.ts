import PocketBase, { RecordService } from 'pocketbase';

import { writable } from 'svelte/store';
import type { TypedPocketBase } from '../types/pocketbase-types';

export const pb = new PocketBase("https://pb.aymeri.dev") as TypedPocketBase;

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    currentUser.set(pb.authStore.model);
})