# The Balm Health Initiative — Website

The official website of **The Balm Health Initiative and Social Intervention (TBHISI)**, a nonprofit based in Ota, Ogun State, Nigeria. It shares who the organisation is, its programs, how to get help, how to give, and its financial transparency.

## Built with

- **TypeScript**: site build scripts and browser code
- **HTML & CSS**: pages and styling, no framework
- **Node.js**: runs the build ([tsx](https://github.com/privatenumber/tsx))
- **Playwright** and **axe-core**: browser and accessibility tests
- **GitHub Actions**: runs the checks on every push
- **Netlify**: hosting and form handling

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer and [Git](https://git-scm.com).

```bash
git clone https://github.com/saintamadeus/balm-health-website.git
cd balm-health-website
npm install
npm start
```

Then open http://localhost:3000.

Other commands:

```bash
npm run build         # build the site into dist/
npm run check         # type check, run tests and build
npm run test:browser  # browser tests (first run: npx playwright install chromium)
```
