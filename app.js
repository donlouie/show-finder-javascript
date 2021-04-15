const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  console.log(config);
  const res = await axios.get('http://api.tvmaze.com/search/shows?q=', config);
  makeImages(res.data);
  form.elements.query.value = '';
});

const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement('IMG');
      img.src = result.show.image.medium;

      const list = document.querySelector('#searchResult');
      list.append(img);
    }
  }
};
