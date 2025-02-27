import type { ProjectsTypeOptions } from "$db/pocketbase-types";
import { pb } from "$lib/db/pocketbase";
import type { ProjectsResponseExtended } from "../../lib/db/pb-extended-types";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  let projects = await pb
    .collection<ProjectsResponseExtended>("projects")
    .getFullList({
      sort: "-date",
      expand: "skills,images",
      fetch,
    });

  return {
    projects,
  };
}) satisfies PageLoad;
