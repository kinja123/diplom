const token = '3H8D5PP-5SW4TY6-M85QX23-77PAZBK';
const routes = {
  getFilmsList: (category) => {
    fetch(`https://api.kinopoisk.dev/movie?token=${token}&search[]=movie&search[]=${category}&search[]=1990-2021&search[]=2-10&search[]=!null&search[]=!null&field[]=type&field[]=genres.name&field[]=year&field[]=rating.kp&field[]=name&field[]=votes.kp&limit=100&sortField[]=premiere.world&sortField[]=votes.kp&sortType[]=-1&sortType[]=-1`)
      .then((data) => data.json())
      .then(({ docs }) => {
        getRandomFilm(docs);
      });
  },
  getKinoPoiskLink: (id) => `https://kinopoisk.ru/film/${id}/`,
};

const select = document.getElementById('films');
const btn = document.getElementById('new-quote');
btn.addEventListener('click', () => {
  const { value } = select;
  routes.getFilmsList(value);
});

const getRandomFilm = (list) => {
  const min = 0;
  const max = list.length - 1;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomElement = list[randomNumber];
  render(randomElement);
};

const render = (data) => {
  console.log(data);
  const title = document.getElementById('Mtitle');
  title.textContent = data.name;
  const description = document.getElementById('text');
  description.textContent = data.description;
  const rating = document.getElementById('hod');
  rating.textContent = `${data.rating.kp} / 10`;
  const year = document.getElementById('year');
  year.textContent = data.year;
  const poster = document.getElementById('img1');
  poster.setAttribute('src', data.poster.previewUrl);
  const link = document.getElementById('movieLink');
  const needPath = routes.getKinoPoiskLink(data.id);
  link.setAttribute('href', needPath);
}