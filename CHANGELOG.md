## [1.0.3](https://github.com/flex-development/pathe/compare/1.0.2...1.0.3) (2023-01-01)


### :package: Build

* **deps-dev:** Bump cspell from 6.18.0 to 6.18.1 ([#6](https://github.com/flex-development/pathe/issues/6)) ([e6343ee](https://github.com/flex-development/pathe/commit/e6343eea139e7166eae11e372479f17a7f75b971))
* **deps:** bump @flex-development/errnode from 1.0.1 to 1.2.0 ([4c11bde](https://github.com/flex-development/pathe/commit/4c11bde87439d20c48e45214ef75cc83fcbe52e1))

## [1.0.2](https://github.com/flex-development/pathe/compare/1.0.1...1.0.2) (2022-12-28)


### :robot: Continuous Integration

* [[@dependabot](https://github.com/dependabot)] ignore updates for `@types/node` ([e7b0f99](https://github.com/flex-development/pathe/commit/e7b0f99c08dcf1209ca3a6f48a1831fdea48fb60))
* configure private package registry for [@dependabot](https://github.com/dependabot) ([22f4155](https://github.com/flex-development/pathe/commit/22f415532fea04a180e6e82f2090afaa962c3079))
* **workflows:** [`add-to-project`] add items from repo admin account ([7a8681e](https://github.com/flex-development/pathe/commit/7a8681ec9c03eff35eb5b9d105359920127d7deb))
* **workflows:** [`ci`] update codecov config ([1d90af8](https://github.com/flex-development/pathe/commit/1d90af852150915323dcd614bceffacb2832e19f))
* **workflows:** [`publish`] cleanup registry scope ([2cf1602](https://github.com/flex-development/pathe/commit/2cf160248a7d448e481157e1954b0eb390fc48b4))
* **workflows:** [`publish`] use node version file ([b73419d](https://github.com/flex-development/pathe/commit/b73419d61c5c08c80209652ba8ac99edbad474df))
* **workflows:** use environment files ([9d6f82a](https://github.com/flex-development/pathe/commit/9d6f82aa754ecb93b4846a0caf0376e5b0d0475a))


### :pencil: Documentation

* add "contributor covenant code of conduct" ([0279edc](https://github.com/flex-development/pathe/commit/0279edc6ab1b41ab04c0f7a99057767ace38e39a))


### :bug: Fixes

* **install:** [git] make `postinstall` script work with git install ([586e41c](https://github.com/flex-development/pathe/commit/586e41c0e8dd0f8b2a8c08a64eaf91eff8fba24a))


### :house_with_garden: Housekeeping

* update project architecture ([5b36f88](https://github.com/flex-development/pathe/commit/5b36f88920d10395a0e7bc4ed38ea8045c1829bd))
* **github:** add "package manager" dropdown to bug report template ([7e37201](https://github.com/flex-development/pathe/commit/7e37201dc795788efaf4e0864817c2b4e9c2c164))
* **github:** add commit scope `install` ([ad4fcd4](https://github.com/flex-development/pathe/commit/ad4fcd46a92c84e07a78ba8afd9ee77054ac1278))
* **github:** add label `scope:install` ([91127d2](https://github.com/flex-development/pathe/commit/91127d2faa59a3e27c03500a03cc3d039f7850f9))
* **github:** add label `scope:internal` ([342a7ae](https://github.com/flex-development/pathe/commit/342a7ae3cfe1b0019b78922c03389e46799c44c9))
* **github:** add label `scope:lib` ([1674976](https://github.com/flex-development/pathe/commit/1674976888b326e863f9c4218a3d0806ade1a844))
* **github:** add label `status:triaged` ([114c323](https://github.com/flex-development/pathe/commit/114c32319d3266a7f05a80cc1d378550b9686f61))
* **tests:** update codecov config ([1f28267](https://github.com/flex-development/pathe/commit/1f28267a5159575affe99d06d1c0b0ceadc91cc1))
* **yarn:** bump yarn from 4.0.0-rc.14 to 4.0.0-rc.34 ([38cd316](https://github.com/flex-development/pathe/commit/38cd316d5a60920e101a838bc05725d91df701da))


### :zap: Refactors

* **internal:** `ERR_INVALID_ARG_TYPE` model ([43bc3ba](https://github.com/flex-development/pathe/commit/43bc3ba4d6ddffaf97b3f94d2e633527769de83d))

## [1.0.1](https://github.com/flex-development/pathe/compare/1.0.0...1.0.1) (2022-12-20)


### :robot: Continuous Integration

* **workflows:** [`ci`] fix `yarn` step ([031cab5](https://github.com/flex-development/pathe/commit/031cab59c7e6c70325e0b004b5c05460490d57d0))


### :bug: Fixes

* **interfaces:** make `ParsedPath` work as expected with `--exactOptionalPropertyTypes` ([066665a](https://github.com/flex-development/pathe/commit/066665a0072c91302d9fda396c607a5863ac4028))

## 1.0.0 (2022-12-16)


### :package: Build

* **deps-dev:** bump @vitest/coverage-c8 from 0.25.4 to 0.25.5 ([bddbfb1](https://github.com/flex-development/pathe/commit/bddbfb14373af65a8da37efbda784d18571bfa3e))
* **deps-dev:** bump @vitest/ui from 0.25.4 to 0.25.5 ([146ebb6](https://github.com/flex-development/pathe/commit/146ebb69628420c6b652c31265b9b08eb8a13282))
* **deps-dev:** bump esbuild from 0.15.18 to 0.16.6 ([572a453](https://github.com/flex-development/pathe/commit/572a4538ef91feaf036487c5794d8294fe52b011))
* **deps-dev:** bump vitest from 0.25.4 to 0.25.5 ([7902e9d](https://github.com/flex-development/pathe/commit/7902e9d9b91287000cbf73cf03d8a8f0b6ad4c4d))
* **utils:** export utilities from main entry point ([87385b7](https://github.com/flex-development/pathe/commit/87385b79af0496cf3883d8ce702b58dbb015dc39))


### :robot: Continuous Integration

* **deps:** Bump actions/checkout from 3.1.0 to 3.2.0 ([#1](https://github.com/flex-development/pathe/issues/1)) ([eec4bf9](https://github.com/flex-development/pathe/commit/eec4bf9f427dc9206ca42943fd6ffaadbe1d611a))
* **workflows:** upload coverage reports to codecov ([9814979](https://github.com/flex-development/pathe/commit/98149796bc36b58b73d9907bcd23c9bc7786cd88))


### :pencil: Documentation

* "what is this?", "when should i use this?", api, types ([368a3c8](https://github.com/flex-development/pathe/commit/368a3c839aa3f2d9a083dfde0ec89dff3daa878d))
* code coverage status ([6482dd9](https://github.com/flex-development/pathe/commit/6482dd9fcfe90b688ecc69b22b55861fb3e8ce46))
* **lib:** qa ([4594d4b](https://github.com/flex-development/pathe/commit/4594d4b1136f3823ae47daf5e1ac93bd65f32341))
* **utils:** qa ([c7e1d18](https://github.com/flex-development/pathe/commit/c7e1d18e80315e502c56a476118e2d9148adc928))


### :sparkles: Features

* `default`, `posix`, `win32` ([2021e44](https://github.com/flex-development/pathe/commit/2021e44ffe0285203471dc2dd736a4b38b5cee50))
* **interfaces:** `Pathe` ([037d1d6](https://github.com/flex-development/pathe/commit/037d1d653ec769ca99f76b08b052a0e81850ce21))
* **interfaces:** `PathObject` ([dabb689](https://github.com/flex-development/pathe/commit/dabb6894b13d7bbda8eee3b09ee16c797455ea77))
* **interfaces:** `PlatformPath` ([aa82c8b](https://github.com/flex-development/pathe/commit/aa82c8be9605daf204b20dc4655eb997101f0c16))
* **internal:** `ensurePosix` ([12e2a26](https://github.com/flex-development/pathe/commit/12e2a269ad933cf769e132d47f405e990d5fec39))
* **internal:** `ERR_INVALID_ARG_TYPE` ([27696dc](https://github.com/flex-development/pathe/commit/27696dc65e496080318d49e59af394aa14ea4a3e))
* **internal:** `formatExt` ([6287a90](https://github.com/flex-development/pathe/commit/6287a90078370787755863939e2f17c6c658a207))
* **internal:** `isDrivePath` ([1e6f18d](https://github.com/flex-development/pathe/commit/1e6f18d5e394a8c9f0f22b9faef1afa9b78a97bf))
* **internal:** `isSep` ([3ece912](https://github.com/flex-development/pathe/commit/3ece912d995366c0b30d564f082c24c6807c0181))
* **internal:** `isUncPath` ([521bdd9](https://github.com/flex-development/pathe/commit/521bdd9727e949983524d8a9a94ab9fc96ab2439))
* **internal:** `NodeError` ([0900ed4](https://github.com/flex-development/pathe/commit/0900ed4c3a42c0fd6224b3c8504d6cd645bec994))
* **internal:** `normalizeString` ([1cf683e](https://github.com/flex-development/pathe/commit/1cf683e314a2c3f22ffdef934bb31f98af75fa82))
* **internal:** `validateObject` ([7aae60f](https://github.com/flex-development/pathe/commit/7aae60f336e77286eed675efbaaeede1384f7168))
* **internal:** `validateString` ([1eae687](https://github.com/flex-development/pathe/commit/1eae687291e74acc7b4f352f9bd63e9d2576d623))
* **lib:** `basename` ([844df0b](https://github.com/flex-development/pathe/commit/844df0bf7fdeac365e2c5899d64ac59b1eadf16e))
* **lib:** `delimiter` ([a4e7c00](https://github.com/flex-development/pathe/commit/a4e7c00101f88820dc7bdbc683beaab2c0dc9b5d))
* **lib:** `dirname` ([18d449a](https://github.com/flex-development/pathe/commit/18d449af8a5ece7f3f67012d9e93ac6d2bd9a328))
* **lib:** `extname` ([e710004](https://github.com/flex-development/pathe/commit/e710004dfee3a01e77283422a5aab71354fab4df))
* **lib:** `format` ([56e3061](https://github.com/flex-development/pathe/commit/56e3061e4d864d33869482740566c895fc643691))
* **lib:** `isAbsolute` ([df42e5c](https://github.com/flex-development/pathe/commit/df42e5c00f7e8190d692e49729bd74b608b9a12d))
* **lib:** `join` ([78a41a2](https://github.com/flex-development/pathe/commit/78a41a2be736af4401568ff1a51417d21b4b5d78))
* **lib:** `normalize` ([d937719](https://github.com/flex-development/pathe/commit/d93771982af37fb042f5db59d0fd1298a660e0be))
* **lib:** `parse` ([98c393a](https://github.com/flex-development/pathe/commit/98c393a5f9bb11253181532a224bd4a99a38b00e))
* **lib:** `relative` ([89bb9f8](https://github.com/flex-development/pathe/commit/89bb9f89aa454edb339471713b700acad1aff189))
* **lib:** `resolve` ([e3aeab3](https://github.com/flex-development/pathe/commit/e3aeab3b438d099f5e274369c859acb312876701))
* **lib:** `sep` ([3f2df46](https://github.com/flex-development/pathe/commit/3f2df46c37eb18f8b1052d7957c061fa6e295c44))
* **lib:** `toNamespacedPath` ([6a8e59c](https://github.com/flex-development/pathe/commit/6a8e59c9d40c2683d263d8ca674eabec5fe6c244))
* **types:** `Delimiter` ([ee790c3](https://github.com/flex-development/pathe/commit/ee790c3e7afe2cdc9b296eb6604b2995db620f5e))
* **types:** `Ext` ([6fb7173](https://github.com/flex-development/pathe/commit/6fb7173fd9781d64f985da62e3e360299c17bec1))
* **types:** `Sep` ([054b623](https://github.com/flex-development/pathe/commit/054b623fefe35a88de4eb3dd11dfede1bd303db3))
* **utils:** `addExt` ([e4b3ad8](https://github.com/flex-development/pathe/commit/e4b3ad8685431152c43efe961bba3e9acf3f6e03))
* **utils:** `changeExt` ([10b1917](https://github.com/flex-development/pathe/commit/10b1917ae5750100888899bc1f0645b45d848851))
* **utils:** `defaultExt` ([582e287](https://github.com/flex-development/pathe/commit/582e287137cd2b9460044f9e825b4a8ed457a0fa))
* **utils:** `removeExt` ([de150ee](https://github.com/flex-development/pathe/commit/de150ee4ece55c00d8abc956f788baf4bc0385f0))


### :bug: Fixes

* **interfaces:** [`PlatformPath`] interface import statements ([b2e088f](https://github.com/flex-development/pathe/commit/b2e088f690257ec723c20f3f40bffa686a49d110))
* **lib:** [`format`] empty string handling ([5f0de54](https://github.com/flex-development/pathe/commit/5f0de54176e481c59d16320531bf2080e39d2aad))
* **lib:** [`resolve`] drive-specific current working directory fallback ([4263bf9](https://github.com/flex-development/pathe/commit/4263bf9f224025df39cb614ae9c124eee876d339))


### :house_with_garden: Housekeeping

* cleanup build config ([c0ada79](https://github.com/flex-development/pathe/commit/c0ada79d8fa8dfbeb960275272d0bf36cf6a5eb3))
* **github:** add commit scope `interfaces` ([c1d491b](https://github.com/flex-development/pathe/commit/c1d491bee529cae367f1b7934a793b29fa1678fd))
* **github:** add commit scope `types` ([785ba57](https://github.com/flex-development/pathe/commit/785ba575ef3ece2e8cdf11ddb6c531a5aeed1ab2))
* **pkg:** add keyword `forwardslash` ([28bad87](https://github.com/flex-development/pathe/commit/28bad87003bf2c9427d88f32bec7e67e437a9ef5))
* **tests:** local codecov integration ([6bc2306](https://github.com/flex-development/pathe/commit/6bc23062f3c86973d37522e95da696de7b3fbc9d))
* **tests:** qa ([effc686](https://github.com/flex-development/pathe/commit/effc686bb57da47ff3aa90ad38cd272b1a95129a))
* **utils:** fix test names ([78404f5](https://github.com/flex-development/pathe/commit/78404f5f3681657af6409eaa4f4e701ea59913db))


### :zap: Refactors

* **lib:** qa ([f61889c](https://github.com/flex-development/pathe/commit/f61889c35840239cbf839099e52f2f3126469c81))
* **utils:** [`changeExt`] allow file extension removal ([3d069cb](https://github.com/flex-development/pathe/commit/3d069cb584b7d21434c9aaa55eb4c60ca26e37b8))
* **utils:** expose `formatExt` as utility ([e58f9e2](https://github.com/flex-development/pathe/commit/e58f9e287ae9bc20b41e680e24f2c04239b4bcd8))
* **utils:** qa ([fda2454](https://github.com/flex-development/pathe/commit/fda2454660f85ad27b97c422bab42a751bf46c5c))


### :white_check_mark: Testing

* **lib:** add type tests ([8f3d59e](https://github.com/flex-development/pathe/commit/8f3d59e16201db971eaf02580bdaaa2c58d84f4b))
