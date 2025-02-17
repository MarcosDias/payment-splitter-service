import { Module } from '@nestjs/common'
import { SNSService } from './sns-service/sns.service'

@Module({
  providers: [SNSService],
  exports: [SNSService],
})
export class AwsServicesModule {}
