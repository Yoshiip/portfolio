/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Images = "images",
	Projects = "projects",
	Skills = "skills",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ImagesRecord = {
	alt?: string
	image: string
}

export enum ProjectsTypeOptions {
	"website" = "website",
	"jam" = "jam",
	"game" = "game",
	"other" = "other",
}
export type ProjectsRecord = {
	date?: IsoDateString
	description?: HTMLString
	images?: RecordIdString[]
	name: string
	skills?: RecordIdString[]
	type?: ProjectsTypeOptions
	url?: string
	git_url?: string
	logo?: string
}

export enum SkillsTypeOptions {
	"language" = "language",
	"software" = "software",
	"tool" = "tool",
	"gameEngine" = "gameEngine",
	"api" = "api",
	"framework" = "framework",
	"os" = "os",
	"database" = "database",
	"other" = "other",
}
export type SkillsRecord = {
	description?: HTMLString
	image?: string
	master?: boolean
	hidden?: boolean
	name?: string
	type?: SkillsTypeOptions
}

export type UsersRecord = never

// Response types include system fields and match responses from the PocketBase API
export type ImagesResponse<Texpand = unknown> = Required<ImagesRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand & { skills?: SkillsResponse[], images?: ImagesResponse[] }>
export type SkillsResponse<Texpand = unknown> = Required<SkillsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	images: ImagesRecord
	projects: ProjectsRecord
	skills: SkillsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	images: ImagesResponse
	projects: ProjectsResponse
	skills: SkillsResponse
	users: UsersResponse
}

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'images'): RecordService<ImagesResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'skills'): RecordService<SkillsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
