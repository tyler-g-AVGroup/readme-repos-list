# 🖇️ README Repositories List

GitHub Action to list repositories in a README

[![Build CI](https://github.com/DenverCoderOne/readme-repos-list/workflows/Build%20CI/badge.svg)](https://github.com/DenverCoderOne/readme-repos-list/actions?query=workflow%3A%22Build+CI%22)
[![Release CI](https://github.com/DenverCoderOne/readme-repos-list/workflows/Release%20CI/badge.svg)](https://github.com/DenverCoderOne/readme-repos-list/actions?query=workflow%3A%22Release+CI%22)
[![Node CI](https://github.com/DenverCoderOne/readme-repos-list/workflows/Node%20CI/badge.svg)](https://github.com/DenverCoderOne/readme-repos-list/actions?query=workflow%3A%22Node+CI%22)

## ⭐ Usage

You can create your `README.md` file with some comments, where this action will add a list of repositories:

```md
This is my fancy README

<!-- start: YOUR_STARTER -->...the list will be added here...<!-- end: YOUR_STARTER -->

Your README continues after the list
```

By default, "readme-repos-list" is the value for `YOUR_STARTER`. Then, add the workflow which runs, for example, every day:

```yaml
name: README Repos List
on:
  schedule:
    - cron: "0 0 * * 1"
jobs:
  list:
    runs-on: ubuntu-latest
    steps:
      - name: Run readme-repos-list
        uses: DenverCoderOne/readme-repos-list@master
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          query: "Octocat in:readme"
          max: 10
```

This will create a README like so:

<!-- start: readme-repos-list -->
<!-- This list is auto-generated using DenverCoderOne/readme-repos-list -->
<!-- Do not edit this list manually, your changes will be overwritten -->

[![fnplus/Algorithms-Hacktoberfest](https://images.weserv.nl/?url=avatars1.githubusercontent.com%2Fu%2F24355438%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://hacktoberfest.digitalocean.com/)
[![NITSkmOS/Algorithms](https://images.weserv.nl/?url=avatars3.githubusercontent.com%2Fu%2F38863995%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://nitskmos.github.io/Algorithms)
[![fnplus/interview-techdev-guide](https://images.weserv.nl/?url=avatars1.githubusercontent.com%2Fu%2F24355438%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](http://bit.ly/fnplusnow)
[![faroit/awesome-python-scientific-audio](https://images.weserv.nl/?url=avatars3.githubusercontent.com%2Fu%2F72940%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://github.com/faroit/awesome-python-scientific-audio)
[![jlord/patchwork](https://images.weserv.nl/?url=avatars3.githubusercontent.com%2Fu%2F1305617%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](http://jlord.github.io/patchwork)
[![dzharii/awesome-typescript](https://images.weserv.nl/?url=avatars3.githubusercontent.com%2Fu%2F36020%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://github.com/dzharii/awesome-typescript)
[![KotlinBy/awesome-kotlin](https://images.weserv.nl/?url=avatars0.githubusercontent.com%2Fu%2F17604656%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://kotlin.link/)
[![alexpate/awesome-design-systems](https://images.weserv.nl/?url=avatars0.githubusercontent.com%2Fu%2F3749759%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://git.io/design-systems)
[![drone/drone](https://images.weserv.nl/?url=avatars1.githubusercontent.com%2Fu%2F2181346%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://drone.io)
[![521xueweihan/HelloGitHub](https://images.weserv.nl/?url=avatars3.githubusercontent.com%2Fu%2F8255800%3Fv%3D4&h=50&w=50&fit=cover&mask=circle&maxage=7d)](https://hellogithub.com/)

<!-- end: readme-repos-list -->

### Inputs

#### `token` (required)

Your GitHub token or personal access token. If you don't have a bot account, you should use the default `${{ secrets.GITHUB_TOKEN }}`.

#### `query` (required)

Search query used to find repositories. See [Constructing a search query](https://docs.github.com/en/free-pro-team@latest/rest/reference/search#constructing-a-search-query) on GitHub Docs for more information. An example query can look like:

```
Octocat in:readme user:DenverCoder1
```

#### Optional inputs

| Input            | Description                            |
| ---------------- | -------------------------------------- |
| `owner`          | Owner of repository to commit to       |
| `repo`           | Name of repository to commit to        |
| `max`            | Maximum number of repositories to list |
| `prefix`         | Content to add before the list         |
| `weserv-query`   | Image manipulation query parameters    |
| `no-homepage`    | Link to repository, not homepage       |
| `suffix`         | Content to add at the end of the list  |
| `path`           | Path to file to update with content    |
| `start`          | Starting comment to look for           |
| `end`            | Ending comment                         |
| `commit-message` | Updating file commit message           |
| `one-per-owner`  | Show only one repo per owner           |
| `sort`           | Sort repositories by this parameter    |
| `order`          | Order by "asc" or "desc"               |

## 📄 License

- Code: [MIT](./LICENSE) © 2020 [Koj](https://koj.co)
- 2020-2021 [Jonah Lawrence](https://github.com/DenverCoder1)
- "GitHub" is a trademark of GitHub, Inc.
