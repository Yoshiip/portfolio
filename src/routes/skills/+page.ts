import { pb } from '$lib/pocketbase';
import type { SkillsResponse } from '../../types/pocketbase-types';
import type { PageLoad } from './$types';

export const load = (async () => {
    const skills = (await pb.collection("skills").getFullList({
        sort: "-master"
    })) as SkillsResponse[];
    return {
        skills
    }
}) satisfies PageLoad;