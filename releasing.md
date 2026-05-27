# Releasing

## Release NPM packages

Packages are:

- baukasten-ui (main component library)
- baukasten-ui-web-wrapper (browser theme wrapper)

### Release next version

Install dependencies and build the project:

```bash
npm install
npm run build
```

Update versions to add `-next.<git-commit>` suffix.

```bash
npm run prepare-next
```

Publish this version with tag `next`.

```bash
npm run publish-next
```

### Release new version

Install dependencies and build the project:

```bash
npm install
npm run build
```

Manually change versions and dependency versions. This includes package.json files in the NPM packages. See the list above.

Publish this version with tag `latest`.

```bash
npm run publish-latest
```
