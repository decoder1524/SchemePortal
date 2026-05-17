import API, { ELIGIBLE_API, NOTIFY_API, PROFILE_API, SCHEME_API } from './axiosInstance.js'

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const changePassword = (data) => API.post("/changePassword", data);
export const getMe = () => API.get("/refresh");
export const createUser = (data) => API.post("/createUser", data);
export const getUsers = () => API.get("/getUsers");
export const getUser = (userId) => API.get(`/getUser/${userId}`);
export const updateUser = (userId, data) => API.put(`/updateUser/${userId}`, data);
export const deleteUser = (userId) => API.delete(`/deleteUser/${userId}`);

export const registerProfile = (userId, data) => PROFILE_API.post(`/registerprofile/${userId}`, data);
export const getProfile = (userId) => PROFILE_API.get(`/getProfile/${userId}`);
export const getProfileIds = () => PROFILE_API.get(`/getProfileIDs`);
export const deleteProfile = (userId) => PROFILE_API.get(`/deleteProfile/${userId}`);
export const editProfile = (userId, data) => PROFILE_API.post(`/edit-profile/${userId}`, data);

export const addScheme = (data) => SCHEME_API.post(`/add-scheme`, data)
export const editScheme = (data) => SCHEME_API.post(`/edit-scheme`, data)
export const getScheme = (schemeId) => SCHEME_API.get(`/get-scheme/${schemeId}`)
export const getSchemes = () => SCHEME_API.get(`/get-schemes`)
export const deleteScheme = (schemeId) => SCHEME_API.delete(`/delete-scheme/${schemeId}`)

export const feedBack = (data) => SCHEME_API.post(`/feedback`,data);
export const getFeed = () => SCHEME_API.get(`/getFeedback`);
export const getFeedbacks = (userId) => SCHEME_API.get(`/getFeedbacks/${userId}`);
export const updateFeedback = (data) => SCHEME_API.put(`/updateFeedback`,data);

export const checkEligibleScheme = (data) => ELIGIBLE_API.post(`/checkEligibile`, data);
export const getEligibleScheme = (userId) => ELIGIBLE_API.get(`/getEligibleScheme/${userId}`);
export const postEligibleData = (data) => ELIGIBLE_API.post(`/postEligibleData`, data);
export const getEligibleUsers = () => ELIGIBLE_API.get(`/getEligibleUsers`);


export const sendRegistrationMail = (data) => NOTIFY_API.post('/sendRegistrationMail',data)
export const sendNewSchemeMail = (data) => NOTIFY_API.post('/sendNewSchemeMail',data)
export const sendNewSchemeMailSingle = (data) => NOTIFY_API.post('/sendNewSchemeMailSingle',data)
export const getNotifications =  (data) => NOTIFY_API.get('/getNotifications')