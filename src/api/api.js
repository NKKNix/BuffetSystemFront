import axios from 'axios';

const API_URL_USER = 'http://localhost:8000/users';
const API_URL_MENU = "http://localhost:8000/menu"
const API_URL_TABLE = "http://localhost:8000/table"
const API_URL_ORDER = "http://localhost:8000/order"

const API_URL_QR = "http://localhost:8000/qrcode/table"

export const getUsers = () => axios.get(API_URL_USER);
export const getUserById = (id) => axios.get(`${API_URL_USER}/${id}`);
export const createUser = (user) => axios.post(API_URL_USER, user);
export const updateUser = (id, user) => axios.put(`${API_URL_USER}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL_USER}/${id}`);

export const getMenu = () => axios.get(API_URL_MENU);
export const createMenu = (foodmenu) => axios.post(API_URL_MENU,foodmenu);
export const updateMenu = (id,foodmenu) => axios.put(`${API_URL_MENU}/${id}`,foodmenu);
export const deleteMenu = (id) => axios.delete(`${API_URL_MENU}/${id}`);

export const getTable = () => axios.get(API_URL_TABLE);
export const getTableById = (id) => axios.get(`${API_URL_TABLE}/${id}`);
export const createTable = (table) => axios.post(API_URL_TABLE,table);
export const updateTable = (id,table) => axios.put(`${API_URL_TABLE}/${id}`,table);
export const deleteTable = (id) => axios.delete(`${API_URL_TABLE}/${id}`);

export const placeOrder = (orderData) => axios.post(`${API_URL_ORDER}`,orderData)

export const genQrById = (id) => axios.get(`${API_URL_QR}/${id}`);
