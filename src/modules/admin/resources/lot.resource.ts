import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { UploadProviderConfig } from '../config/upload-provider.config';
import { createCustomUploadProvider } from '../providers/custom-upload.provider';

export const lotResource = async (
  prisma: PrismaClient,
  components,
  componentLoader
) => {
  const CustomUploadProvider = await createCustomUploadProvider();

  return {
    resource: { model: getModelByName('Lot'), client: prisma },
    options: {
      navigation: {
        name: 'Main',
        icon: 'Database',
      },
      properties: {
        id: {
          isVisible: { list: true, edit: false, filter: true, show: true },
        },
        name: {
          isTitle: true,
          isVisible: { list: true, edit: true, filter: true, show: true },
        },
        description: {
          type: 'richtext',
          isVisible: { list: false, edit: true, filter: false, show: true },
        },
        currentPrice: {
          type: 'number',
          required: false,
          isVisible: {
            list: true,
            edit: false,
            new: false,
            filter: false,
            show: true,
          },
          components: {
            list: components.MoneyListComponent,
            show: components.MoneyShowComponent,
            edit: components.MoneyEditComponent,
          },
        },
        startingPrice: {
          type: 'number',
          components: {
            list: components.MoneyListComponent,
            show: components.MoneyShowComponent,
            edit: components.MoneyEditComponent,
          },
        },
        isSold: {
          type: 'boolean',
          isVisible: { list: true, edit: false, filter: true, show: true },
        },
        createdAt: {
          isVisible: { list: true, edit: false, filter: true, show: true },
          type: 'datetime',
        },
        updatedAt: {
          isVisible: { list: false, edit: false, filter: true, show: true },
          type: 'datetime',
        },
        winner: {
          reference: 'User',
          isVisible: { list: true, edit: false, filter: true, show: true },
        },
        auction: {},
        lotCategories: { isVisible: false },
        pictureSrc: { isVisible: false },
        winnerId: { isVisible: false },
        auctionId: { isVisible: false },
      },
      listProperties: ['id', 'name', 'startingPrice', 'currentPrice', 'isSold'],
      sort: { sortBy: 'createdAt', direction: 'desc' },
    },
    features: [
      (await import('@adminjs/upload')).default({
        // @todo do we need to optimize it?)
        provider: new CustomUploadProvider(UploadProviderConfig),
        componentLoader,
        properties: {
          key: 'pictureSrc',
          file: 'uploadFile',
        },
        validation: { mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'] },
      }),
    ],
  };
};
