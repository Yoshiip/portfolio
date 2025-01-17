import type {
  ImagesResponse,
  ProjectsResponse,
  SkillsResponse,
} from "$db/pocketbase-types";

export type ProjectsResponseExtended = {
  expand: {
    images: ImagesResponse[];
    skills: SkillsResponse[];
  };
} & ProjectsResponse;
