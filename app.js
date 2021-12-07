const showImage = document.querySelector('#show-image');
const showName = document.querySelector('#show-title');
const showSummary = document.querySelector('#show-summary');
const showGenre = document.querySelector('#show-genre');
const showLink = document.querySelector('#show-link');
const list = document.querySelector('#searchResult');

const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (event) {
	event.preventDefault();
	//* Clear previous list on search
	list.innerHTML = '';
	//* Clear show details on search
	showDetails.style.opacity = '0';

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

			list.append(img);

			list.addEventListener('click', selectShow);
		}
	}
};

const selectShow = (e) => {
	//* Change opacity of showDetails to 1
	const showDetails = (document.querySelector('#showDetails').style.opacity =
		'1');
	//* Get the details of the show
	const show = e.target.details;
	console.log(show);

	showImage.setAttribute('src', show.image.medium);
	showName.textContent = show.name;
	showSummary.innerHTML = show.summary;
	showGenre.innerHTML = `${show.genres.join(' | ')}`;
	showLink.setAttribute('href', show.url);
};
