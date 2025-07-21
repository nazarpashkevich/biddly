import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';

export const auctionResource = (prisma: PrismaClient, components) => ({
  resource: { model: getModelByName('Auction'), client: prisma },
  options: {
    navigation: {
      name: 'Main',
      icon: 'Database',
    },
    properties: {
      id: { isVisible: { list: true, edit: false, filter: true, show: true } },
      createdAt: {
        isVisible: { list: true, edit: false, filter: true, show: true },
        type: 'datetime',
      },
      name: {},
      updatedAt: {
        isVisible: { list: false, edit: false, filter: true, show: true },
        type: 'datetime',
      },
      status: {
        availableValues: [
          { value: 'DRAFT', label: 'Draft' },
          { value: 'ACTIVE', label: 'Active' },
          { value: 'FINISHED', label: 'Finished' },
          { value: 'CANCELLED', label: 'Cancelled' },
        ],
      },
      startAt: { type: 'datetime' },
      endAt: { type: 'datetime' },
      lots: { isVisible: false },
      auctionWatchers: { isVisible: false },
      payment: { isVisible: false },
    },
    listProperties: ['id', 'name', 'status', 'startAt', 'endAt'],
    sort: { sortBy: 'createdAt', direction: 'desc' },
  },
});
