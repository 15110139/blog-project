<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.\
## Source structure 
src --- include code and module\
----@type: defined type\
----core: defined core module\
----database: defined those relate with data: entity, migration, script ...\
----module: have module business or common module ...\
----shared: type define api, business, dto, common function ...\
----main.ts root file to run code\
dev-env. sh: script run default env


## Api 
+ Authentication\
 Sign In: http://http://13.70.33.217/:3000/v1/sign-in,METHOD POST\
 Login  : http://http://13.70.33.217/:3000/v1/sign-in,METHOD POST
 
+ Feature Blog\
 Search : http://http://13.70.33.217/:3000/v1/search, METHOD GET\
 Get    : http://http://13.70.33.217/:3000/v1/blog/:blogId, METHOD GET\
 List   : http://http://13.70.33.217/:3000/v1/user/blog, METHOD GET and AUTH BEARER\
 Create : http://http://13.70.33.217/:3000/v1/user/blog, METHOD POST and AUTH BEARER\
 Delete : http://http://13.70.33.217/:3000/v1/user/blog/:blogId, METHOD DELETE and AUTH BEARER\
 Update : http://http://13.70.33.217/:3000/v1/user/blog/:blogId, METHOD PUT and AUTH BEARER

+ List User Guest  : http://http://13.70.33.217/:3000/v1/user/blog, METHOD GET and AUTH BEARER

## Technical
 + Nodejs
 + Mysql
 + Elasticsearch


## Architecture
Micro-service : Blog service +  Search Service (Elasticsearch) \
Blog service : Include feature perform with data User and Blog \
Elasticsearch : Use for search blog

Why I use Elasticsearch to Search Service. We can't search blog on Mysql that can do. But it not good solution for Architecture, Feature and Performance. Because when data Blog in Mysql is big, we search data Blog is very slowly and this that affects other features. It reason why i separate search feature use elasticsearch and that better than query data in mysql.

 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# production mode
$ npm run test:cov
```

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
