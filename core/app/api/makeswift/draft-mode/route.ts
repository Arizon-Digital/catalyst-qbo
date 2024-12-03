import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  console.log(
    '@@@ /api/makeswift/draft-mode, x-makeswift-api-key:',
    request.headers.get('x-makeswift-api-key'),
  );

  if (request.headers.get('x-makeswift-api-key') === process.env.MAKESWIFT_SITE_API_KEY) {
    const draft = await draftMode();

    draft.enable();
    console.log('@@@ /api/makeswift/draft-mode, draftMode.enable()');
  }

  return new Response(null);
};
