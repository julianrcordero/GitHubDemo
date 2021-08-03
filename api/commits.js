import client from "./ApiClient";

const endpoint = "/repos/twitter/bootstrap/commits";
const getCommits = () => client.get(endpoint);

export default {
  getCommits,
};
