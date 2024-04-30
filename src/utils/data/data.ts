import { faBolt, faHouse, faFilm, faTv, faNewspaper, faStar, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

  export const menuItemsData = [
    {id: 1, title: 'Главная', url: '/', icon: faHouse},
    {id: 2, title: 'Фильмы', url: '/movies', icon: faFilm},
    {id: 3, title: 'Новинки', url: '/new', icon: faBolt },
    {id: 4, title: 'Журнал', url: '/journal', icon: faNewspaper},
    {id: 5, title: 'TV', url: '/tv', icon: faTv},
    {id: 6, title: 'Наш выбор', url: '/our', icon:faStar},
  ];

  export const profileMenuData = [
    {id: 1, title: 'Профиль', url: '/profile', icon: faUser},
    {id: 2, title: 'Избранное', url: '', icon: faStar},
    {id: 3, title: 'Админ-панель', url: '/admin', icon: faLock},
  ];
  export const ratingRangeData = [
    {id: 1, title: 'меньше 7', value: '6'},
    {id: 2, title: 'больше 7', value: '7'},
    {id: 3, title: 'больше 8', value: '8'},
  ];
  export const yearMovieRageData = [
    {id: 1, title: '2024', value: '2024'},
    {id: 2, title: '2023', value: '2023'},
    {id: 3, title: '2022', value: '2022'},
    {id: 4, title: '2021', value: '2021'},
    {id: 5, title: '2020', value: '2020'},
    {id: 6, title: '2019', value: '2019'},
    {id: 7, title: '2018', value: '2018'},
    {id: 8, title: '2017', value: '2017'},
    {id: 9, title: '2016', value: '2016'},
    {id: 10, title: '2015', value: '2015'},
    {id: 11, title: '2014', value: '2014'},
    {id: 12, title: '2013', value: '2013'},
    {id: 13, title: '2012', value: '2012'},
    {id: 14, title: '2011', value: '2011'},
    {id: 15, title: '2000-2010', value: '9'},
    {id: 16, title: '1990-2000', value: '10'},
    {id: 17, title: '1980-1990', value: '90'},
    {id: 18, title: '1970-1980', value: '80'},
    {id: 19, title: '1960-1970', value: '70'},
    {id: 20, title: 'до 1960', value: '60'},
  ];

  export const footerMenu1 = [
    {id: 1, title: 'Регистрация и оплата', url: '#'},
    {id: 2, title: 'Политика приватности', url: '#'},
    {id: 3, title: 'Пользовательское соглашение', url: '/#'},
    {id: 4, title: 'Сообщить об ошибке', url: '/#'},
    {id: 5, title: 'Вопросы и ответы', url: '/#'},
    {id: 6, title: 'Служба поддержки', url: '/#'},
  ];
  export const footerMenu2 = [
    {id: 1, title: 'О нас', url: '#'},
    {id: 2, title: 'Контакты', url: '#'},
    {id: 3, title: 'Партнерам', url: '/#'},
    {id: 4, title: 'Размещение рекламы', url: '/#'},
    {id: 5, title: 'Акции', url: '/#'},
    {id: 6, title: 'Сертификаты', url: '/#'},
  ];

  export const ageItemsData = [
    {id: 1, age: '0+'},
    {id: 2, age: '6+'},
    {id: 3, age: '12+'},
    {id: 4, age: '16+'},
    {id: 6, age: '18+'},
  ];
  export const genderItemsData = [
    {id: 1, name: 'мужчина', value: 'male'},
    {id: 2, name: 'женщина', value: 'female'},
  ];
  export const categoryMovies = [
    {id: 1, name: 'Боевики', value: 'action' },
    {id: 2, name: 'Детективы', value: 'detective' },
    {id: 3, name: 'Военные', value: 'military' },
    {id: 4, name: 'Детские', value: 'children' },
    {id: 5, name: 'Для всей семьи', value: 'family' },
    {id: 6, name: 'Драмы', value: 'drama' },
    {id: 7, name: 'Исторические', value: 'history' },
    {id: 8, name: 'Комедии', value: 'comedy' },
    {id: 9, name: 'Мелодрамы', value: 'melodrama' },
    {id: 10, name: 'Приключения', value: 'adventures' },
    {id: 11, name: 'Триллеры', value: 'thriller' },
    {id: 12, name: 'Ужасы', value: 'horror' },
    {id: 13, name: 'Фантастика', value: 'fantastic' },
    {id: 14, name: 'Фэнтэзи', value: 'fantasy' },
]
export const yearMedia = [{"id":1,"year":1923},{"id":2,"year":1924},{"id":3,"year":1925},
{"id":4,"year":1926},{"id":5,"year":1927},{"id":6,"year":1928},{"id":7,"year":1929},
{"id":8,"year":1930},{"id":9,"year":1931},{"id":10,"year":1932},{"id":11,"year":1933},
{"id":12,"year":1934},{"id":13,"year":1935},{"id":14,"year":1936},{"id":15,"year":1937},
{"id":16,"year":1938},{"id":17,"year":1939},{"id":18,"year":1940},{"id":19,"year":1941},
{"id":20,"year":1942},{"id":21,"year":1943},{"id":22,"year":1944},{"id":23,"year":1945},
{"id":24,"year":1946},{"id":25,"year":1947},{"id":26,"year":1948},{"id":27,"year":1949},
{"id":28,"year":1950},{"id":29,"year":1951},{"id":30,"year":1952},{"id":31,"year":1953},
{"id":32,"year":1954},{"id":33,"year":1955},{"id":34,"year":1956},{"id":35,"year":1957},
{"id":36,"year":1958},{"id":37,"year":1959},{"id":38,"year":1960},{"id":39,"year":1961},
{"id":40,"year":1962},{"id":41,"year":1963},{"id":42,"year":1964},{"id":43,"year":1965},
{"id":44,"year":1966},{"id":45,"year":1967},{"id":46,"year":1968},{"id":47,"year":1969},
{"id":48,"year":1970},{"id":49,"year":1971},{"id":50,"year":1972},{"id":51,"year":1973},
{"id":52,"year":1974},{"id":53,"year":1975},{"id":54,"year":1976},{"id":55,"year":1977},
{"id":56,"year":1978},{"id":57,"year":1979},{"id":58,"year":1980},{"id":59,"year":1981},
{"id":60,"year":1982},{"id":61,"year":1983},{"id":62,"year":1984},{"id":63,"year":1985},
{"id":64,"year":1986},{"id":65,"year":1987},{"id":66,"year":1988},{"id":67,"year":1989},
{"id":68,"year":1990},{"id":69,"year":1991},{"id":70,"year":1992},{"id":71,"year":1993},
{"id":72,"year":1994},{"id":73,"year":1995},{"id":74,"year":1996},{"id":75,"year":1997},
{"id":76,"year":1998},{"id":77,"year":1999},{"id":78,"year":2000},{"id":79,"year":2001},
{"id":80,"year":2002},{"id":81,"year":2003},{"id":82,"year":2004},{"id":83,"year":2005},
{"id":84,"year":2006},{"id":85,"year":2007},{"id":86,"year":2008},{"id":87,"year":2009},
{"id":88,"year":2010},{"id":89,"year":2011},{"id":90,"year":2012},{"id":91,"year":2013},
{"id":92,"year":2014},{"id":93,"year":2015},{"id":94,"year":2016},{"id":95,"year":2017},
{"id":96,"year":2018},{"id":97,"year":2019},{"id":98,"year":2020},{"id":99,"year":2021},
{"id":100,"year":2022},{"id":101,"year":2023},{"id":102,"year":2024},{"id":103,"year":2025},
{"id":104,"year":2026},{"id":105,"year":2027},{"id":106,"year":2028},{"id":107,"year":2029},
{"id":108,"year":2030},{"id":109,"year":2031},{"id":110,"year":2032},{"id":111,"year":2033},
{"id":112,"year":2034},{"id":113,"year":2035},{"id":114,"year":2036},{"id":115,"year":2037},
{"id":116,"year":2038},{"id":117,"year":2039}]


export const ratingMovie = [
  {id: 1, value: 1 },
  {id: 2, value: 2 },
  {id: 3, value: 3 },
  {id: 4, value: 4 },
  {id: 5, value: 5 },
  {id: 6, value: 6 },
  {id: 7, value: 7 },
  {id: 8, value: 8 },
  {id: 9, value: 9 },
  {id: 10, value: 10 },
]
export const pageTitles = {
  'movies': 'Фильмы', 
  'actors': 'Актеры',
  'profile': 'Профиль',
  'admin': 'Админ панель',
  'add-movie': 'Добавить фильм',
  'add-actor': 'Добавить актера',
  'edit-slider': 'Слайдер',
  '404': 'Страница не найдена',
}