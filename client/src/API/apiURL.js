import { config } from "../Config";

const { baseURL } = config;

export const LOGIN_URL = `${baseURL}/auth/login`;
export const SINGUP_URL = `${baseURL}/auth/signUp`;
export const POST_URL = `${baseURL}/post`;
export const PROFILE_URL = `${baseURL}/user`;
export const COMMENT_URL = `${baseURL}/comment`;
export const VOLUNTEER_URL = `${baseURL}/volunteer`;
export const SKILL_URL = `${baseURL}/skill`;
export const REPORT_POST_URL = `${baseURL}/reportpost`;
export const REPORT_USER_URL = `${baseURL}/reportuser`;
