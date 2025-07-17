import { getModelByName } from '@adminjs/prisma';

export const AuctionResource = (adminJSPrisma, prisma) => ({
  resource: { model: getModelByName('Auction'), client: prisma },
  options: {
    properties: {
      id: { isVisible: { list: true, edit: false, filter: true, show: true } },
      createdAt: {
        isVisible: { list: true, edit: false, filter: true, show: true },
        type: 'datetime',
      },
      updatedAt: {
        isVisible: { list: false, edit: false, filter: true, show: true },
        type: 'datetime',
      },
      // lot: {
      //   reference: 'Lot',
      //   isVisible: { list: true, edit: false, filter: false, show: true },
      // },
      // winner: {
      //   reference: 'User',
      //   isVisible: { list: true, edit: false, filter: false, show: true },
      // },
      status: {
        availableValues: [
          { value: 'DRAFT', label: 'Draft' },
          { value: 'ACTIVE', label: 'Active' },
          { value: 'FINISHED', label: 'Finished' },
          { value: 'CANCELLED', label: 'Cancelled' },
        ],
      },
      currentPrice: { type: 'number' },
      startingPrice: { type: 'number' },
      startAt: { type: 'datetime' },
      endAt: { type: 'datetime' },
      lots: { isVisible: false },
      bids: { isVisible: false },
      auctionWatchers: { isVisible: false },
      winnerId: { isVisible: false },
      winner: { isVisible: false },
      payment: { isVisible: false },
    },
    listProperties: ['id', 'status', 'currentPrice', 'startAt', 'endAt'],
    sort: { sortBy: 'createdAt', direction: 'desc' },
  },
});
