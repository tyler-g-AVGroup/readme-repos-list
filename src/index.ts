import { getInput, setFailed } from "@actions/core";
import { getOctokit } from "@actions/github";
import { replaceContents } from "./replace";

const token = getInput("token") || process.env.GH_PAT || process.env.GITHUB_TOKEN;

export const run = async () => {
  if (!token) throw new Error("GitHub token not found");
  const octokit = getOctokit(token);
  let [owner, repo] = (process.env.GITHUB_REPOSITORY || "").split("/");
  owner = owner || getInput("owner");
  repo = repo || getInput("repo");
  if (!owner || !repo) throw new Error("Owner or repo not found");
  const size = getInput("size") || 50;

  const q = getInput("query");
  const max = getInput("max") ? parseInt(getInput("max"), 10) : 100;
  const per_page = Math.min(max, 100);
  const repos = await octokit.search.repos({
    q,
    per_page,
    sort:
      (getInput("sort") as "stars" | "forks" | "help-wanted-issues" | "updated" | undefined) ||
      "stars",
    order: (getInput("order") as "asc" | "desc" | undefined) || "desc",
  });
  if (max > 100) {
    const numberOfPagesRequired = Math.min(9, Math.floor(max / 100));
    for await (const page of Array.from(Array(numberOfPagesRequired)).map((_, i) => i + 2)) {
      repos.data.items.push(
        ...(
          await octokit.search.repos({
            q,
            per_page,
            sort:
              (getInput("sort") as
                | "stars"
                | "forks"
                | "help-wanted-issues"
                | "updated"
                | undefined) || "stars",
            order: (getInput("order") as "asc" | "desc" | undefined) || "desc",
            page,
          })
        ).data.items
      );
    }
  }

  let md =
    getInput("prefix") ||
    "\n<!-- This list is auto-generated using readme-repos-list -->\n<!-- Do not edit this list manually, your changes will be overwritten -->\n";
  repos.data.items
    .filter((repo) => repo.full_name !== `${owner}/${repo}`)
    .sort((a,b) => (a.updated_at).localeCompare(b.updated_at))
    .filter((item, index, items) =>
      getInput("one-per-owner")
        ? items.map((i) => i.owner.login).indexOf(item.owner.login) === index
        : true
    )
    .forEach((item) => {
      md += `* [${item.name}](${item.html_url})${item.description ? " - " + item.description : ""}\n\n`;
    });
  if (getInput("suffix")) md += getInput("suffix");

  const path = getInput("path") || "README.md";
  const current = await octokit.repos.getContent({ owner, repo, path });
  let contents = Buffer.from(current.data.content, "base64").toString("utf8");
  const start = getInput("start") || "<!-- start: readme-repos-list -->";
  const end = getInput("end") || "<!-- end: readme-repos-list -->";
  contents = replaceContents(start, end, contents, md);

  if (contents.trim() !== Buffer.from(current.data.content, "base64").toString("utf8").trim())
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      sha: current.data.sha,
      content: Buffer.from(contents).toString("base64"),
      message: getInput("commit-message") || ":pencil: Update repositories in README [skip ci]",
    });
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
