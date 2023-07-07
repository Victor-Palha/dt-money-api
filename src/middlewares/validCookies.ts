import { FastifyRequest, FastifyReply } from 'fastify'

export async function validCookie(req: FastifyRequest, res: FastifyReply) {
  const sessionId = req.cookies.session_id
  // console.log(req.cookies)
  if (!sessionId) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
}
