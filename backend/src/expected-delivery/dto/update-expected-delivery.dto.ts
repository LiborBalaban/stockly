import { PartialType } from '@nestjs/mapped-types';
import { CreateExpectedDeliveryDto } from './create-expected-delivery.dto';

export class UpdateExpectedDeliveryDto extends PartialType(CreateExpectedDeliveryDto) {}
