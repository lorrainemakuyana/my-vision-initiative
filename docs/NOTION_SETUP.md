# Setting up the News section (Notion)

The `/news` section is powered by a Notion database. **Publishing a post never
requires a deploy** — the site re-reads Notion on a timer and regenerates the
affected pages by itself.

## 1. Create the Notion database

Create a new database in Notion (full page, not inline) with exactly these
properties. The names matter — the code looks them up by name.

| Property        | Type                | Required | Notes                                                     |
| --------------- | ------------------- | -------- | --------------------------------------------------------- |
| `Title`         | Title               | yes      | The post headline. (`Name` also works.)                   |
| `Status`        | Status _or_ Select  | yes      | Must contain an option literally called `Published`.      |
| `PublishedDate` | Date                | yes      | Sort order on the index, and the date shown on the post.  |
| `Slug`          | Text                | no       | The URL. Falls back to a slug derived from the title.     |
| `Excerpt`       | Text                | no       | Card summary and the meta description used by search/social. |
| `Category`      | Select              | no       | Drives `/news/category/<name>` and the filter pills.      |
| `Tags`          | Multi-select        | no       | Shown at the foot of a post.                              |
| `Author`        | Person _or_ Text    | no       | Byline.                                                   |

The post **body** is just the content of the Notion page itself. Headings,
bold/italic, links, bulleted and numbered lists, quotes, callouts, code blocks,
images, videos, embeds, bookmarks and dividers all render.

The **cover image** on a card and at the top of a post is the Notion page cover.

> Only rows whose `Status` is `Published` ever appear on the site. Anything else
> is invisible, so drafts are safe to leave in the database.

## 2. Create the integration and connect it

1. Go to <https://www.notion.so/my-integrations> and create a new internal
   integration.
2. Copy its **Internal Integration Secret** — this is `NOTION_TOKEN`.
3. Open your database in Notion, click the `···` menu → **Connections** →
   **Connect to** → pick your integration.

**Step 3 is the one people forget.** Without it, the integration cannot see the
database and the site will render an empty News page.

## 3. Get the database ID

Open the database as a full page. The URL looks like:

```
https://www.notion.so/<workspace>/1a2b3c4d5e6f7890abcdef1234567890?v=...
                                  └────────── NOTION_DATABASE_ID ──────────┘
```

That 32-character string is `NOTION_DATABASE_ID`.

## 4. Set the environment variables

In `.env` locally, and in your Vercel project settings for production:

```
NOTION_TOKEN=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=1a2b3c4d5e6f7890abcdef1234567890
REVALIDATE_SECRET=<any long random string>
```

Generate a secret with: `openssl rand -hex 32`

## How publishing works (no redeploys)

Every `/news` route is rendered with Incremental Static Regeneration on a
60-second window. When you set a post to `Published`, the next visitor after
that window triggers a background re-render, and the post is live. **Your Vercel
deployment is never touched.**

If 60 seconds is too long to wait, force it immediately:

```
curl -X POST "https://myvisioninitiative.org/api/revalidate?secret=$REVALIDATE_SECRET"
```

Add `&slug=my-post-slug` to refresh a single post plus the indexes.

## A note on images

Notion serves uploaded images from signed URLs that **expire about an hour after
they are issued**. A statically rendered page cannot embed those directly — the
images would be broken for anyone arriving later.

So images are routed through `/api/notion-image`, which re-resolves the current
URL from the Notion API on each request and streams the bytes back. The image
data is cached at the CDN, so this costs one Notion API call per image per cache
miss, not per pageview.

You do not have to do anything for this to work. It is just why image URLs on the
site look like `/api/notion-image?blockId=...` rather than pointing at Notion.

## Troubleshooting

**The News page is empty.**
Most likely the integration is not connected to the database (step 3 above), or
no row has `Status = Published`.

**A post does not appear.**
Check `Status` is exactly `Published` and that `PublishedDate` is set — posts are
sorted by it.

**Two posts collide at the same URL.**
Two rows produced the same slug. Set an explicit, unique `Slug` on one of them.
