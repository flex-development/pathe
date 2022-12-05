# pathe

[![npm](https://img.shields.io/npm/v/@flex-development/pathe.svg)](https://npmjs.com/package/@flex-development/pathe)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/pathe.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![github actions](http://img.shields.io/badge/-github%20actions-2088ff?style=flat&logo=github-actions&logoColor=ffffff)](https://github.com/features/actions)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

Universal drop-in replacement for [`node:path`][1]

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a universal drop-in replacement for Node.js' [`path`][1] module. It ensures consistency between POSIX
and Windows operating systems by normalizing Windows-style paths, and also provides additional utilities for working
with file extensions.

## When should I use this?

Historically, Windows operating systems used [backslashes (`\`) to separate path components][2]. This was in stark
contrast to POSIX operating systems, which used forwardslashes (`/`). Even though both separators are now supported,
there are still inconsistencies present in Node.js' `path` module. When running on a Windows operating system, the
`path` module uses backslashes to separate path components. On POSIX operating systems, forwardslashes are used.

In addition to path normalization, this package also adds support for adding, removing, and updating file extensions.

## Install

This package is [ESM only][3].

```sh
yarn add @flex-development/pathe
```

From Git:

```sh
yarn add @flex-development/pathe@flex-development/pathe
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/features/protocols#git'>Git - Protocols | Yarn</a>
    &nbsp;for details on requesting a specific branch, commit, or tag.
  </small>
</blockquote>

## Use

**TODO**: Update documentation.

## API

**TODO**: Update documentation.

## Types

This package is fully typed with [TypeScript][4].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://nodejs.org/api/path.html
[2]: https://learn.microsoft.com/en-us/archive/blogs/larryosterman/why-is-the-dos-path-character
[3]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[4]: https://www.typescriptlang.org
