# clank-ng

## About

This is an experimental rewrite of
[makigas/makibot](github.com/makigas/makibot). It lives under a separate
repository for cleaning purposes, and it has been called clank-ng to keep it
separated from the current makibot.

clank-ng is an evolution of makibot in the following aspects:

- It is the default migration path for Discord.js v13 -> v14.
- It is the default migration path for Node.js 16 -> 18.
- It allows to remove all the deprecations and legacy accumulated through the
  years.
- It allows to evaluate workspace packages, in order to split by concern.

## Architecture

### npm workspaces

This project uses npm workspaces, or as people tend to call this, "monorepos".

This project will not make use of Lerna, Turborepo, nx or anything like that,
and instead it just uses the default workspaces feature introduced by package
managers like npm, yarn or pnpm, since it is less probable that npm, yarn or
pnpm decide to remove support for workspaces than it is for any other monorepo
system to become obsolete and deprecated.

I believe that this is the natural way. I believe that Lerna, Turborepo and nx
will become obsolete at some point since most package managers have support for
the features requested by monorepos / workspaces, thus it is becoming a solved
problem.

### TypeScript

A must. However, I am trying to do things different this time. I want to avoid
ts-node if possible and force myself to always compile the application, even for
development purposes, since this is the safest way to make sure that the
application does not have compilation errors that can be swallowed by ts-node.

Setting up monorepos with TypeScript is still a little clunky, so I am doing my
best, but you cannot definitely call this "robust", since I do not know when is
this going to explode. So far, things seem to work. TypeScript seems to pick
typings of other packages in the monorepo, and things seem to integrate well.

### Bot architecture

The subpackages have been grouped by kind (library or application).

Libraries do not run code, they provide functions to be used in other libraries
or applications. They may be split by concern, such as core, settings,
interactions, karma...

Applications do run code and it has a purpose. The most important application is
makibotd, which is the bot application that interacts with the network.

## Requirements

- Node >= 18.7.0
- npm 8
- A spare token to use for the bot

## Commands

Global commands:

- `npm run build`: build all the packages in the monorepo.
- `npm run test`: run all the test suites in the monorepo.
- `npm run makibotd`: starts makibotd (the bot application).
- `npm run clean`: iteratively runs `clean` on all packages.

Each package workspace may provide `build`, `clean` and `start` commands as it
needs.

## Migration path

Here is the plan:

- makibot 4.x will continue to receive features and bugfixes as required and it
  will continue evolving on its own. If new releases of makibot 4.x need to be
  made, they will be made.

- clank-ng 5.0 will migrate features currently in makibot 4.x.

- If at some point, makibot has to release a breaking change and bumps its
  version to a higher number, clank-ng automatically increments its version
  number too (so if we get makibot 5.x, clank-ng will become 6.0).

- Once clank-ng has all the required features in makibot, the code from clank-ng
  will be merged into makibot, and clank-ng will become makibot. Issues will be
  transferred from this repository to makigas/makibot.

## Reusability status

I am working on making the library packages of the framework as reusable as
possible, but at the moment I cannot guarantee anything. Eventually, it should
be possible to build bots on top of the library packages.

I don't think that makibotd or other applications can be reusable, since they
are tightly bound to the server that I operate.

## License

GNU General Public License 3.0.

_But this is a viral license!_ Yeah, that's the point. I want you to be able to
use the code if you want to enhance your bot, but I don't want you to ransack
this code and get rich.
