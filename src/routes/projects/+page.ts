import { pb } from "$lib/db/pocketbase";
import type { ProjectsResponseExtended } from "../../lib/db/pb-extended-types";
import type { PageLoad } from "./$types";

export const load = (async () => {
  const projects = await pb
    .collection<ProjectsResponseExtended>("projects")
    .getFullList({
      sort: "-date",
      expand: "skills,images",
    });
  return {
    projects,
  };
}) satisfies PageLoad;
