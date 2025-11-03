import axios from "axios";
import { ENVIRONMENT } from "./environment";

export const api = axios.create({
  baseURL: ENVIRONMENT.api,
})