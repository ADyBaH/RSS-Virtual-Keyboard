import { createNode } from '../utils/create-node';

export function createFooter(node) {
  const footer = createNode({ tag: 'footer', className: 'footer', parent: node });
  createNode({
    tag: 'a',
    className: 'footer__github',
    textContent: 'MyGitHub',
    attr: {
      href: 'https://github.com/ADyBaH',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    parent: footer,
  });
  createNode({
    tag: 'h2',
    className: 'footer__by',
    textContent: '© By ADyBaH 2023',
    attr: {
      href: 'https://github.com/ADyBaH',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    parent: footer,
  });
  createNode({
    tag: 'span',
    textContent: 'img',
    className: 'footer__rssImg',
    parent: footer,
  });

  return footer;
}
