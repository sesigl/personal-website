import React from 'react';
import { Tag } from '../core/Tag.jsx';

const MEDIA = { spotify: 'Podcast', youtube: 'Video', infographic: 'Infographic' };

export function PostItem({ title, description, date, readingTime, href = '#', image, thumbnail = false, category, media, index, showTags = true, headingLevel = 3, onOpen, onTag, tagHref }) {
  const H = 'h' + headingLevel;
  const open = (e) => { if (onOpen) { e.preventDefault(); onOpen(); } };
  const formats = media ? Object.keys(MEDIA).filter((k) => media[k] && media[k] !== '#') : [];
  const cls = ['ss-post', index == null && 'ss-post--no-index', thumbnail && image && 'ss-post--thumb'].filter(Boolean).join(' ');
  return (
    <article className={cls}>
      {index != null && !(thumbnail && image) ? <span className="ss-post__n" aria-hidden="true">{String(index).padStart(3, '0')}</span> : null}
      <time className="ss-post__date" dateTime={date}>{date}</time>
      <div className="ss-post__body">
        <H className="ss-post__title"><a href={href} onClick={open}>{title}</a></H>
        {description ? <p className="ss-post__desc">{description}</p> : null}
        {showTags && (category || formats.length) ? (
          <div className="ss-post__tags">
            {category ? <Tag href={tagHref || '/search?q=' + category + '&categoryOnly'} onClick={(e) => { if (onTag) { e.preventDefault(); onTag(category); } }}>{category}</Tag> : null}
            {formats.map((f) => <Tag key={f} variant="muted">{MEDIA[f]}</Tag>)}
          </div>
        ) : null}
      </div>
      {thumbnail && image ? <img className="ss-post__thumb" src={image} width="120" height="80" alt="" loading="lazy" /> : null}
      <span className="ss-post__time">{readingTime ? readingTime + ' min' : ''}</span>
    </article>
  );
}
