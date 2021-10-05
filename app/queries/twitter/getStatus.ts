import { resolver } from "blitz"
import { getStatus } from "integrations/twitter/client"
import { z } from "zod"
export const GetStatus = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetStatus), async (data, ctx) => {
  const { id } = data

  const status = await getStatus(id)

  return status
})
