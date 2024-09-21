/**
 * @file Unit Tests - toPosix
 * @module pathe/lib/tests/unit/toPosix
 */

import { win32 } from 'node:path'
import dot from '../dot'
import testSubject from '../to-posix'

describe('unit:lib/toPosix', () => {
  it.each<Parameters<typeof testSubject>>([
    ['C:' + dot],
    ['C:' + win32.sep],
    ['C:'],
    ['C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\node\\'],
    ['C:\\abc'],
    ['C:\\another_path\\DIR\\1\\2\\33\\\\index'],
    ['C:\\path\\dir\\index.html'],
    ['C:abc'],
    ['\\\\?\\UNC'],
    ['\\\\?\\UNC\\server\\share'],
    ['\\\\server two\\shared folder\\file path.zip'],
    ['\\\\server\\share\\file_path'],
    ['\\\\user\\admin$\\system32'],
    ['\\foo\\C:'],
    ['another_path\\DIR with spaces\\1\\2\\33\\index'],
    [dot + '\\file'],
    [win32.sep]
  ])('should return posix-compliant `path` (%#)', path => {
    expect(testSubject(path)).toMatchSnapshot()
  })
})
