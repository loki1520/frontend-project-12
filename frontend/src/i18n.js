import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ru',
    resources: {
      ru: {
        translation: {
          header: {
            namePage: 'Hexlet Chat',
            exit: 'Выйти',
          },
          login: {
            title: 'Войти',
            username: 'Ваш ник',
            password: 'Пароль',
            footerPart1: 'Нет аккаунта? ',
            footerPart2: 'Регистрация',
          },
          notFound: {
            title: 'Страница не найдена',
            footerPart1: 'Но вы можете перейти ',
            footerPart2: 'на главную страницу',
          },
          signUp: {
            title: 'Регистрация',
            username: 'Имя пользователя',
            password: 'Пароль',
            confirmPassword: 'Подтвердите пароль',
            signButton: 'Зарегистрироваться',
          },
          errors: {
            required: 'Обязательное поле',
            countSymbols: 'От 3 до 20 символов',
            passCountSymbols: 'Не менее 6 символов',
            passwordConfirmNotOneOff: 'Пароли должны совпадать',
            userAlreadyExists: 'Такой пользователь уже существует',
            unicumName: 'Должно быть уникальным',
          },
          mainPage: {
            renameChannel: 'Переименовать',
            removeChannel: 'Удалить',
            channels: 'Каналы',
            newMessages: 'Введите сообщение...',
            messagesCount: '{{count}} сообщение', // для числа 1
            messagesCount_few: '{{count}} сообщения', // для чисел 2, 3, 4
            messagesCount_many: '{{count}} сообщений', // для остальных чисел
            send: 'Отправить',
            cancel: 'Отменить',
            rename: 'Переименовать',
            remove: 'Удалить',
            addChannelTitle: 'Добавить канал',
            renameChannelTitle: 'Переименовать канал',
            removeChannelTitle: 'Удалить канал',
            confirmRemove: 'Уверены?',
          },
        },
      },
    },
    interpolation: {
      escapeValue: false, // экранирование уже есть в самом React
    },
  });

export default i18next;
