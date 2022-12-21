export const userInfo = () => JSON.parse(localStorage.getItem("user"));
export const token = () => localStorage.getItem("token");

export const authorities = () => {
  let authorities = [];
  if (userInfo() != null) {
    for (let i = 0; i < userInfo().authorities.length; i++)
      authorities.push(userInfo().authorities[i].authority);
  }
  return authorities;
};

export const isLogged = () => userInfo() !== null;
export const isProprietaire = () => authorities().includes("ROLE_PROPRIETAIRE");
export const isJoueur = () => authorities().includes("ROLE_JOUEUR");
export const isAdmin = () => authorities().includes("ROLE_ADMIN");
