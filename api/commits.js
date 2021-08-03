import client from "./ApiClient";

const endpoint = "/repos";
const params = { per_page: 25 };
const getCommits = (owner, repo) =>
  client.get(endpoint + "/" + owner + "/" + repo + "/commits", params);

export default {
  getCommits,
};
