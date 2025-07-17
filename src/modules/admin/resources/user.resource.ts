import { getModelByName } from '@adminjs/prisma';

export const UserResource = (adminJSPrisma, prisma) => ({
  resource: { model: getModelByName('User'), client: prisma },
  options: {
    navigation: {
      name: 'Users',
      icon: 'User',
    },
    listProperties: ['id', 'email', 'createdAt', 'updatedAt'],
    showProperties: [
      'id',
      'email',
      'createdAt',
      'updatedAt',
      'lots',
      'bids',
      'auctions',
      'auctionWatchers',
      'notifications',
      'payments',
    ],
    editProperties: ['email', 'password'],
    filterProperties: ['id', 'email', 'createdAt', 'updatedAt'],
    properties: {
      password: {
        type: 'password',
        isVisible: {
          list: false,
          filter: false,
          show: false,
          edit: true,
        },
      },
      lots: { isVisible: false },
      bids: { isVisible: false },
      auctions: { isVisible: false },
      auctionWatchers: { isVisible: false },
      notifications: { isVisible: false },
      payments: { isVisible: false },
      resetPasswordTokens: { isVisible: false },
    },
  },
});
