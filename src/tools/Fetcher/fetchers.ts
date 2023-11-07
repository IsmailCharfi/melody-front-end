import { API_PATH } from "src/api";
import Fetcher from "./Fetcher";

// DEFAULT API FETCHER
export const fetcher = new Fetcher(API_PATH);
// YOU CAN CREATE OTHER GLOBAL FETCHER OBJECT FOR OTHER EXTERNAL APIS