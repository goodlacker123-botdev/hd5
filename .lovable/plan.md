

## Accessing `/curtain-preview` on Netlify

Since this is a single-page app using React Router, navigating directly to `/curtain-preview` will return a 404 because the server doesn't know about client-side routes.

### Netlify Fix

Create a `public/_redirects` file with:

```
/*    /index.html   200
```

This tells Netlify to serve `index.html` for all routes, letting React Router handle them.

### GitHub Pages

GitHub Pages doesn't natively support SPA routing. If you're using Netlify as your primary host, the `_redirects` file is all you need. If you also deploy to GitHub Pages, you'd need a 404.html hack (copy index.html as 404.html), but Netlify is the cleaner solution.

### Implementation

One file to create: `public/_redirects` with the single redirect rule.

