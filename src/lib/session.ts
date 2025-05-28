import 'server-only';
import { cookies } from 'next/headers';

export async function createSession({
  remember,
  token,
  user,
}: {
  remember: boolean;
  token: string;
  user: any;
}) {
  const oneMonth = 60 * 60 * 24 * 30;
  const oneDay = 60 * 60 * 24;
  const expiresAt = remember ? oneMonth : oneDay;
  //   const session = await encrypt({ userId, expiresAt })
  console.log('token', token);
  const cookieStore = await cookies();
  const userData = JSON.stringify(user);

  cookieStore.set('a-token', token, {
    // httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  cookieStore.set('a-user', userData, {
    // httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
