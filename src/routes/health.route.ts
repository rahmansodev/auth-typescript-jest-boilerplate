/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    return res.json({ message: 'Pong!' })
  } catch (e) {
    console.log(e)
    return res.json({
      error: e,
      message: 'Something went wrong!'
    })
  }
})

export default router
