# Changelog

## 2.0.0 (2025-07-07)

Full Changelog: [v2.0.0-alpha.1...v2.0.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.0.0-alpha.1...v2.0.0)

### Bug Fixes

* handle docker image not existing yet ([426dbae](https://github.com/scorecard-ai/scorecard-node/commit/426dbae9bb6748bdf52a1440682e764a831af2f0))


### Chores

* add docs to RequestOptions type ([22f2664](https://github.com/scorecard-ai/scorecard-node/commit/22f2664cb28bb63319de8f87550f864f837eb697))
* **ci:** only run for pushes and fork pull requests ([032e48f](https://github.com/scorecard-ai/scorecard-node/commit/032e48fc1a89bbcf5fad8dd51cc9fe0d80f54b36))
* **client:** improve path param validation ([2f114c6](https://github.com/scorecard-ai/scorecard-node/commit/2f114c6f69039afd1b51d93adf678288b8e31334))

## 2.0.0-alpha.1 (2025-06-27)

Full Changelog: [v1.2.0...v2.0.0-alpha.1](https://github.com/scorecard-ai/scorecard-node/compare/v1.2.0...v2.0.0-alpha.1)

### ⚠ BREAKING CHANGES

* **systems:** Make systems easier to use in the SDK

### Features

* **systems:** Make systems easier to use in the SDK ([8cbfd9c](https://github.com/scorecard-ai/scorecard-node/commit/8cbfd9ccf7265f68567b221d52c66516be4c54f4))


### Bug Fixes

* **ci:** release-doctor — report correct token name ([0e0fae0](https://github.com/scorecard-ai/scorecard-node/commit/0e0fae04c2ac06cbdca915926531ea1373211942))
* **client:** get fetchOptions type more reliably ([ee33f92](https://github.com/scorecard-ai/scorecard-node/commit/ee33f92c86ecebab26c6e56f595395b7fc7d49a6))

## 1.2.0 (2025-06-24)

Full Changelog: [v1.1.0...v1.2.0](https://github.com/scorecard-ai/scorecard-node/compare/v1.1.0...v1.2.0)

### Features

* **api:** api update ([a882c45](https://github.com/scorecard-ai/scorecard-node/commit/a882c45df73b0dc4854d0922de2202c672f526de))
* **client:** add support for endpoint-specific base URLs ([b2321da](https://github.com/scorecard-ai/scorecard-node/commit/b2321da0938526fe28f41eea50199463a281a0b9))
* **mcp:** set X-Stainless-MCP header ([12e61c2](https://github.com/scorecard-ai/scorecard-node/commit/12e61c2e9875a592cc60472deba4d94371bf2c85))


### Bug Fixes

* **auth:** Use bearer auth for API keys ([db2f132](https://github.com/scorecard-ai/scorecard-node/commit/db2f13247584f167b984eb5c791df776af636f6e))
* **client:** explicitly copy fetch in withOptions ([acd9531](https://github.com/scorecard-ai/scorecard-node/commit/acd953180b4c22962464b1ba435132a71e19ded3))
* publish script — handle NPM errors correctly ([862309d](https://github.com/scorecard-ai/scorecard-node/commit/862309d31da4807bfc106666e8a10619b775fdf9))


### Chores

* **ci:** enable for pull requests ([7fc40c6](https://github.com/scorecard-ai/scorecard-node/commit/7fc40c6fdd7839fd045027dc4814c83cba5833eb))
* **client:** refactor imports ([47ab4a2](https://github.com/scorecard-ai/scorecard-node/commit/47ab4a2f84198fdc9450e325f8580a636a6398c2))
* **internal:** add pure annotations, make base APIResource abstract ([507c372](https://github.com/scorecard-ai/scorecard-node/commit/507c372bce850ad5af615f05cbf5ef637ffafca2))
* **internal:** codegen related update ([1d07a29](https://github.com/scorecard-ai/scorecard-node/commit/1d07a298cfc7bbd997ba41c852184f5c34f0e739))
* **readme:** update badges ([bb0aef2](https://github.com/scorecard-ai/scorecard-node/commit/bb0aef287db5e1f8421153afac49759a82d59c2c))
* **readme:** use better example snippet for undocumented params ([62d2bf0](https://github.com/scorecard-ai/scorecard-node/commit/62d2bf00cf0147a6ee649c32cdcb25ae06bcedcb))


### Refactors

* **types:** replace Record with mapped types ([9aed086](https://github.com/scorecard-ai/scorecard-node/commit/9aed0866ef19e1b068bd960663ade0c4d5763be0))

## 1.1.0 (2025-06-13)

Full Changelog: [v1.0.0...v1.1.0](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0...v1.1.0)

### Features

* **api:** api update ([8ce317e](https://github.com/scorecard-ai/scorecard-node/commit/8ce317e5b754b04853c6371919f02aba4a85d125))
* **api:** api update ([c84cb8f](https://github.com/scorecard-ai/scorecard-node/commit/c84cb8f3bbc399adfa26b0171beda31f2dfc4941))
* **sdk:** Support Clerk API Keys in SDK ([10ff885](https://github.com/scorecard-ai/scorecard-node/commit/10ff885b8130ad7ce4387e1ff6a61185a3fc2359))


### Bug Fixes

* **tests:** Fix API key tests ([7d5809f](https://github.com/scorecard-ai/scorecard-node/commit/7d5809f85f51871b90d80533b1d4c923d98253c5))


### Chores

* **auth:** Add backwards-compatibility for bearer token auth ([1aea8fd](https://github.com/scorecard-ai/scorecard-node/commit/1aea8fd2787abb4d682dabbb78d46bbf72859ba2))
* **mcp:** provides high-level initMcpServer function and exports known clients ([f3857b2](https://github.com/scorecard-ai/scorecard-node/commit/f3857b22ac26f422e0eda1c36828c46e95fc6df5))

## 1.0.0 (2025-06-10)

Full Changelog: [v1.0.0-alpha.9...v1.0.0](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.9...v1.0.0)

### Features

* **api:** Add trials option to runAndEvaluate ([eeb1bc8](https://github.com/scorecard-ai/scorecard-node/commit/eeb1bc8a88be832ac656fb9b9c4b67d3b460c1f5))
* **api:** api update ([6fd70fc](https://github.com/scorecard-ai/scorecard-node/commit/6fd70fc020ae6aa9cf31b98461022cc7a44553e2))
* **api:** api update ([9e4e9b2](https://github.com/scorecard-ai/scorecard-node/commit/9e4e9b2fec99eb891eec329c802706a658738f34))
* **api:** api update ([4bdef92](https://github.com/scorecard-ai/scorecard-node/commit/4bdef9247921bb162891458bc9b7fd00fdff496e))


### Chores

* **api:** Improve variant names in SDK for creating metrics ([d5feb7f](https://github.com/scorecard-ai/scorecard-node/commit/d5feb7f3292689880086101b66359fe629ed6d77))

## 1.0.0-alpha.9 (2025-06-09)

Full Changelog: [v1.0.0-alpha.8...v1.0.0-alpha.9](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.8...v1.0.0-alpha.9)

### Features

* **api:** Add optional systemConfigId parameter to runAndEvaluate() ([b6e85be](https://github.com/scorecard-ai/scorecard-node/commit/b6e85be53a905db8d11e6689b3cec282b8ce1849))
* **api:** api update ([cc84c1f](https://github.com/scorecard-ai/scorecard-node/commit/cc84c1f3e481124110878c89926f44d6c486ebf6))
* **api:** api update ([57e5b5d](https://github.com/scorecard-ai/scorecard-node/commit/57e5b5d63d695844737dc3a854a5e4eccf4e47fd))
* **api:** api update ([153fc6a](https://github.com/scorecard-ai/scorecard-node/commit/153fc6a455a64df0014d6ff087e833f6cb77912a))
* **api:** Simplify usage of runAndEvaluate ([67ca33e](https://github.com/scorecard-ai/scorecard-node/commit/67ca33e4936c678c1cdb591a820725a773efe2bf))
* **mcp:** implement support for binary responses ([55d897d](https://github.com/scorecard-ai/scorecard-node/commit/55d897d789bbb0d216a91ab26613cba80901de78))
* **mcp:** include http information in tools ([8291d15](https://github.com/scorecard-ai/scorecard-node/commit/8291d156b7c72188783a63a1495f6cd63eb3c9bc))


### Bug Fixes

* compat with more runtimes ([4346099](https://github.com/scorecard-ai/scorecard-node/commit/43460997d80f53d73b395105daf4a8a0f41e5055))


### Chores

* adjust eslint.config.mjs ignore pattern ([3ab4613](https://github.com/scorecard-ai/scorecard-node/commit/3ab46135ec7a7961f5c20e73b1fd7dd731690321))
* avoid type error in certain environments ([e79eeaf](https://github.com/scorecard-ai/scorecard-node/commit/e79eeafa2fd7d5bc5614b662b89656e4594df0d8))
* **deps:** bump eslint-plugin-prettier ([a84f7c6](https://github.com/scorecard-ai/scorecard-node/commit/a84f7c660580e5fd74b446a72eaf119ace665bfe))
* **docs:** use top-level-await in example snippets ([b71609b](https://github.com/scorecard-ai/scorecard-node/commit/b71609b7827c7cc95a7eb5833846f2d1635c5de9))
* **internal:** fix readablestream types in node 20 ([8742139](https://github.com/scorecard-ai/scorecard-node/commit/87421393e9decd4dbc9e76972b46d48b7035f021))
* **internal:** update jest config ([2652de2](https://github.com/scorecard-ai/scorecard-node/commit/2652de2211bbdc924d7450a61fe0aa94dd63b779))
* **mcp:** remove duplicate assignment ([cb28216](https://github.com/scorecard-ai/scorecard-node/commit/cb282169b15a31c095e07453d45ba1d9900640e4))

## 1.0.0-alpha.8 (2025-05-28)

Full Changelog: [v1.0.0-alpha.7...v1.0.0-alpha.8](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.7...v1.0.0-alpha.8)

### Features

* **api:** api update ([905c5a8](https://github.com/scorecard-ai/scorecard-node/commit/905c5a8641ca77d5f2aa2641fc3e68fe0c2c7c44))
* **api:** api update ([190fae8](https://github.com/scorecard-ai/scorecard-node/commit/190fae88b84c78198ccb2cd6ddbb53080719e32f))
* **mcp:** support initializing the server with an "environment" ([afe4d1a](https://github.com/scorecard-ai/scorecard-node/commit/afe4d1ad6972cceeddcdbd817bcdc1a88f9cf488))


### Bug Fixes

* **mcp:** fix cursor schema transformation issue with recursive references ([71c5d94](https://github.com/scorecard-ai/scorecard-node/commit/71c5d943881cf7be9f8ead2627b0a0219a238623))
* **mcp:** include description in dynamic tool search ([e5fdd16](https://github.com/scorecard-ai/scorecard-node/commit/e5fdd16e7c25a01a89fddaf0c0952babf91ab8d7))


### Chores

* **docs:** grammar improvements ([2c0f752](https://github.com/scorecard-ai/scorecard-node/commit/2c0f75238923168e0647cc1bb8b36415d36a8d9e))
* improve docs for MCP servers ([230c8e8](https://github.com/scorecard-ai/scorecard-node/commit/230c8e898594a2d450660d6f7737a0ef3e4d8ba0))
* improve publish-npm script --latest tag logic ([cf817be](https://github.com/scorecard-ai/scorecard-node/commit/cf817be6ef6c5230ae018348da9dd59bcbebd04c))
* **internal:** codegen related update ([075ebd9](https://github.com/scorecard-ai/scorecard-node/commit/075ebd9f706885fd3a2de5b9136ca9a1c3cf9be9))

## 1.0.0-alpha.7 (2025-05-13)

Full Changelog: [v1.0.0-alpha.6...v1.0.0-alpha.7](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.6...v1.0.0-alpha.7)

### Features

* **api:** api update ([f6b652b](https://github.com/scorecard-ai/scorecard-node/commit/f6b652b87630b2f306a2a4922205ca450b7eedb3))
* **api:** api update ([0ff85b8](https://github.com/scorecard-ai/scorecard-node/commit/0ff85b8ddc3005e50d04f620d44b0162fbd3fd94))
* **client:** add withOptions helper ([56e0f9c](https://github.com/scorecard-ai/scorecard-node/commit/56e0f9c32bf0130a7545f60dad6eed441f3866ad))
* **mcp:** support dynamically discovering and invoking tools for APIs with many endpoints ([22437b5](https://github.com/scorecard-ai/scorecard-node/commit/22437b5067e5f8fd7479034d6280f6fb49362c7f))


### Bug Fixes

* **client:** always overwrite when merging headers ([de3b63b](https://github.com/scorecard-ai/scorecard-node/commit/de3b63b99bcca80ac6e54d67ff0467fc5d615f73))
* **mcp:** explicitly include zod and zod-to-json-schema in package.json ([2f30046](https://github.com/scorecard-ai/scorecard-node/commit/2f3004614cbc35c7749390002af24b5beeae0909))


### Chores

* **build:** automatically build subpackages if present ([223b984](https://github.com/scorecard-ai/scorecard-node/commit/223b984ed430956069773e6f2f1a65aa6a609529))
* **client:** drop support for EOL node versions ([890a4d4](https://github.com/scorecard-ai/scorecard-node/commit/890a4d46be6e11c1b7506823dfc8a46d69083730))
* **internal:** codegen related update ([b39db5c](https://github.com/scorecard-ai/scorecard-node/commit/b39db5c8e5882fddf583fd622a95939a9548c128))
* **package:** remove engines ([20fc043](https://github.com/scorecard-ai/scorecard-node/commit/20fc043014fe172060b75cdc5410f7c06350a04b))
* **tests:** use node 22 for CI tests ([957e055](https://github.com/scorecard-ai/scorecard-node/commit/957e055f59ddba2e375f2ad45a18f561e454e56d))


### Documentation

* add examples to tsdocs ([8dfe1fc](https://github.com/scorecard-ai/scorecard-node/commit/8dfe1fce29d01af68f7980b49b6d59c108b246d6))
* **readme:** Fix example in README ([63d840a](https://github.com/scorecard-ai/scorecard-node/commit/63d840a49f0255bab4250dfb9357ec4486056528))
* **readme:** Update documentation URL ([33ef359](https://github.com/scorecard-ai/scorecard-node/commit/33ef359a0ae780960bb9d4e0c1e228f90f168f3f))

## 1.0.0-alpha.6 (2025-05-06)

Full Changelog: [v1.0.0-alpha.5...v1.0.0-alpha.6](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.5...v1.0.0-alpha.6)

### Features

* **api:** api update ([d61535d](https://github.com/scorecard-ai/scorecard-node/commit/d61535d733f708ed0241a76d8b38003e61532204))

## 1.0.0-alpha.5 (2025-05-05)

Full Changelog: [v1.0.0-alpha.4...v1.0.0-alpha.5](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.4...v1.0.0-alpha.5)

### Bug Fixes

* **mcp:** remove ajv dependency so MCP servers are more compatible with Cloudflare Workers ([26ebd14](https://github.com/scorecard-ai/scorecard-node/commit/26ebd140950781f0d5e428dd5dd572fe2c61af67))


### Chores

* **internal:** share typescript helpers ([b7723ba](https://github.com/scorecard-ai/scorecard-node/commit/b7723bab0eb095e9be8d616a8ce6a3e5596e5266))

## 1.0.0-alpha.4 (2025-05-02)

Full Changelog: [v1.0.0-alpha.3...v1.0.0-alpha.4](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.3...v1.0.0-alpha.4)

### Features

* **api:** api update ([1b42c49](https://github.com/scorecard-ai/scorecard-node/commit/1b42c49f6895ec8055ccf588eab62bb7c098a3d8))
* **api:** api update ([857cb9e](https://github.com/scorecard-ai/scorecard-node/commit/857cb9e8f34f621c18407b79f669ad6591a145d3))


### Documentation

* **readme:** fix typo ([560b41a](https://github.com/scorecard-ai/scorecard-node/commit/560b41acab79e40f72b3de72e5f582bc057854fa))

## 1.0.0-alpha.3 (2025-04-29)

Full Changelog: [v1.0.0-alpha.2...v1.0.0-alpha.3](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.2...v1.0.0-alpha.3)

### Features

* **api:** api update ([f2df618](https://github.com/scorecard-ai/scorecard-node/commit/f2df618954f039117d870cb6fa8734e62776a84f))
* **api:** api update ([ae1985b](https://github.com/scorecard-ai/scorecard-node/commit/ae1985bd513f02caf3382dd20acc63e4a6370b27))


### Chores

* **internal:** refactor utils ([1a9afde](https://github.com/scorecard-ai/scorecard-node/commit/1a9afde939ebbce8c434dd61bb4b1a733c61e00a))

## 1.0.0-alpha.2 (2025-04-28)

Full Changelog: [v1.0.0-alpha.1...v1.0.0-alpha.2](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.1...v1.0.0-alpha.2)

### Features

* **api:** api update ([26ae98b](https://github.com/scorecard-ai/scorecard-node/commit/26ae98b91538ce727efd7288df80916704539d16))
* **api:** api update ([9ad189f](https://github.com/scorecard-ai/scorecard-node/commit/9ad189fda560264c0960fc75c9d9c8826c81009c))
* **api:** manual updates ([6d48d56](https://github.com/scorecard-ai/scorecard-node/commit/6d48d561d0890f007939fb06e866111a24e67be1))
* **api:** manual updates ([660be58](https://github.com/scorecard-ai/scorecard-node/commit/660be580e34deeb4e0ec6f682c8bd4303bd1dbb1))
* **api:** manual updates ([351b710](https://github.com/scorecard-ai/scorecard-node/commit/351b710742e4c13ae6ee91be2a742b9c20239bc5))


### Bug Fixes

* update README examples ([86a1f18](https://github.com/scorecard-ai/scorecard-node/commit/86a1f188ac1f99612255b67682009256fe388ac1))

## 1.0.0-alpha.1 (2025-04-25)

Full Changelog: [v1.0.0-alpha.0...v1.0.0-alpha.1](https://github.com/scorecard-ai/scorecard-node/compare/v1.0.0-alpha.0...v1.0.0-alpha.1)

### Features

* **api:** api update ([f0968b6](https://github.com/scorecard-ai/scorecard-node/commit/f0968b69700ec4a8058b516cf58897ef212514c2))
* **api:** api update ([b056fe5](https://github.com/scorecard-ai/scorecard-node/commit/b056fe595ba94de7267b4978dc1dc223d328ed9e))
* **api:** api update ([70f6d38](https://github.com/scorecard-ai/scorecard-node/commit/70f6d3866dcce23550b7765286a93df225dc566b))
* **api:** api update ([3150074](https://github.com/scorecard-ai/scorecard-node/commit/3150074e245f3f375a51f80912acf3bf6ef87c26))
* **api:** api update ([6952b48](https://github.com/scorecard-ai/scorecard-node/commit/6952b48af87c0c27fea668c2a110f2f9177c1d2d))
* **api:** api update ([4e2d7d8](https://github.com/scorecard-ai/scorecard-node/commit/4e2d7d8bf812491ca94adb4fc39c4cdaca118d52))
* **api:** api update ([3a57bbd](https://github.com/scorecard-ai/scorecard-node/commit/3a57bbd8e0ff7b553431819c141a82c7f2dc8104))
* **api:** api update ([0c18f83](https://github.com/scorecard-ai/scorecard-node/commit/0c18f8326fa85f2a14a996c330f496c367fa7c36))
* **api:** api update ([676b10f](https://github.com/scorecard-ai/scorecard-node/commit/676b10f7b89806e6fec4b29e3f9692e0bdef0583))
* **api:** api update ([c033583](https://github.com/scorecard-ai/scorecard-node/commit/c033583c79940151a8bfdbb02cef44e263715c5b))
* **api:** fix bulk testcases delete endpoint ([22a5206](https://github.com/scorecard-ai/scorecard-node/commit/22a5206d3a408dc3436b432d926b2d9298387d1e))


### Chores

* **ci:** add timeout thresholds for CI jobs ([be60867](https://github.com/scorecard-ai/scorecard-node/commit/be60867f34e9c551db0498af5a0f0d461a807027))
* **ci:** only use depot for staging repos ([6009e6a](https://github.com/scorecard-ai/scorecard-node/commit/6009e6ab7fd194f66ce990045e22922c12f90de2))
* **client:** minor internal fixes ([28b041e](https://github.com/scorecard-ai/scorecard-node/commit/28b041ef0610a90076088b0447fd5ba8b8b67919))
* go live ([4057bd9](https://github.com/scorecard-ai/scorecard-node/commit/4057bd9a512260710cd9cb6456175ebd6322964a))
* **internal:** codegen related update ([8d29dbd](https://github.com/scorecard-ai/scorecard-node/commit/8d29dbd1d0737b35bc41b5e17aabcbe3e8e0c899))
* **perf:** faster base64 decoding ([a3208e7](https://github.com/scorecard-ai/scorecard-node/commit/a3208e7461705c8525f4bf2bdf18d874266e85f9))
* update SDK settings ([3881b0f](https://github.com/scorecard-ai/scorecard-node/commit/3881b0f941193cdc7711606190d2072af858066a))
* update SDK settings ([fc0a269](https://github.com/scorecard-ai/scorecard-node/commit/fc0a269e21f52ba1dcc6f08df0e4f4c95b7e32a5))
* update SDK settings ([affa597](https://github.com/scorecard-ai/scorecard-node/commit/affa5972d77874a20cd6ccd9c7a538bdd865f453))
* update SDK settings ([7d9cb03](https://github.com/scorecard-ai/scorecard-node/commit/7d9cb03544331910b1973869575df2bb123a2385))
* update SDK settings ([358f860](https://github.com/scorecard-ai/scorecard-node/commit/358f86027f87953c19ee5ff9dd6d00f99407ce1a))
* update SDK settings ([08e6f1d](https://github.com/scorecard-ai/scorecard-node/commit/08e6f1d25f1f379ab8ff7083fad9d57ed6cedfc4))
* update SDK settings ([5523808](https://github.com/scorecard-ai/scorecard-node/commit/55238082ca6d74ee46191fe1190155c11fbfe2a7))
* update SDK settings ([8c98a2f](https://github.com/scorecard-ai/scorecard-node/commit/8c98a2f036724a0208106988465eafb1be898351))
* update SDK settings ([288b6a1](https://github.com/scorecard-ai/scorecard-node/commit/288b6a16de6cf78b888420225b6b6b220c44d356))

## 1.0.0-alpha.0 (2025-04-11)

Full Changelog: [v0.0.1-alpha.0...v1.0.0-alpha.0](https://github.com/scorecard-ai/scorecard-node/compare/v0.0.1-alpha.0...v1.0.0-alpha.0)

### Bug Fixes

* update README examples ([86a1f18](https://github.com/scorecard-ai/scorecard-node/commit/86a1f188ac1f99612255b67682009256fe388ac1))


### Chores

* go live ([02f09a8](https://github.com/scorecard-ai/scorecard-node/commit/02f09a8378c8b08d8b805500dbfcc3d3167067cc))
* sync repo ([b26456f](https://github.com/scorecard-ai/scorecard-node/commit/b26456fabe267c35e206d4340d059d4f5f0f9a4b))
* update SDK settings ([fe6f241](https://github.com/scorecard-ai/scorecard-node/commit/fe6f241fcc96af91638fb176491d6187155d0894))
