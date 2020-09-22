import * as Koa from 'koa'
import * as Router from 'koa-router'

// http server configuration
const PORT = 5678

// http server vars
const server = new Koa()
const router = new Router({ prefix: '/' })

// example in-memory counter
var count = 0

// routes
router.get('ping', (ctx) => (ctx.body = { msg: 'pong' }))
router.get('count', (ctx) => (ctx.body = { count: count++ }))

// server bootstrap
server.use(router.routes()).listen(PORT)

console.log('DONE!')
