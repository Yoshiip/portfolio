import { pb } from '$lib/pocketbase';
import type { ProjectsResponse } from '../../types/pocketbase-types';
import type { PageLoad } from './$types';

export const load = (async () => {
    const projects = (await pb.collection("projects").getFullList({
        sort: "-date",
        expand: "skills,images",
    })) as ProjectsResponse[];
    return {
        projects
    }
}) satisfies PageLoad;