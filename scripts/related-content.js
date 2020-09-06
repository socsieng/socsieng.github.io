#!/usr/bin/env node

const glob = require('glob');
const frontMatter = require('front-matter');
const path = require('path');
const fs = require('fs');

const basePath = path.resolve(__dirname, '../');

const postAttributes = {};

function isArray(value) {
  return typeof value === 'object' && typeof value.length === 'number';
}

function toArray(tags) {
  return isArray(tags) ? tags : tags ? [tags] : [];
}

function calculateScore(post, relativeTo) {
  const now = new Date();
  const postDate = new Date(
    post.attributes.modified_date || post.attributes.date
  );
  const dateScore = postDate.valueOf() / now.valueOf();
  const postTags = toArray(post.attributes.tags);
  const relativeTags = toArray(relativeTo.attributes.tags);
  const tagScore = postTags.reduce(
    (total, tag) => total + (relativeTags.indexOf(tag) === -1 ? 0 : 1),
    0
  );
  const categoryScore =
    post.attributes.categories === relativeTo.attributes.categories ? 2 : 0;

  return dateScore + tagScore + categoryScore;
}

function getRelatedPosts(post) {
  const posts = Object.values(postAttributes);

  return posts
    .filter((p) => p.path !== post.path)
    .map((p) => ({
      ...p,
      score: calculateScore(p, post),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function isFrontMatterSeparator(line) {
  return /^---/.test(line);
}

function isRelatedPosts(line) {
  return /^related:/.test(line);
}

function findInsertionPoint(lines) {
  let startIndex = -1;
  let endIndex = -1;

  if (!isFrontMatterSeparator(lines[0])) return;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (startIndex !== -1) {
      if (isFrontMatterSeparator(line) || /^\s/.test(line)) {
        endIndex = i;
        break;
      }
    }

    if (isRelatedPosts(line)) {
      startIndex = i;
    } else if (isFrontMatterSeparator(line)) {
      startIndex = i;
      endIndex = i;
      break;
    }
  }

  if (startIndex !== -1 && endIndex !== -1) {
    return {
      start: startIndex,
      end: endIndex,
    };
  }

  return null;
}

function updateRecentPosts(filename, relatedPosts) {
  const content = fs.readFileSync(filename, 'utf-8');
  const lines = content.split('\n');
  const insertionPoint = findInsertionPoint(lines);

  if (!insertionPoint) return;

  // const newLines = ['related:'];

  // for (const related of relatedPosts) {
  //   newLines.push(
  //     `  - url: ${related.path}`,
  //     `    title: ${related.attributes.title}`
  //   );
  // }

  lines.splice(
    insertionPoint.start,
    insertionPoint.end - insertionPoint.end,
    //...newLines
    `related: ${JSON.stringify(
      relatedPosts.map((p) => ({
        url: p.path,
        title: p.attributes.title,
      }))
    )}`
  );

  fs.writeFileSync(filename, lines.join('\n'));
}

glob('_posts/*.md', { cwd: basePath }, (err, matches) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (const match of matches) {
    const contents = fs.readFileSync(match, 'utf-8');
    const matter = frontMatter(contents);
    postAttributes[match] = {
      path: match,
      attributes: matter.attributes,
    };
  }

  matches
    .map((match) => ({
      path: match,
      related: getRelatedPosts(postAttributes[match]),
    }))
    .forEach((post) => {
      updateRecentPosts(path.resolve(basePath, post.path), post.related);
    });
});
