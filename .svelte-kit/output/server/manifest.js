export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/modal.css","css/projects.css","css/style.css","favicon.png","images/home/background.png","images/home/project_button_background.png","images/home/side.svg","images/home/tourneur_aymeri.svg","images/home/yoshi_noir.png","images/icons/close.svg","images/icons/github.png","images/icons/github_black.png","images/icons/godot.svg","images/icons/itchio.svg","images/icons/java.svg","images/icons/javascript.png","images/icons/mail.svg","images/icons/open.svg","images/icons/python.svg","images/icons/right-arrow.png","images/icons/star.svg","images/icons/svelte.svg","images/icons/unity.png","images/icons/video_game.png","images/projects/background.png","images/projects/fall_em_down/0.png","images/projects/fall_em_down/1.png","images/projects/fall_em_down/2.png","images/projects/fall_em_down/logo.png","images/projects/header_background.png","images/projects/ilyva/0.jpg","images/projects/ilyva/1.jpg","images/projects/ilyva/2.jpg","images/projects/ilyva/ilyva.mp4","images/projects/ilyva/logo.png","images/projects/kahorn/0.png","images/projects/kahorn/1.png","images/projects/kahorn/2.png","images/projects/kahorn/logo.png","images/projects/lavarun/0.png","images/projects/lavarun/1.png","images/projects/little_reactor/0.png","images/projects/little_reactor/1.png","images/projects/little_reactor/2.png","images/projects/little_reactor/logo.png","images/projects/mecharia/0.png","images/projects/mecharia/logo.png","images/projects/niptur/0.png","images/projects/niptur/1.png","images/projects/niptur/2.png","images/projects/niptur/logo.png","images/projects/niptur.png","images/projects/portfolio/0.png","images/projects/ultimate_hangman/0.png","images/projects/ultimate_hangman/1.png","images/projects/ultimate_hangman/2.png","images/projects/ultimate_hangman/logo.png","images/projects/yoshtimer/0.png","images/projects/yoshtimer/1.jpg"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg",".mp4":"video/mp4"},
	_: {
		client: {"start":"_app/immutable/entry/start.7ffc114d.js","app":"_app/immutable/entry/app.1c5e750e.js","imports":["_app/immutable/entry/start.7ffc114d.js","_app/immutable/chunks/index.c46ace97.js","_app/immutable/chunks/singletons.a4661b5d.js","_app/immutable/entry/app.1c5e750e.js","_app/immutable/chunks/index.c46ace97.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
