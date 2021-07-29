import { NextApiRequest, NextApiResponse } from 'next'

const hello = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello' })
}

export default hello
