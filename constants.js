const regUrl = /http(s)?:\/\/w{0,3}?[a-zA-Z0-9]+[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*/;
const regPassword = /^[a-zA-Z0-9]{6,}$/;

const messageError = {
  badRequestError: 'Данные не прошли валидацию',
  notFoundError: 'Карточка с фильмом отсутствует',
  forbiddenError: 'Невозможно удалить карточку',
  notValidRequest: 'Неправильный запрос',
  conflictingRequestError: 'Такая почта уже есть',
  outFoundError: 'Пользователь не найден',
  unauthorizedError: 'Пожалуйста, сначала авторизуйтесь',
};

const messageLuck = {
  removeCard: 'Карточка удалена',
  register: 'Регистрация выполнена с успехом',
};

module.exports = {
  regUrl,
  regPassword,
  messageError,
  messageLuck,
};
