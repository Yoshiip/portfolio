export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/index.css","css/modal.css","css/navbar.css","css/projects.css","css/style.css","favicon.png","images/about_me/de_vinci.png","images/about_me/logo.png","images/about_me/wallpaper.jpg","images/about_me.png","images/headers/about_me.png","images/headers/about_me_banner.png","images/home/background.jpg","images/home/copyright.png","images/home/name.png","images/home/yoshiip.jpg","images/icons/github.png","images/icons/github_black.png","images/icons/godot.svg","images/icons/java.svg","images/icons/javascript.png","images/icons/python.svg","images/icons/right-arrow.png","images/icons/svelte.svg","images/icons/unity.png","images/icons/video_game.png","images/projects/fall_em_down/0.png","images/projects/fall_em_down/1.png","images/projects/fall_em_down/2.png","images/projects/fall_em_down/logo.png","images/projects/kahorn/0.png","images/projects/kahorn/1.png","images/projects/kahorn/2.png","images/projects/kahorn/logo.png","images/projects/lavarun/0.png","images/projects/lavarun/1.png","images/projects/little_reactor/0.png","images/projects/little_reactor/1.png","images/projects/little_reactor/2.png","images/projects/little_reactor/logo.png","images/projects/niptur/0.png","images/projects/niptur/1.png","images/projects/niptur/2.png","images/projects/niptur/logo.png","images/projects/niptur.png","images/projects/ultimate_hangman/0.png","images/projects/ultimate_hangman/1.png","images/projects/ultimate_hangman/2.png","images/projects/ultimate_hangman/logo.png","images/projects/yoshtimer/0.png","images/projects/yoshtimer/1.jpg","images/projects.png","images/project_box.png","images/work/projects_logo.png","images/work/wallpaper.jpg"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-b7897a64.js","imports":["_app/immutable/start-b7897a64.js","_app/immutable/chunks/index-88370bf9.js","_app/immutable/chunks/singletons-9145bd65.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/credits",
				pattern: /^\/credits\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
