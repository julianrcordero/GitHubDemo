import client from "./ApiClient";

const endpoint = "/repos/twitter/bootstrap/commits";
const params = { per_page: 25 };
const getCommits = () => client.get(endpoint, params);

export default {
  getCommits,
};
