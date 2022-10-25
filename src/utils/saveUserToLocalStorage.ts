export const saveUserToLocalStorage = (id: string) => {
  const oneWeekInMiliseconds = 604800000;
  const expirationTime = new Date().getTime() + oneWeekInMiliseconds;
  localStorage.setItem('auth', JSON.stringify({ user: id, expirationTime }));
};
