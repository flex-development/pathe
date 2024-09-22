# pathe

[![github release](https://img.shields.io/github/v/release/flex-development/pathe.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/pathe/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/pathe.svg)](https://npmjs.com/package/@flex-development/pathe)
[![codecov](https://codecov.io/gh/flex-development/pathe/branch/main/graph/badge.svg?token=R2TPEBGWXB)](https://codecov.io/gh/flex-development/pathe)
[![license](https://img.shields.io/github/license/flex-development/pathe.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

Universal drop-in replacement for [`node:path`][node-path]

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [API](#api)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a universal drop-in replacement for Node.js' [`path`][node-path] module.

It enforces consistency between POSIX and Windows operating systems and also provides additional utilities for working
with file paths and extensions.

## When should I use this?

For [historical reasons][historical-reasons], Windows followed MS-DOS and used backslashes (`\`) to separate path
components, as opposed to the forwardslashes (`/`) used by POSIX operating systems. Even though Windows operating
systems now support both separators, there are still discrepancies between operating systems when using Node.js' `path`
module:

> The default operation of the `node:path` module varies based on the operating system on which a Node.js application is
> running. Specifically, when running on a Windows operating system, the `node:path` module will assume that
> Windows-style paths are being used. – [*Windows vs. POSIX*][windows-vs-posix]

This package enforces consistency between operating systems by ensuring paths are POSIX-compliant. With support for both
[drive][drive-path] and [UNC paths][unc-path] as well, platform-specific modules like
[`node:path/posix`][node-path-posix] and [`node:path/win32`][node-path-win32] are no longer needed.

> ~~To achieve consistent results when working with Windows file paths on any operating system,
> use [`path.win32`][node-path-win32].~~
> ~~To achieve consistent results when working with POSIX file paths on any operating system,
> use [`path.posix`][node-path-posix].~~

**To achieve consistent results when working with Windows file paths on any operating system, use `pathe`. To achieve
consistent results when working with POSIX file paths on any operating system, use `pathe`. \:blush:**

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][]:

```sh
yarn add @flex-development/pathe
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { parse } from 'https://esm.sh/@flex-development/pathe'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { parse } from 'https://esm.sh/@flex-development/pathe'
</script>
```

## Use

```ts
import {
  addExt,
  basename,
  changeExt,
  cwd,
  delimiter,
  dirname,
  dot,
  extname,
  format,
  formatExt,
  isAbsolute,
  isDeviceRoot,
  isSep,
  join,
  matchesGlob,
  normalize,
  parse,
  relative,
  removeExt,
  resolve,
  resolveWith,
  root,
  sep,
  toNamespacedPath,
  toPosix
} from '@flex-development/pathe'
```

## API

This package exports the following identifiers:

- [`addExt`](./src/lib/add-ext.ts)
- [`basename`](./src/lib/basename.ts)
- [`changeExt`](./src/lib/change-ext.ts)
- [`cwd`](./src/lib/cwd.ts)
- [`delimiter`](./src/lib/delimiter.ts)
- [`dirname`](./src/lib/dirname.ts)
- [`dot`](./src/lib/dot.ts)
- [`extname`](./src/lib/extname.ts)
- [`extnames`](./src/lib/extnames.ts)
- [`formatExt`](./src/lib/format-ext.ts)
- [`format`](./src/lib/format.ts)
- [`isAbsolute`](./src/lib/is-absolute.ts)
- [`isDeviceRoot`](./src/lib/is-device-root.ts)
- [`isSep`](./src/lib/is-sep.ts)
- [`join`](./src/lib/join.ts)
- [`matchesGlob`](./src/lib/matches-glob.ts)
- [`normalize`](./src/lib/normalize.ts)
- [`parse`](./src/lib/parse.ts)
- [`posix`](./src/pathe.ts)
- [`relative`](./src/lib/relative.ts)
- [`removeExt`](./src/lib/remove-ext.ts)
- [`resolveWith`](./src/lib/resolve-with.ts)
- [`resolve`](./src/lib/resolve.ts)
- [`root`](./src/lib/root.ts)
- [`sep`](./src/lib/sep.ts)
- [`toNamespacedPath`](./src/lib/to-namespaced-path.ts)
- [`toPosix`](./src/lib/to-posix.ts)
- [`win32`](./src/pathe.ts)

The default export is `pathe`.

> Documentation website coming soon.

## Types

This package is fully typed with [TypeScript][].

- [`Cwd`](src/types/cwd.ts)
- [`Delimiter`](src/types/delimiter.ts)
- [`DeviceRoot`](src/types/device-root.ts)
- [`Dot`](src/types/dot.ts)
- [`DriveLetter`](src/types/drive-letter.ts)
- [`EmptyString`](src/types/empty-string.ts)
- [`Ext`](src/types/ext.ts)
- [`FormatInputPathObject`](src/interfaces/format-input-path-object.ts)
- [`ParsedPath`](src/interfaces/parsed-path.ts)
- [`Pathe`](src/interfaces/pathe.ts)
- [`PlatformPath`](src/interfaces/platform-path-posix.ts)
- [`PosixDelimiter`](src/types/delimiter-posix.ts)
- [`PosixPlatformPath`](src/interfaces/platform-path-windows.ts)
- [`PosixSep`](src/types/sep-posix.ts)
- [`Sep`](src/types/sep.ts)
- [`WindowsDelimiter`](src/types/delimiter-windows.ts)
- [`WindowsPlatformPath`](src/interfaces/platform-path.ts)
- [`WindowsSep`](src/types/sep-windows.ts)

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[drive-path]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[historical-reasons]: https://learn.microsoft.com/archive/blogs/larryosterman/why-is-the-dos-path-character

[node-path-posix]: https://nodejs.org/api/path.html#pathposix

[node-path-win32]: https://nodejs.org/api/path.html#pathwin32

[node-path]: https://nodejs.org/api/path.html

[typescript]: https://www.typescriptlang.org

[unc-path]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths

[windows-vs-posix]: https://nodejs.org/api/path.html#windows-vs-posix

[yarn]: https://yarnpkg.com
