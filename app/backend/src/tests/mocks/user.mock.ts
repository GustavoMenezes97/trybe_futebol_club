const userMock = {
  validUser: {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  },
  invalidUser: {
    id: 2,
    username: 'User',
    role: 'undefined',
    email: 'user@xablau.com',
    password: 'senha_invalida',
  },
}

export default userMock;
