import HowToLearn from '../images/__projects/images__projects_learn.png';
import RussianTravel from '../images/__projects/images__projects_russian-travel_02.png';
import MoviesExplorer from '../images/__projects/images__projects_movies_explorer.png';
import MestoReact from '../images/__projects/images__projects_mesto-react.png';

const portfolio = {
    ru: [
        {
            order: '11',
            link: 'https://movies-explorer.fmkrom.com/login',
            image: MoviesExplorer,
            name: 'Movies Explorer',
            techs: 'HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB',
            type: 'Информационный сайт',
            githubFrontend: 'https://github.com/fmkrom/movies-explorer-frontend',
            githubBackend: 'https://github.com/fmkrom/movies-explorer-api',
            gotBackend: true,
            description: 'Информационный сайт на основе базы данных кинофестиваля Beat Film',
            features: [
                'Фронтенд сделан на React.js',
                'Адаптивная верстка на CSS3 с применением технологий flex- и grid-контейнеров для корректного отображения на различных устройствах, включая планшеты и мобильные (диапазон от 320px до 1280px)',
                'На фронтенде применяется функциональный подход, активно используются React-хуки. Реализована функций поиска фильмов по названиям',
                'Основные маршруты защищены авторизацией с использованием контекста пользователя (Context.Provider)',
                'Есть возможность редактирования данных профиля пользователя с сохранением этих данных на бэкенде. Бэкенд написан на Node.js с использованием Express.js и Mongo DB',
                'Настроен механизм получения данных со стороннего API и сохранения их на бэкенде сайта',
                'На бэкенде также реализованы функции регистрации и авторизации пользователя с сохранением jwt в LocalStorage браузера',
                'Валидация форм реализована при помощи кастомного React-хука. Выполнен деплой бэкенда на удаленную виртуальную машину',
            ]
        },
        {
            order: '12',
            link: 'https://mesto.fmkrom.com',
            image: MestoReact,
            name: 'Mesto на React.js',
            techs: 'HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB',
            type: 'Социальная сеть',
            githubFrontend: 'https://github.com/fmkrom/react-mesto-api-full/tree/main/frontend',
            githubBackend: 'https://github.com/fmkrom/react-mesto-api-full/tree/main/backend',
            gotBackend: true,
            description: 'Социальная сеть для загрузки изображений со сторонних серверов (Unsplash, ShutterStock и т.д.)',
            features: [
                'Фронтенд сделан на React.js',
                'Адаптивная верстка на CSS3 с применением технологий flex- и grid-контейнеров для корректного отображения на различных устройствах, включая планшеты и мобильные (диапазон от 320px до 1280px)',
                'На фронтенде применяется функциональный подход, активно используются React-хуки',
                'Реализованы функции добавления новых карточек с изображениями, лайка карточек и удаления карточек',
                'Реализован функционал модальных окон',
                'Основные маршруты защищены авторизацией с использованием контекста пользователя (Context.Provider)',
                'Есть возможность редактирования данных профиля пользователя с сохранением этих данных на бэкенде',
                'Бэкенд написан на Node.js с использованием Express.js и Mongo DB',
                'На бэкенде также реализованы функции регистрации и авторизации пользователя с сохранением jwt в LocalStorage браузера',
                'Выполнен деплой бэкенда на удаленную виртуальную машину'
            ]
        },
        {
            order: '13',
            image: RussianTravel,
            link: 'https://fmkrom.github.io/russian-travel/index.html',
            name: 'Путешествия по России',
            techs: 'HTML, CSS, Адаптивная верстка',
            type: 'Динамичный лэндинг',
            githubFrontend: 'https://github.com/fmkrom/russian-travel',
            gotBackend: false,
            description: 'Типовый одностраничный лэндинг с настроенными интерактивными элементами, но без анимации. Может использоваться как сайт-визитка, предсотавляющий пользователю ссылки на полезные ресурсы',
            features: [
                'Используемые технологии: HTML, CSS (включая grid и flex)',
                'Используется адаптивная верстка для корректного отображения на экранах различной ширины в диапазоне от 320px до 1280px',
            ]
        },
        {
            order: '14',
            image: HowToLearn,
            link: 'http://www.fmkrom.com/projects/how-to-learn/index.html',
            name: 'Научиться учиться',
            techs: 'HTML, CSS',
            type: 'Статичный лэндинг',
            gotBackend: false,
            description: 'Типовый одностраничный лэндинг с настроенной анимацией. Может использоваться как сайт-визитка, предсотавляющий пользователю ссылки на полезные ресурсы.',
            features: [
                'Используемые технологии: HTML & CSS', 
                'Анимацию на СSS, кейфреймы',
            ]
        },
    ],
    en: [
        {
            order: '21',
            link: 'https://movies-explorer.fmkrom.com/login',
            image: MoviesExplorer,
            name: 'Movies Explorer',
            techs: 'HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB',
            type: 'Info Website',
            githubFrontend: 'https://github.com/fmkrom/movies-explorer-frontend',
            githubBackend: 'https://github.com/fmkrom/movies-explorer-api',
            gotBackend: true,
            description: 'An info website based on Beat Film Festival database',
            features: [
                'Frontend built using React.js',
                'Fully responsive web design on CSS3 for screen widths ranging from 320px to 1280px using flexbox and grid containers',
                'Frontend uses functional programming based on React-hooks',
                'Search function implemented',
                'Authenticated routes implemented using Context.Provider',
                'User profile can be edited with data saved on the backend',
                'Frontend built using Node.js with Express.js and MongoDB',
                'Data received from external API can be saved on website backend',
                'Registration and login functions implemented with jwt saved in browser LocalStorage',
                'Form validation implemented using a custom React-hook',
                'Backend fully prepared and deployed on a server',
            ]
        },
        {
            order: '22',
            link: 'https://mesto.fmkrom.com',
            image: MestoReact,
            name: 'Mesto on React.js',
            techs: 'HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB',
            type: 'Social Network',
            githubFrontend: 'https://github.com/fmkrom/react-mesto-api-full/tree/main/frontend',
            githubBackend: 'https://github.com/fmkrom/react-mesto-api-full/tree/main/backend',
            gotBackend: true,
            description: 'A social network for uploading images from external servers (Unsplash, ShutterStock, etc)',
            features: [
                'Frontend built using React.js', 
                'Fully responsive web design on CSS3 for screen widths ranging from 320px to 1280px using flexbox and grid containers', 
                'Frontend uses functional programming based on React-hooks',
                'Functions of uploading a new image card, liking card and deleting card implemented',
                'Modal windows implemented',
                'Authenticated routes implemented using Context.Provider',
                'User profile can be edited with data saved on the backend',
                'Frontend built using Node.js with Express.js and MongoDB',
                'Data received from external API can be saved on website backend',
                'Registration and login functions implemented with jwt saved in browser LocalStorage',
                'Form validation implemented using a custom React-hook',
                'Backend fully prepared and deployed on a server'
            ]
        },
        {
            order: '23',
            image: RussianTravel,
            link: 'https://fmkrom.github.io/russian-travel/index.html',
            name: 'Russian Travel',
            techs: 'HTML, CSS, Responsive Web Design',
            type: 'Dynamic Web Page',
            githubFrontend: 'https://github.com/fmkrom/russian-travel',
            gotBackend: false,
            description: 'A responsive landing page with no animation',
            features: [
                    'Fully responsive web design on CSS3 for screen widths ranging from 320px to 1280px using flexbox and grid containers' 
                ]
        },
        {
            order: '24',
            image: HowToLearn,
            link: 'http://www.fmkrom.com/projects/how-to-learn/index.html',
            name: 'How to Learn',
            techs: 'HTML, CSS',
            type: 'Static Web Page',
            gotBackend: false,
            description: 'A static landing page with no animation',
            features: [
                'Fully responsive web design on CSS3 for screen widths ranging from 320px to 1280px using flexbox and grid containers' 
            ]
        },
    ]
}

export default portfolio;