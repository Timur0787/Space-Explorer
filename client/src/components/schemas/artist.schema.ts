import z from 'zod';

export const ArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  diam: z.string(),
  distantion: z.string(),
  saliter: z.number(),
  description:z.string(),
  img:z.string().nullable().optional()
});

export const ApiResponceSchema = z.array(ArtistSchema)


export type Artist = z.infer<typeof ArtistSchema>;