if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('serviceWorker.js')
		.then((registration) => {
			console.log('SW register');
			console.log(registration);
		})
		.catch((error) => {
			console.log('sw failed');
			console.log(error);
		});
}
