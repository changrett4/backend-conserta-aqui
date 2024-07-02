import { Module } from '@nestjs/common';
import { ConversaService } from './conversa.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ConversaService, ChatGateway],
  
})
export class ConversaModule {}
