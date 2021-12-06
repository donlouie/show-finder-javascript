const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (event) {
	event.preventDefault();
	const searchTerm = form.elements.query.value;
	const config = { params: { q: searchTerm } };
	console.log(config);
	const res = await axios.get(
		'http://api.tvmaze.com/search/shows?q=',
		config
	);
	makeImages(res.data);
	form.elements.query.value = '';
});

const makeImages = (shows) => {
	for (let result of shows) {
		console.log(result);
		//* Display the image of the show and fetch its details
		if (result.show.image) {
			const img = document.createElement('IMG');
			img.src = result.show.image.medium;
			img.details = result.show;

			const list = document.querySelector('#searchResult');
			list.append(img);

			list.addEventListener('click', selectShow);
		}
	}
};

const selectShow = (e) => {
	const show = e.target.details;

	console.log(show.name);
};
