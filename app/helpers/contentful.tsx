import { stringify } from 'querystring';

const contentfulUrl = process.env.CONTENTFUL_URL || 'https://cdn.contentful.com/spaces/0hd36jc0fz5r';
export const token = process.env.CONTENTFUL_KEY || '235c062dd801b1c35e907bab86628be95555be0f9cfc9c6296e28a90e58dc331';
export const entriesUrl = `${contentfulUrl}/entries`;
export const assetsUrl = `${contentfulUrl}/assets`;

export function getEntryUrlBySlug(slug, type) {
  const params = {
    access_token: token,
    content_type: type,
    include: 2,
    limit: 1,
    'fields.slug': slug
  };
  return `${entriesUrl}?${stringify(params)}`;
}

export function getEntryUrl(id) {
  const params = {
    access_token: token
  };
  return `${entriesUrl}/${id}?${stringify(params)}`;
}

export function getEntriesUrl(type) {
  const params = {
    access_token: token,
    content_type: type,
    include: 2
  };
  return `${entriesUrl}?${stringify(params)}`;
}

/*
 * Contentful returns included objects (like an Image or Category) in
 * separate arrays (Asset and Entry respectively).
 *
 * Since these arrays are just arrays of objects, we have no easy way
 * to get an object when needed. This formats each array into a
 * hashMap of {id: {object.fields},...}
 */
export function formatIncludes(includes) {
  const assetHash = {};
  const entryHash = {};

  if (includes) {
    if (includes.Asset) {
      includes.Asset.map((asset) => {
        assetHash[asset.sys.id] = asset.fields;
        return asset;
      });
    }
    if (includes.Entry) {
      includes.Entry.map((entry) => {
        entryHash[entry.sys.id] = entry.fields;
        return entry;
      });
    }
  }
  return { assetHash, entryHash };
}

export function formatPost(post, entryHash, assetHash) {
  return {
    id: post.sys.id,
    slug: post.fields.slug,
    date: post.fields.date,
    modifiedDate: post.sys.updatedAt,
    title: post.fields.title,
    subtitle: post.fields.subtitle,
    body: post.fields.body
  };
}
