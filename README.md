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
    # run every day at midnight
    - cron: "0 0 * * *"
jobs:
  list:
    runs-on: ubuntu-latest
    steps:
      - name: Run readme-repos-list
        uses: DenverCoderOne/readme-repos-list@v2.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          query: "Octocat in:readme"
          max: 5
```

This will create a README like so:

<!-- start: readme-repos-list -->
<!-- This list is auto-generated using readme-repos-list -->
<!-- Do not edit this list manually, your changes will be overwritten -->
* [awesome-design-systems](https://github.com/alexpate/awesome-design-systems) - 💅🏻 ⚒ A collection of awesome design systems

* [awesome-kotlin](https://github.com/KotlinBy/awesome-kotlin) - A curated list of awesome Kotlin related stuff Inspired by awesome-java. 

* [awesome-python-scientific-audio](https://github.com/faroit/awesome-python-scientific-audio) -  Curated list of python software and packages related to scientific research in audio

* [awesome-typescript](https://github.com/dzharii/awesome-typescript) - A collection of awesome TypeScript resources for client-side and server-side development. Write your awesome JavaScript in TypeScript

* [Bombers](https://github.com/bhattsameer/Bombers) - SMS/Email/Whatsapp/Twitter/Instagram bombers Collection :bomb::bomb::bomb: :boom: Also added collection of some Fake SMS utilities which helps in skip phone number based SMS verification by using a temporary phone number that acts like a proxy.

* [docker-development-youtube-series](https://github.com/marcel-dempers/docker-development-youtube-series)

* [fucking-awesome-python](https://github.com/trananhkma/fucking-awesome-python) - awesome-python with :octocat: :star: and :fork_and_knife:

* [HelloGitHub](https://github.com/521xueweihan/HelloGitHub) - :octocat: 分享 GitHub 上有趣、入门级的开源项目。Share interesting, entry-level open source projects on GitHub.

* [interview-techdev-guide](https://github.com/fnplus/interview-techdev-guide) - This repository contains curated technical interview questions by fn+geeks community

* [patchwork](https://github.com/jlord/patchwork) - All the Git-it Workshop completers! 

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
