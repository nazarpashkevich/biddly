import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const ApiResponseDtoCache = new Map<string, any>();

interface ApiResponseDtoOptions {
  isArray?: boolean;
}

export function ApiResponseDto<T>(
  DataDto: Type<T>,
  options: ApiResponseDtoOptions = {}
) {
  const { isArray = false } = options;

  const name = `ApiResponseDto_${DataDto.name}${isArray ? 'Array' : ''}`;

  if (ApiResponseDtoCache.has(name)) {
    return ApiResponseDtoCache.get(name);
  }

  class ApiResponseDtoClass {
    @ApiProperty({
      example: true,
      description: 'Indicates if the request was successful',
    })
    success: boolean;

    @ApiProperty({
      example: 'Success',
      description: 'Response message',
    })
    message: string;

    @ApiProperty({
      example: new Date().toISOString(),
      description: 'Timestamp of the response',
    })
    timestamp: string;

    @ApiProperty({
      type: DataDto,
      description: 'Response data',
      isArray,
    })
    data: T | T[];
  }

  Object.defineProperty(ApiResponseDtoClass, 'name', {
    value: name,
  });

  ApiResponseDtoCache.set(name, ApiResponseDtoClass);

  return ApiResponseDtoClass;
}
