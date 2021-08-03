import commitsApi from "./api/commits";
import Moment from "moment";

test("The data is in the form of a non-empty array", async () => {
  const response = await commitsApi.getCommits("github", "docs");

  const data = response.data;

  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(1);
});

test("All entries contain required properties", async () => {
  const response = await commitsApi.getCommits("github", "docs");

  let data = response.data;
  for (let i = 0; i < data.length; i++) {
    expect(data[i]).toHaveProperty("commit.author.name");
    expect(data[i]).toHaveProperty("commit.author.date");
    expect(data[i]).toHaveProperty("sha");
    expect(data[i]).toHaveProperty("commit.message");
    expect(data[i]).toHaveProperty("node_id");
  }
});

test("Date is in proper format", async () => {
  const response = await commitsApi.getCommits("github", "docs");

  let data = response.data;
  for (let i = 0; i < data.length; i++) {
    let date = Moment(data[i].commit.author.date);
    expect(date.isValid()).toBe(true);
  }
});
