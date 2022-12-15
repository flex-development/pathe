# pathe

[![npm](https://img.shields.io/npm/v/@flex-development/pathe.svg)](https://npmjs.com/package/@flex-development/pathe)
[![codecov](https://codecov.io/gh/flex-development/pathe/branch/main/graph/badge.svg?token=R2TPEBGWXB)](https://codecov.io/gh/flex-development/pathe)
[![license](https://img.shields.io/github/license/flex-development/pathe.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

Universal drop-in replacement for [`node:path`][1]

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [API](#api)
  - [Core](#core)
    - [`basename(path[, suffix])`](#basenamepath-string-suffix-string-string)
    - [`delimiter`](#delimiter)
    - [`dirname(path)`](#dirnamepath-string-string)
    - [`extname(path)`](#extnamepath-string-emptystring--ext)
    - [`format(pathObject)`](#formatpathobject-formatinputpathobject-string)
    - [`isAbsolute(path)`](#isabsolutepath-string-boolean)
    - [`join([...paths])`](#joinpaths-string-string)
    - [`normalize(path)`](#normalizepath-string-string)
    - [`parse(path)`](#parsepath-string-parsedpath)
    - [`relative(from, to)`](#relativefrom-string-to-string-string)
    - [`resolve([...paths])`](#resolvepaths-string-string)
    - [`sep`](#sep)
    - [`toNamespacedPath(path)`](#tonamespacedpathpath-string-string)
  - [Utilities](#utilities)
    - [`addExt(path[, ext])`](#addextpath-string-ext-nullablestring-string)
    - [`changeExt(path[, ext])`](#changeextpath-string-ext-nullablestring-string)
    - [`defaultExt(path[, ext][, ignore])`](#defaultextpath-string-ext-nullablestring-ignore-string-string)
    - [`formatExt([ext])`](#formatextext-string-emptystring--ext)
    - [`removeExt(path[, ext])`](#removeextpath-string-ext-nullablestring-string)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a universal drop-in replacement for Node.js' [`path`][1] module.

It enforces consistency between POSIX and Windows operating systems and also provides additional utilities for adding,
changing, formatting, and removing file extensions.

## When should I use this?

For [historical reasons][2], Windows operating systems used backslashes (`\`) to separate path components. This was in
stark contrast to POSIX operating systems, which used forwardslashes (`/`). Even though Windows operating systems now
support both separators, there are still discrepancies between operating systems when using Node.js' `path` module:

> The default operation of the `node:path` module varies based on the operating system on which a Node.js application is
> running. Specifically, when running on a Windows operating system, the `node:path` module will assume that
> Windows-style paths are being used. &ndash; [*Windows vs. POSIX*][3]

This package enforces consistency between operating systems by ensuring all paths meet POSIX standards. Forwardslashes
(`/`) will be used to separate path components; semicolons (`;`) will be used to delimit paths. With full support for
both [drive paths][6] and [UNC paths][7] as well, platform-specific modules like [`node:path/posix`][4] and
[`node:path/win32`][5] are no longer needed.

> ~~To achieve consistent results when working with Windows file paths on any operating system, use [`path.win32`][5].~~
> ~~To achieve consistent results when working with POSIX file paths on any operating system, use [`path.posix`][4].~~

**To achieve consistent results when working with Windows file paths on any operating system, use `pathe`. To achieve
consistent results when working with POSIX file paths on any operating system, use `pathe`. :blush:**

## Install

This package is [ESM only][8].

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

## API

This package exports the following identifiers:

- [`addExt`](#addextpath-string-ext-nullablestring-string)
- [`basename`](#basenamepath-string-suffix-string-string)
- [`changeExt`](#changeextpath-string-ext-nullablestring-string)
- [`defaultExt`](#defaultextpath-string-ext-nullablestring-ignore-string-string)
- [`delimiter`](#delimiter)
- [`dirname`](#dirnamepath-string-string)
- [`extname`](#extnamepath-string-emptystring--ext)
- [`formatExt`](#formatextext-string-emptystring--ext)
- [`format`](#formatpathobject-formatinputpathobject-string)
- [`isAbsolute`](#isabsolutepath-string-boolean)
- [`join`](#joinpaths-string-string)
- [`normalize`](#normalizepath-string-string)
- [`parse`](#parsepath-string-parsedpath)
- [`relative`](#relativefrom-string-to-string-string)
- [`removeExt`](#removeextpath-string-ext-nullablestring-string)
- [`resolve`](#resolvepaths-string-string)
- [`sep`](#sep)
- [`toNamespacedPath`](#tonamespacedpathpath-string-string)

The default export is `pathe`.

### Core

See [`node:path`][1] for Node.js documentation.

#### `basename(path: string, suffix?: string): string`

- `path`: Path to evaluate
- `suffix?`: Suffix to remove from result

Returns the last portion of a `path`, similar to the Unix `basename` command.

Trailing [directory separators](#sep) are ignored.

```typescript
import { basename } from '@flex-development/pathe'

console.debug(basename('/tmp/file.html'))                // 'file.html'
console.debug(basename('/tmp/file.html', '.html'))       // 'file'
console.debug(basename('C:\\temp\\file.html'))           // 'file.html'
console.debug(basename('C:\\temp\\file.HTML', '.html'))  // 'file.HTML'
```

**Source**: [`src/lib/basename.ts`](src/lib/basename.ts)

#### `delimiter`

Path delimiter.

```typescript
import { delimiter } from '@flex-development/pathe'

console.debug(delimiter)  // ':'
```

**Source**: [`src/lib/delimiter.ts`](src/lib/delimiter.ts)

#### `dirname(path: string): string`

- `path`: Path to evaluate

Returns the directory name of a `path`, similar to the Unix `dirname` command.

Trailing [directory separators](#sep) are ignored.

```typescript
import { dirname } from '@flex-development/pathe'

console.debug(dirname('/users/user/projects/pathe/README.md'))  // 'src'
```

**Source**: [`src/lib/dirname.ts`](src/lib/dirname.ts)

#### `extname(path: string): EmptyString | Ext`

- `path`: Path to evaluate

Returns the extension of a `path`, from the last occurrence of the `.` (dot) character to end of the string in the last
portion of the path.

If there is no `.` in the last portion of the path, or if there are no `.` characters other than the first character of
the path's [`basename`](#basenamepath-string-suffix-string-string), an empty string will be returned.

```typescript
import { extname } from '@flex-development/pathe'

console.debug(extname('index.html'))  // '.html'
console.debug(extname('index.d.ts'))  // '.ts'
console.debug(extname('.index.md'))   // '.md'
console.debug(extname('index.'))      // '.'
console.debug(extname('.index'))      // ''
console.debug(extname('index'))       // ''
```

**Source**: [`src/lib/extname.ts`](src/lib/extname.ts)

#### `format(pathObject: FormatInputPathObject): string`

- `pathObject`: Object to evaluate

Returns a path string from an object &mdash; the opposite of [`parse`](#parsepath-string-parsedpath).

When adding properties to `pathObject`, there are combinations where one property has priority over another:

- `pathObject.root` is ignored if `pathObject.dir` is provided
- `pathObject.ext` is ignored if `pathObject.base` exists
- `pathObject.name` is ignored if `pathObject.base` exists

```typescript
import { format, sep } from '@flex-development/pathe'

console.debug(format({ base: 'file.txt', dir: '/user/dir', root: '/noop' }))  // '/user/dir/file.txt'
console.debug(format({ base: 'file.txt', ext: 'noop', root: sep }))           // '/file.txt'
console.debug(format({ ext: '.txt', name: 'file', root: sep }))               // '/file.txt'
console.debug(format({ ext: 'txt', name: 'file', root: sep }))                // '/file.txt'
```

**Source**: [`src/lib/format.ts`](src/lib/format.ts)

#### `isAbsolute(path: string): boolean`

- `path`: Path to evaluate

Determines if `path` is an absolute path.

If the given `path` is a zero-length string, `false` will be returned.

```typescript
import { isAbsolute } from '@flex-development/pathe'

console.debug(isAbsolute(''))                                // false
console.debug(isAbsolute('.'))                               // false
console.debug(isAbsolute('C:'))                              // false
console.debug(isAbsolute('loader.mjs'))                      // false
console.debug(isAbsolute('/user/dir/file.txt'))              // true
console.debug(isAbsolute('C:\\temp\\file.html'))             // true
console.debug(isAbsolute('\\\\host\\share\\dir\\file.txt'))  // true
```

**Source**: [`src/lib/is-absolute.ts`](src/lib/is-absolute.ts)

#### `join(...paths: string[]): string`

- `...paths`: Path segment sequence

Joins all given `path` segments together using a [path separator](#sep) as the delimiter, then normalizes the resulting path.

Zero-length `path` segments are ignored. If the joined path string is a zero-length string then `'.'` will be returned,
representing the current working directory.

```typescript
import { join } from '@flex-development/pathe'

console.debug(join('', '', ''))                        // '.'
console.debug(join('/user', 'dir', 'file.txt', '..'))  // '/user/dir/file.txt'
```

**Source**: [`src/lib/join.ts`](src/lib/join.ts)

#### `normalize(path: string): string`

- `path`: Path to evaluate

Normalizes the given `path`, resolving `'..'` and `'.'` segments.

When multiple, sequential path segment separation characters are found (e.g. `/` on POSIX and either `\\` or `/` on
Windows), they are replaced by a single instance of a POSIX-compliant separator. Trailing separators are preserved.

If the `path` is a zero-length string, `'.'` is returned, representing the current working directory.

```typescript
import { normalize } from '@flex-development/pathe'

console.debug(normalize('/user/dir//file.txt/..'))          // '/user/dir/file.txt'
console.debug(normalize('C:\\temp\\\\foo\\bar\\..\\'))      // 'C:/temp/foo/'
console.debug(normalize('C:////temp\\\\/\\/\\/foo/bar'))    // 'C:/temp/foo/bar'
console.debug(normalize('\\\\host\\share\\dir\\file.txt'))  // '//host/share/dir/file.txt'
```

**Source**: [`src/lib/normalize.ts`](src/lib/normalize.ts)

#### `parse(path: string): ParsedPath`

- `path`: Path to evaluate

Returns an object whose properties represent significant elements of the given `path`. Trailing [directory
separators](#sep) are ignored.

**Note**: Unlike `node:path`, `parse(path).dir === dirname(path)` when `path` is a non-empty string. See
[`nodejs/node#18655`][9] for details.

```typescript
import { parse } from '@flex-development/pathe'

console.debug(parse('/dir/file.txt'))      // { base: 'file.txt', dir: '/dir', ext: '.txt', name: 'file', root: '/'}
console.debug(parse('C:\\dir\\file.txt'))  // { base: 'file.txt', dir: 'C:/dir', ext: '.txt', name: 'file', root: 'C:/'}
```

**Source**: [`src/lib/parse.ts`](src/lib/parse.ts)

#### `relative(from: string, to: string): string`

- `path`: Start path
- `to`: Destination path

Returns the relative path from `from` to `to` based on the current working directory.

If `from` and `to` resolve to the same path (after calling [`resolve`](#resolvepaths-string-string) on each), a
zero-length string will be returned.

If a zero-length string is passed as `from` or `to`, the current working directory will be used instead of the
zero-length strings.

```typescript
import { relative } from '@flex-development/pathe'

console.debug(relative('/src/index.ts', '/src/lib/index.ts'))  // '../index.ts'
```

**Source**: [`src/lib/relative.ts`](src/lib/relative.ts)

#### `resolve(...paths: string[]): string`

- `...paths`: Path segment sequence

Resolves a sequence of paths or path segments into an absolute path.

The given sequence of paths is processed from right to left, with each subsequent `path` prepended until an absolute
path is constructed.

For instance, given the sequence of path segments: `/foo`, `/bar`, `baz`, calling `resolve('/foo', '/bar', 'baz')` would
return `/bar/baz` because `'baz'` is not an absolute path but `'/bar' + '/' + 'baz'` is.

If, after processing all given `path` segments, an absolute path has not yet been generated, the current working
directory is used.

The resulting path is normalized and trailing [separators](#sep) are removed unless the path is resolved to the root
directory.

Zero-length `path` segments are ignored.

If no `path` segments are passed, the absolute path of the current working directory will be returned.

```typescript
import { resolve } from '@flex-development/pathe'

console.debug(resolve('/foo/bar', './baz'))       // '/foo/bar/baz'
console.debug(resolve('/foo/bar', '/tmp/file/'))  // '/tmp/file'
```

**Source**: [`src/lib/resolve.ts`](src/lib/resolve.ts)

#### `sep`

Path segment separator.

Also known as a "directory separator".

```typescript
import { sep } from '@flex-development/pathe'

console.debug(sep)  // '/'
```

**Source**: [`src/lib/sep.ts`](src/lib/sep.ts)

#### `toNamespacedPath(path: string): string`

- `path`: Path to evaluate

Returns an equivalent [namespace-prefixed path][10] for the given `path`.

If `path` is not a [drive path][6] or [UNC path][7], `path` will be returned without modifications.

```typescript
import { toNamespacedPath } from '@flex-development/pathe'

console.debug(toNamespacedPath('C:\\file.txt'))                    // '//?/C:/file.txt'
console.debug(toNamespacedPath('\\\\host\\share\\dir\\file.txt'))  // '//?/UNC/host/share/dir/file.txt'
console.debug(toNamespacedPath('/projects/pathe/loader.mjs'))      // '/users/projects/pathe/loader.mjs'
```

**Source**: [`src/lib/to-namespaced-path.ts`](src/lib/to-namespaced-path.ts)

### Utilities

#### `addExt(path: string, ext?: Nullable<string>): string`

- `path`: Path to evaluate
- `ext?`: File extension to add

Appends a file extension to the given `path` if and only if the path does not already have that exact file extension.

Does nothing if a file extension is not provided.

```typescript
import { addExt } from '@flex-development/pathe'

console.debug(addExt('file'))                // 'file'
console.debug(addExt('file', 'mjs'))         // 'file.mjs'
console.debug(addExt('file', '.mjs'))        // 'file.mjs'
console.debug(addExt('file.d.mts', '.mts'))  // 'file.d.mts'
```

**Source**: [`src/utils/add-ext.ts`](src/utils/add-ext.ts)

#### `changeExt(path: string, ext?: Nullable<string>): string`

- `path`: Path to evaluate
- `ext?`: New file extension

Changes the file extension of the given `path`.

Does nothing if a file extension is not provided.

```typescript
import { changeExt } from '@flex-development/pathe'

console.debug(changeExt('file'))                // 'file'
console.debug(changeExt('file', 'mjs'))         // 'file.mjs'
console.debug(changeExt('file', '.mjs'))        // 'file.mjs'
console.debug(changeExt('file.mts', '.d.mts'))  // 'file.d.mts'
```

**Source**: [`src/utils/change-ext.ts`](src/utils/change-ext.ts)

#### `defaultExt(path: string, ext?: Nullable<string>, ignore?: string[]): string`

- `path`: Path to evaluate
- `ext?`: Default file extension
- `ignore?`: File extensions to ignore if found

Appends a file extension to the given `path` if and only if the path does not already have an extension. Force adding an
extension can be accomplished by passing an array of extensions to ignore.

Does nothing if a file extension is not provided.

```typescript
import { defaultExt } from '@flex-development/pathe'

console.debug(defaultExt('file'))                    // 'file'
console.debug(defaultExt('file', 'mjs'))             // 'file.mjs'
console.debug(defaultExt('file', '.mjs'))            // 'file.mjs'
console.debug(defaultExt('file.mjs', '.mjs'))        // 'file.mjs'
console.debug(defaultExt('file.d', '.mts', ['.d']))  // 'file.d.mts'
```

**Source**: [`src/utils/default-ext.ts`](src/utils/default-ext.ts)

#### `formatExt(ext?: string): EmptyString | Ext`

- `ext`: File extension to format

Formats a file extension.

This includes:

- Prepending a `.` (dot) character if not already present

Does nothing if a file extension is not provided.

```typescript
import { formatExt } from '@flex-development/pathe'

console.debug(formatExt())         // ''
console.debug(formatExt(''))       // ''
console.debug(formatExt('.ts'))    // '.ts'
console.debug(formatExt('mjs'))    // '.mjs'
console.debug(formatExt('d.mts'))  // '.d.mts'
```

**Source**: [`src/utils/format-ext.ts`](src/utils/format-ext.ts)

#### `removeExt(path: string, ext?: Nullable<string>): string`

- `path`: Path to evaluate
- `ext?`: File extension to remove

Removes a file extension from the given `path`.

Does nothing if `path` does not end with the provided file extension, or if a file extension isn't provided.

```typescript
import { removeExt } from '@flex-development/pathe'

console.debug(removeExt('file'))                // 'file'
console.debug(removeExt('file.mjs', 'mjs'))     // 'file'
console.debug(removeExt('file.mjs', '.mjs'))    // 'file'
console.debug(removeExt('file.d.mts', '.mjs'))  // 'file.d.mts'
```

**Source**: [`src/utils/remove-ext.ts`](src/utils/remove-ext.ts)

## Types

This package is fully typed with [TypeScript][11]. It exports the following definitions:

- [`Delimiter`](src/types/delimiter.ts)
- [`Ext`](src/types/ext.ts)
- [`FormatInputPathObject`](src/interfaces/path-object.ts)
- [`ParsedPath`](src/interfaces/parsed-path.ts)
- [`PathObject`](src/interfaces/path-object.ts)
- [`Pathe`](src/interfaces/pathe.ts)
- [`PlatformPath`](src/interfaces/platform-path.ts)
- [`Sep`](src/types/sep.ts)

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://nodejs.org/api/path.html
[2]: https://learn.microsoft.com/archive/blogs/larryosterman/why-is-the-dos-path-character
[3]: https://nodejs.org/api/path.html#windows-vs-posix
[4]: https://nodejs.org/api/path.html#pathposix
[5]: https://nodejs.org/api/path.html#pathwin32
[6]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions
[7]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
[8]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[9]: https://github.com/nodejs/node/issues/18655
[10]: https://docs.microsoft.com/windows/desktop/FileIO/naming-a-file#namespaces
[11]: https://www.typescriptlang.org
