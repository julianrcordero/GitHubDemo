import { create as apiCreate } from "apisauce";

const myURL = "https://api.github.com";
const client = apiCreate({ baseURL: myURL });

export default client;
