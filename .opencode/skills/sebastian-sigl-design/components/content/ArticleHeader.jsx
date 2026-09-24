import React from 'react';
import { MetaLine } from '../core/MetaLine.jsx';
import { Tag } from '../core/Tag.jsx';
import { ShareButtons } from './ShareButtons.jsx';
import { MediaLinks } from './MediaLinks.jsx';

export function ArticleHeader({ title, description, date, readingTime, category, categoryHref, url, media, mediaIcons }) {
  return (
    <header className="ss-article-head">
      <MetaLine date={date} readingTime={readingTime}>{category ? <><span className="ss-meta__dot" aria-hidden="true">·</span><Tag href={categoryHref}>{category}</Tag></> : null}</MetaLine>
      <h1 className="ss-h1 ss-article-head__title">{title}</h1>
      {description ? <p className="ss-article-head__lede">{description}</p> : null}
      <div className="ss-article-head__bar">
        {media ? <MediaLinks {...media} icons={mediaIcons} /> : <span />}
        <ShareButtons url={url} title={title} />
      </div>
    </header>
  );
}
