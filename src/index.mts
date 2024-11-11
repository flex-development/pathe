/**
 * @file Package Entry Point
 * @module pathe
 */

export type * from '#interfaces/index'
export * from '#lib'
export { default, posix, win32 } from '#pathe'
export type * from '#types/index'
