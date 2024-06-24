export const isAuthenticated = () => {
  // смотрит есть ли в хранилище токен авторизации
  const token = localStorage.getItem('token')

  // !! двойное отрицание
  return !!token
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

// при авторизации получаем токен в качестве параметра и записываем в локальное хранилище под ключом токен 

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}
