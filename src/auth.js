// import Cookies from 'js-cookie';
// Cookies is not working stable in localhost. Lets keep using localstorage.

// IN PRODUCTION
// export const getAccessToken = () => Cookies.get('token');
// export const isAuthenticated = () => !!getAccessToken();
// export const removeToken = async () => await Cookies.remove('token');

// IN DEVELOPMENT
export const getAccessToken = () => localStorage.getItem('token');
export const isAuthenticated = () => !!getAccessToken();
export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('customerName');
  localStorage.removeItem('customerId');
};
export const setToken = (customer, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('customerName', customer.name);
  localStorage.setItem('customerId', customer._id);
};
