import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

// Trusted markup only: `content` is HTML written by our own views, so escape any user data before passing it in.
export function Layout(title: string, content: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body>
${Header()}
${Main(content)}
${Footer()}
</body>
</html>`;
}
