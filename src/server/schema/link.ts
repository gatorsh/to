import { z } from 'zod'

export const newLink = z.object({
  destination: z.string().url()

  // TODO: use regex as validation
  // .regex(
  //   /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
  // )
})
