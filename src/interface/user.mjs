export async function getUser(ctx) {
  ctx.body = {
    id: 1,
    name: 'useName',
    role: 'admin',
  };
}

export async function login(ctx) {
  const { username, password } = ctx.request.body;

  if (username === 'admin' && password === '123456') {
    ctx.body = { success: true, token: 'xxxx-token' };
  } else {
    ctx.body = { success: false };
  }
}
