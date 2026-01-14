# Changelog

## 3.0.0-beta.0 (2026-01-14)

Full Changelog: [v2.6.0...v3.0.0-beta.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.6.0...v3.0.0-beta.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* Add telemetry wrappers around Anthropic and OpenAI SDKs ([#31](https://github.com/scorecard-ai/scorecard-node/issues/31)) ([bb4dfe5](https://github.com/scorecard-ai/scorecard-node/commit/bb4dfe590993bfb07d28a1db96622f86654366d6))
* **mcp:** Use Scorecard API key from MCP client when executing code tool ([741fbdd](https://github.com/scorecard-ai/scorecard-node/commit/741fbdd38c9becc69f4e7a6de845dcff556434df))


### Bug Fixes

* **mcp:** correct code tool api output types ([c3983d7](https://github.com/scorecard-ai/scorecard-node/commit/c3983d734ccbe019061105f99ba6b2b8727e8b0f))
* **mcp:** fix env parsing ([22c7368](https://github.com/scorecard-ai/scorecard-node/commit/22c73681d18660d972a9836fe20926b5d402b534))
* **mcp:** fix options parsing ([c19c6e3](https://github.com/scorecard-ai/scorecard-node/commit/c19c6e3a2da944a83b55419acb2c72ae9a1e1f9d))
* **mcp:** pass base url to code tool ([2a855d6](https://github.com/scorecard-ai/scorecard-node/commit/2a855d651ec9260455d9b1172cf543f9a334c6b8))
* **mcp:** update code tool prompt ([cec30f5](https://github.com/scorecard-ai/scorecard-node/commit/cec30f5761b9af71a10bdbe0a5aacff277c4a04b))


### Chores

* break long lines in snippets into multiline ([6eb4de7](https://github.com/scorecard-ai/scorecard-node/commit/6eb4de7c08e0f14041714c8fb93aba4b1ab8de1a))
* **internal:** codegen related update ([e1a1b97](https://github.com/scorecard-ai/scorecard-node/commit/e1a1b97a6516933282ba19368dfcd4abb6adecb6))
* **internal:** codegen related update ([5c31e8f](https://github.com/scorecard-ai/scorecard-node/commit/5c31e8f81cbc97a6ade6567e9342231b79333eb9))
* **internal:** codegen related update ([d638ee7](https://github.com/scorecard-ai/scorecard-node/commit/d638ee7d5c8d6c7a61e98f261a4aec42f57d1202))
* **internal:** codegen related update ([8a98749](https://github.com/scorecard-ai/scorecard-node/commit/8a987491b973353fb77457075e3dbbd5d462c8bc))
* **internal:** codegen related update ([32953e6](https://github.com/scorecard-ai/scorecard-node/commit/32953e6cf9066fb0952863950cd63575bf52435c))
* **mcp:** remove deprecated tool schemes ([7175afa](https://github.com/scorecard-ai/scorecard-node/commit/7175afa508ca459c54ade311ecb970b316c1cc87))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([2c59b3f](https://github.com/scorecard-ai/scorecard-node/commit/2c59b3f39f3d14b27b2f13f6183437446c25bb54))

## 2.6.0 (2025-12-11)

Full Changelog: [v2.5.0...v2.6.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.5.0...v2.6.0)

### Features

* **mcp:** add detail field to docs search tool ([afc8771](https://github.com/scorecard-ai/scorecard-node/commit/afc87715efc8c2d9a0f1036a14bcd45dc08caa6a))
* **mcp:** add typescript check to code execution tool ([66ce58c](https://github.com/scorecard-ai/scorecard-node/commit/66ce58cfa2aaa3181d0fb140115d70b3af9884b7))
* **mcp:** handle code mode calls in the Stainless API ([4be5747](https://github.com/scorecard-ai/scorecard-node/commit/4be5747af5aba794699aff2da666a73b889075e8))
* **mcp:** return logs on code tool errors ([128a9ef](https://github.com/scorecard-ai/scorecard-node/commit/128a9efb7130a6a4b13ff873bce99854de0c0dd9))


### Bug Fixes

* **mcp:** add client instantiation options to code tool ([77a3376](https://github.com/scorecard-ai/scorecard-node/commit/77a33762a7a0e36366fe6f1024e6da3b8f977573))
* **mcp:** correct code tool API endpoint ([f0f5f1f](https://github.com/scorecard-ai/scorecard-node/commit/f0f5f1fb76c2b355a135708473079a9f1990451f))
* **mcp:** return correct lines on typescript errors ([fad6845](https://github.com/scorecard-ai/scorecard-node/commit/fad6845202c0dd139f11c448cde61776dfd43136))
* **mcp:** return tool execution error on api error ([d4b4401](https://github.com/scorecard-ai/scorecard-node/commit/d4b4401fab207d1a451b83c3cd6fe77e71ad6d58))


### Chores

* **client:** fix logger property type ([d43bcfe](https://github.com/scorecard-ai/scorecard-node/commit/d43bcfe0a71cfbb1d768ec6d49e7bb53a23538c2))
* **internal:** codegen related update ([fe5405e](https://github.com/scorecard-ai/scorecard-node/commit/fe5405e02ce59b3e444c3c01cdb2ea7935108acf))
* **internal:** codegen related update ([00036fd](https://github.com/scorecard-ai/scorecard-node/commit/00036fd4572de210c5070dd41632baa051c09b33))
* **internal:** upgrade eslint ([f06e917](https://github.com/scorecard-ai/scorecard-node/commit/f06e91729edfd67a6848516c4933c627babb7fb9))
* **mcp:** update lockfile ([d0a7a1c](https://github.com/scorecard-ai/scorecard-node/commit/d0a7a1cbd8945f00f3087da6c2011196cdadf03b))
* use latest @modelcontextprotocol/sdk ([77092e8](https://github.com/scorecard-ai/scorecard-node/commit/77092e83375aee411d49bd65a9807eb232673731))

## 2.5.0 (2025-11-13)

Full Changelog: [v2.4.1...v2.5.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.4.1...v2.5.0)

### Features

* **api:** api update ([360c099](https://github.com/scorecard-ai/scorecard-node/commit/360c0991f7ce2404c66b779015e733a5965d558e))
* **mcp:** enable optional code execution tool on http mcp servers ([c247909](https://github.com/scorecard-ai/scorecard-node/commit/c247909eb924952ae8be1ec172ef377a440e1734))


### Bug Fixes

* **mcp:** return tool execution error on jq failure ([cc71c76](https://github.com/scorecard-ai/scorecard-node/commit/cc71c76e5030a9218f824a8e3018034154660eee))


### Chores

* **internal:** codegen related update ([168e874](https://github.com/scorecard-ai/scorecard-node/commit/168e874af7d9d6fefff58ed07734c16eafcb6cc1))
* **internal:** codegen related update ([ed4964a](https://github.com/scorecard-ai/scorecard-node/commit/ed4964aba6ec909afe9ee0af7695d8c022e18da1))
* **internal:** grammar fix (it's -&gt; its) ([a17b423](https://github.com/scorecard-ai/scorecard-node/commit/a17b4234cd0c6feee1d0a1646da300d96d6b57d9))
* mcp code tool explicit error message when missing a run function ([3e8d4d4](https://github.com/scorecard-ai/scorecard-node/commit/3e8d4d4ebfa614a357caf2f643cecd306c1a7aea))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([c19f365](https://github.com/scorecard-ai/scorecard-node/commit/c19f3653af522bf49a90f0599372f544cb762052))
* **mcp:** add line numbers to code tool errors ([297cd6b](https://github.com/scorecard-ai/scorecard-node/commit/297cd6b8e2467ee79951eea52807d8e20ea05026))
* **mcp:** clarify http auth error ([80fc277](https://github.com/scorecard-ai/scorecard-node/commit/80fc277659876afbd91bf54860e49a24bcdc78c5))
* **mcp:** upgrade jq-web ([981de33](https://github.com/scorecard-ai/scorecard-node/commit/981de33536af6c7e31b1bf4def1465574f31b08f))
* use structured error when code execution tool errors ([84753e6](https://github.com/scorecard-ai/scorecard-node/commit/84753e6c2d4324479aeeb4dd85cec33a6802e995))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([7bfc26c](https://github.com/scorecard-ai/scorecard-node/commit/7bfc26c0d50662664c9ba5094981bd604e8afd81))
* **mcp:** add a README link to add server to VS Code or Claude Code ([e2b9a59](https://github.com/scorecard-ai/scorecard-node/commit/e2b9a59797ac0257a3ae33040809ba6d38b78037))

## 2.4.1 (2025-10-31)

Full Changelog: [v2.4.0...v2.4.1](https://github.com/scorecard-ai/scorecard-node/compare/v2.4.0...v2.4.1)

## 2.4.0 (2025-10-31)

Full Changelog: [v2.3.0...v2.4.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.3.0...v2.4.0)

## 2.3.0 (2025-10-31)

Full Changelog: [v2.2.0...v2.3.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.2.0...v2.3.0)

### Features

* **api:** api update ([516fbf7](https://github.com/scorecard-ai/scorecard-node/commit/516fbf7eafdadd9b1b9b05f07ef6d910b9891dfd))


### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([df5c711](https://github.com/scorecard-ai/scorecard-node/commit/df5c711562f4d4379c95c6348d6407ca9ae057b1))

## 2.2.0 (2025-10-10)

Full Changelog: [v2.1.1...v2.2.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.1.1...v2.2.0)

### Features

* **api:** api update ([2941de8](https://github.com/scorecard-ai/scorecard-node/commit/2941de87bd74904a46203346e7c9c198ef420d82))
* **api:** api update ([e5d64e1](https://github.com/scorecard-ai/scorecard-node/commit/e5d64e1fbbf683e03b3addc6c8ca3797af971707))
* **api:** api update ([86074e9](https://github.com/scorecard-ai/scorecard-node/commit/86074e92420460d0be8ccec33b72d5e8c76cd78e))
* **api:** api update ([6f36777](https://github.com/scorecard-ai/scorecard-node/commit/6f36777a3453083b274f9f9d7f3a7b92df56a53d))
* **mcp:** add docs search tool ([128fe09](https://github.com/scorecard-ai/scorecard-node/commit/128fe094fd9c7c1f8d752da2bfb5559dc6ed8195))
* **mcp:** add option for including docs tools ([ce1562b](https://github.com/scorecard-ai/scorecard-node/commit/ce1562bad99f2fa7156c77518c993b3bbfb540de))
* **mcp:** enable experimental docs search tool ([87fa22d](https://github.com/scorecard-ai/scorecard-node/commit/87fa22d1c0756459916f302c02d7e9505cfff1a4))


### Bug Fixes

* **ci:** set permissions for DXT publish action ([bcc505d](https://github.com/scorecard-ai/scorecard-node/commit/bcc505d3dd91ee756eb16e7789868c76c8a0d7d6))
* **mcp:** fix cli argument parsing logic ([78d3bc2](https://github.com/scorecard-ai/scorecard-node/commit/78d3bc2246a23eedf7714173f24834e7312c1e55))
* **mcp:** resolve a linting issue in server code ([47f8fc1](https://github.com/scorecard-ai/scorecard-node/commit/47f8fc162675233065c93c82018b0e9c2b07f27f))


### Performance Improvements

* faster formatting ([162877e](https://github.com/scorecard-ai/scorecard-node/commit/162877edb55321a21e29f38528e54faa68f279c3))


### Chores

* **codegen:** internal codegen update ([ba01054](https://github.com/scorecard-ai/scorecard-node/commit/ba010547ef14826c719477a97a5c8e929f7d1c03))
* do not install brew dependencies in ./scripts/bootstrap by default ([15a6bcc](https://github.com/scorecard-ai/scorecard-node/commit/15a6bcc92733aadb13a9035afc631fe6038121ef))
* extract some types in mcp docs ([5c22a49](https://github.com/scorecard-ai/scorecard-node/commit/5c22a49bc96245028aff1f0563913c4fa6d2e30d))
* **internal:** codegen related update ([391c649](https://github.com/scorecard-ai/scorecard-node/commit/391c649c02fda67cafd1bf792238602dc38c6ea8))
* **internal:** fix incremental formatting in some cases ([a0c253c](https://github.com/scorecard-ai/scorecard-node/commit/a0c253ca6e08f2e896392ac00248e807226d439f))
* **internal:** gitignore .mcpb files ([a68e9e2](https://github.com/scorecard-ai/scorecard-node/commit/a68e9e240c66f18a99f3667beb302d9a655045fc))
* **internal:** ignore .eslintcache ([4a8b4ad](https://github.com/scorecard-ai/scorecard-node/commit/4a8b4adb28d2199880d6001d63f54861a966bc66))
* **internal:** remove .eslintcache ([34e9d5d](https://github.com/scorecard-ai/scorecard-node/commit/34e9d5db9a8361b2dd6af76f6c1bfed253da91fd))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([09e0042](https://github.com/scorecard-ai/scorecard-node/commit/09e0042b339def906d2fec0e660e5e56bd934843))
* **internal:** use npm pack for build uploads ([294e90e](https://github.com/scorecard-ai/scorecard-node/commit/294e90e28fc718699114b8b509747619905782f7))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([cb39e99](https://github.com/scorecard-ai/scorecard-node/commit/cb39e99e842114a189377cfcbccc9455099285c1))
* **mcp:** allow pointing `docs_search` tool at other URLs ([84cde28](https://github.com/scorecard-ai/scorecard-node/commit/84cde28ea4f158fde8c97eaf259ad02bbc98138a))
* **mcp:** rename dxt to mcpb ([e2effef](https://github.com/scorecard-ai/scorecard-node/commit/e2effeff4fa50d26f47d1a58a268e4e5eae3159d))
* update lockfile ([077d5a1](https://github.com/scorecard-ai/scorecard-node/commit/077d5a1700eaa676662aa7904ffdda29d97e2305))

## 2.1.1 (2025-09-12)

Full Changelog: [v2.1.0...v2.1.1](https://github.com/scorecard-ai/scorecard-node/compare/v2.1.0...v2.1.1)

### Bug Fixes

* **mcp:** fix uploading dxt release assets ([8a288b5](https://github.com/scorecard-ai/scorecard-node/commit/8a288b5cd886103bb3da2b5ccefb5d882f33b637))


### Chores

* Add server.json for MCP registry ([8bffdd4](https://github.com/scorecard-ai/scorecard-node/commit/8bffdd43055115253375b45a68060b6206fcd005))
* **mcp:** upload dxt as release asset ([5429689](https://github.com/scorecard-ai/scorecard-node/commit/5429689e34c8f1db4f460fcd793081d8ee928c83))

## 2.1.0 (2025-09-09)

Full Changelog: [v2.0.0...v2.1.0](https://github.com/scorecard-ai/scorecard-node/compare/v2.0.0...v2.1.0)

### Features

* **mcp:** add code execution tool ([984a944](https://github.com/scorecard-ai/scorecard-node/commit/984a944cd37665bd5de5efcbb32507783801aa33))
* **mcp:** add logging when environment variable is set ([57b9f1e](https://github.com/scorecard-ai/scorecard-node/commit/57b9f1eca43360c35046670ff5ac8f66bed5dd9f))
* **mcp:** add option to infer mcp client ([9e10887](https://github.com/scorecard-ai/scorecard-node/commit/9e108873d7c176b069d4599649b556c513e53c88))
* **mcp:** add unix socket option for remote MCP ([69680ff](https://github.com/scorecard-ai/scorecard-node/commit/69680ffbaf9becb9dc6eb52e5c9f835455b30656))
* **mcp:** allow setting logging level ([61ac570](https://github.com/scorecard-ai/scorecard-node/commit/61ac570acec27f329c6658eb9df6e18d4dd60aca))
* **mcp:** expose client options in `streamableHTTPApp` ([b7164d3](https://github.com/scorecard-ai/scorecard-node/commit/b7164d31366e126c3a89e270de095e36bf35d652))
* **mcp:** parse query string as mcp client options in mcp server ([f5d691f](https://github.com/scorecard-ai/scorecard-node/commit/f5d691f9ac7fba2fe8ebe956c61683c12b2a5ea2))
* **mcp:** remote server with passthru auth ([98fb290](https://github.com/scorecard-ai/scorecard-node/commit/98fb290e74b55e5bbed6d7de6ecc8676a1d0de05))
* **mcp:** support filtering tool results by a jq expression ([412ab6d](https://github.com/scorecard-ai/scorecard-node/commit/412ab6d7f3b4bfdfd062031df1d6a9c201ffedb1))


### Bug Fixes

* coerce nullable values to undefined ([e7dfece](https://github.com/scorecard-ai/scorecard-node/commit/e7dfece2b5a23b1301a0ab4abf030f565fc8f65b))
* **mcp:** avoid sending `jq_filter` to base API ([3187de5](https://github.com/scorecard-ai/scorecard-node/commit/3187de5c166fec343330a1d13982e944959e3f7d))
* **mcp:** fix bug in header handling ([938d9a7](https://github.com/scorecard-ai/scorecard-node/commit/938d9a7e5ca3f5535f8370a92626dc0bc2cfe761))
* **mcp:** fix query options parsing ([600c5cb](https://github.com/scorecard-ai/scorecard-node/commit/600c5cb21573ea54a130cdf16dfa05a43a623eee))
* **mcp:** fix tool description of jq_filter ([eed4a36](https://github.com/scorecard-ai/scorecard-node/commit/eed4a3642490280b4f0ed66765068d6a8b4a3cae))
* **mcp:** generate additionalProperties=true for map schemas to avoid validation issues ([7c32c93](https://github.com/scorecard-ai/scorecard-node/commit/7c32c93d2ac0ca1655f2f25c05144df52b1edaf4))
* **mcp:** include required section for top-level properties and support naming transformations ([e92a53f](https://github.com/scorecard-ai/scorecard-node/commit/e92a53f625defff0f42f47195948cb624994bcf3))
* **mcp:** relax input type for asTextContextResult ([1772682](https://github.com/scorecard-ai/scorecard-node/commit/17726825c3e733a30bfe0b09bc90740c0aff25e0))
* **mcp:** reverse validJson capability option and limit scope ([c2bbc68](https://github.com/scorecard-ai/scorecard-node/commit/c2bbc6899f84af7fbd3d028fc829fc27c606524f))
* **mcp:** support jq filtering on cloudflare workers ([5327b6e](https://github.com/scorecard-ai/scorecard-node/commit/5327b6e065ea004027e82bdacc59e24751445c0b))


### Chores

* add package to package.json ([3fa753e](https://github.com/scorecard-ai/scorecard-node/commit/3fa753ee0030f584245c5650266462d939e51977))
* ci build action ([e98041a](https://github.com/scorecard-ai/scorecard-node/commit/e98041a18029089aefb533a9c98174c74c98162f))
* **client:** qualify global Blob ([4467437](https://github.com/scorecard-ai/scorecard-node/commit/4467437018f9459c45de168fe14ef4470f3e44f0))
* **deps:** update dependency @types/node to v20.17.58 ([97f96a0](https://github.com/scorecard-ai/scorecard-node/commit/97f96a0e606fc56a0356a8d1765b22b75d1260c7))
* **internal:** codegen related update ([4fbe83b](https://github.com/scorecard-ai/scorecard-node/commit/4fbe83b76af1513c79509f1c64012702f0c3e0d5))
* **internal:** codegen related update ([a633c9c](https://github.com/scorecard-ai/scorecard-node/commit/a633c9c3e7e5064a77c77bfe6db833a488e535b3))
* **internal:** codegen related update ([e1161e3](https://github.com/scorecard-ai/scorecard-node/commit/e1161e3fa928d5baf7ee5516a47b5f7614fba981))
* **internal:** codegen related update ([fb4417e](https://github.com/scorecard-ai/scorecard-node/commit/fb4417e4984c6106f886a875f627ed86323e81b3))
* **internal:** codegen related update ([3417b36](https://github.com/scorecard-ai/scorecard-node/commit/3417b36ea9f0372b18d07a313ee1987c634c4fd1))
* **internal:** codegen related update ([af90a13](https://github.com/scorecard-ai/scorecard-node/commit/af90a13fa3767c7a82b3abb8c4591427a6399212))
* **internal:** formatting change ([0490e53](https://github.com/scorecard-ai/scorecard-node/commit/0490e536c81221afcbbbe97c86d7a59284d82cc9))
* **internal:** make mcp-server publishing public by defaut ([ae5027f](https://github.com/scorecard-ai/scorecard-node/commit/ae5027fbb5bd47c66361f79f3e277bb472e2d0e6))
* **internal:** move publish config ([6c8e24e](https://github.com/scorecard-ai/scorecard-node/commit/6c8e24e7928e9dd3c4680bd7446a99905e71f2fb))
* **internal:** refactor array check ([7941f3a](https://github.com/scorecard-ai/scorecard-node/commit/7941f3a613751212f8b80c9afaf8423348a194f0))
* **internal:** remove redundant imports config ([fc79b14](https://github.com/scorecard-ai/scorecard-node/commit/fc79b146fc0cf588a69289a7f9f97c5219c4d50e))
* **internal:** update comment in script ([adb20b2](https://github.com/scorecard-ai/scorecard-node/commit/adb20b2337b65185466f3c4b157a3c5cc5672ca7))
* **internal:** update global Error reference ([100d773](https://github.com/scorecard-ai/scorecard-node/commit/100d773157c30ac3764ee44094e83490a1bb71b4))
* make some internal functions async ([02ff51d](https://github.com/scorecard-ai/scorecard-node/commit/02ff51d937f3157f9ad5a73444a51eb1100d635d))
* **mcp:** add cors to oauth metadata route ([5932210](https://github.com/scorecard-ai/scorecard-node/commit/5932210b5f1b785945a2fd673f8580a4a060c8c1))
* **mcp:** document remote server in README.md ([639d8a1](https://github.com/scorecard-ai/scorecard-node/commit/639d8a154096dd4b72a5cfedf3b66fef8c8a6381))
* **mcp:** formatting ([47791fa](https://github.com/scorecard-ai/scorecard-node/commit/47791fa5c88d6107634e4ad3902d66d60490cef0))
* **mcp:** minor cleanup of types and package.json ([9ade481](https://github.com/scorecard-ai/scorecard-node/commit/9ade481c648d92830338f0533ea0c6cdd258b79c))
* **mcp:** refactor streamable http transport ([c216faf](https://github.com/scorecard-ai/scorecard-node/commit/c216faf71c0d27b80a86e20ee008f7439d20763f))
* **mcp:** rework imports in tools ([b9526ef](https://github.com/scorecard-ai/scorecard-node/commit/b9526ef86a14525d95a5fca90ae6d211b1c6c303))
* **mcp:** update package.json ([94735ae](https://github.com/scorecard-ai/scorecard-node/commit/94735aed137900511116abb88093aec4dc234615))
* **mcp:** update README ([4096a6e](https://github.com/scorecard-ai/scorecard-node/commit/4096a6e04881d8c6ae5bb00f8d0892f66f69fdea))
* **mcp:** update types ([91964fb](https://github.com/scorecard-ai/scorecard-node/commit/91964fb56f33313b09743a1ddcdc3fd53208d6df))
* **ts:** reorder package.json imports ([52cc0b3](https://github.com/scorecard-ai/scorecard-node/commit/52cc0b3da97f65a789b358e446eaef139c95962e))
* update @stainless-api/prism-cli to v5.15.0 ([8552758](https://github.com/scorecard-ai/scorecard-node/commit/855275895d471b4e1ad15265dc0b2213e7eb9bd4))
* update CI script ([3fb85a9](https://github.com/scorecard-ai/scorecard-node/commit/3fb85a90e2a940a8df8bf8884283e81d4bc58d39))

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
