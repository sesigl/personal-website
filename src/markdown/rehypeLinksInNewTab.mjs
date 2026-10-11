// Opens every article link in a new tab. Links to an anchor on the same page,
// such as footnotes and headings, stay in the current tab.
export default function rehypeLinksInNewTab() {
	return (tree) => visit(tree);
}

function visit(node) {
	if (node.type === 'element' && node.tagName === 'a') {
		const href = String(node.properties?.href ?? '');
		if (href && !href.startsWith('#')) {
			node.properties.target = '_blank';
			node.properties.rel = ['noopener', 'noreferrer'];
		}
	}
	node.children?.forEach(visit);
}
