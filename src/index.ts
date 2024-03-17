import {Hono} from 'hono'
import {Ai} from '@cloudflare/ai'

export interface Env {
	AI: any
}

const app = new Hono<{ Bindings: Env}>()

app.get('/', async c=> {
	const ai = new Ai(c.env.AI)
	const messages = [
		{role:'system', content:'You are a friendly assistant'},
		{role:'user', content: c.req.query('search') || 'hello'}
	]

	const {response}  = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1",
      {messages})


	return c.text(response)
})

export default app
