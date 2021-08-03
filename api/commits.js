import client from "./ApiClient";

const endpoint = "/repos";
const params = { per_page: 25 };
const getCommits = (repo) =>
  client.get(endpoint + "/github/" + repo + "/commits", params);

export default {
  getCommits,
};
