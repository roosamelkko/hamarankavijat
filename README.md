# Hamarankavijat Website

Static bilingual website for the Finnish mythological roleplaying game Hamarankavijat.

## Stack

- HTML + CSS + lightweight JavaScript
- Owner-editable content in JSON files
- GitHub Pages deployment

## Folder map

- `fi/` and `en/`: published pages
- `content/fi/pages.json` and `content/en/pages.json`: editable page copy
- `content/fi/blog/posts.json` and `content/en/blog/posts.json`: editable blog entries
- `assets/css/`: styles
- `assets/js/`: behavior
- `assets/data/media-log.json`: media compliance log (public-domain only)
- `credits/`: transparency page for source policy

## Edit copy (no layout changes needed)

1. Open `content/fi/pages.json` or `content/en/pages.json`.
2. Find the page key (`home`, `story`, `blog`, `educators`, `downloads`).
3. Change text values.
4. Save and commit.

## Add a blog entry

1. Open `content/fi/blog/posts.json` or `content/en/blog/posts.json`.
2. Add a new object under `posts` with:
   - `date`
   - `tag`
   - `title`
   - `summary`
   - `url`
   - `cta`
3. Save and commit.

## Update newsletter endpoint

Before launch, set the Buttondown endpoint in both FI and EN pages.

Files to edit:

- `index.html`
- `en/index.html`

## Public-domain image process

1. Download only public-domain assets.
2. Add image file under `assets/images/` (create folder if needed).
3. Add item metadata to `assets/data/media-log.json`.
4. Keep `credits/index.html` policy current.

## Deploy to GitHub Pages

1. Create GitHub repo and push this folder.
2. In GitHub: `Settings -> Pages`.
3. Set source to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Commit and push updates to publish.

## Custom domain

1. Put your domain in `CNAME`.
2. In your DNS provider, set records:
   - A -> `185.199.108.153`
   - A -> `185.199.109.153`
   - A -> `185.199.110.153`
   - A -> `185.199.111.153`
   - CNAME `www` -> your GitHub Pages host
3. In GitHub Pages settings, enable `Enforce HTTPS`.

## Local preview

Open the project in VS Code and use Live Server extension, or run any static server from project root.

