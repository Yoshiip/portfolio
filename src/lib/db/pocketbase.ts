import PocketBase from "pocketbase";
import type { TypedPocketBase } from "$db/pocketbase-types";

export const pb = new PocketBase(
  "https://pb-portfolio.aymeri.dev"
) as TypedPocketBase;
pb.autoCancellation(false);
