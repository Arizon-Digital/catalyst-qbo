import { z } from 'zod';
import { cookies, draftMode, headers } from 'next/headers';

export const makeswiftSiteVersionSchema = z.enum(['Live', 'Working']);
export const MakeswiftSiteVersion = makeswiftSiteVersionSchema.Enum;
export type MakeswiftSiteVersion = z.infer<typeof makeswiftSiteVersionSchema>;

const makeswiftPreviewDataSchema = z.object({
  makeswift: z.literal(true),
  siteVersion: makeswiftSiteVersionSchema,
});
export type MakeswiftPreviewData = z.infer<typeof makeswiftPreviewDataSchema>;

export const MAKESWIFT_DRAFT_MODE_DATA_COOKIE = 'x-makeswift-draft-data';

export const makeswiftDraftDataSchema = z.object({
  makeswift: z.literal(true),
  siteVersion: makeswiftSiteVersionSchema,
});

export type MakeswiftDraftData = z.infer<typeof makeswiftDraftDataSchema>;

async function getDraftData(): Promise<MakeswiftDraftData | null> {
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  console.log('@@@ getSiteVersion / getDraftData', { isDraftModeEnabled });
  if (!isDraftModeEnabled) return null;

  const allCookies = await cookies();
  const cookie = allCookies.get(MAKESWIFT_DRAFT_MODE_DATA_COOKIE);
  console.log('@@@ getSiteVersion / getDraftData', { cookie, allCookies });
  if (cookie == null) return null;

  const draftData = JSON.parse(cookie.value);
  const result = makeswiftDraftDataSchema.safeParse(draftData);
  console.log('@@@ getSiteVersion / result', { result });

  if (result.success) return result.data;
  return null;
}

export async function getSiteVersion() {
  const requestHeaders = await headers();
  const serverActionDraftMode = requestHeaders.get('X-Makeswift-Server-Action-Draft-Mode');
  // const allCookies = await cookies();
  console.log('@@@ getSiteVersion', { serverActionDraftMode });

  return (await getDraftData())?.siteVersion ?? MakeswiftSiteVersion.Live;
}
