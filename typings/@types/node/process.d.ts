declare namespace NodeJS {
  interface Process {
    browser?: boolean | undefined

    /**
     * Get the path to the current working directory.
     *
     * @since v0.1.8
     *
     * @return {string}
     *  Current working directory of the Node.js process
     */
    cwd(this: void): string
  }
}
