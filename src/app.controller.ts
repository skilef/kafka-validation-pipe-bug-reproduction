import { Controller, Get, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { SetHeroWeaponDto } from './hero.dto';

@Controller()
export class AppController {
  
  constructor(
    @Inject('HERO_CLIENT') private client: ClientProxy,
  ) {}

  // rest GET endpoint for triggering the bug
  @Get('bug')
  sendInvalidHeroWeaponSetEvent() {
    console.log("Sending invalid event (weapon property is missing)");
    this.client.emit('hero.weapon.set', {

    });
  }

  // rest GET endpoint which does not trigger the bug
  @Get('normal')
  sendValidHeroWeaponSetEvent() {
    console.log("Sending a valid event (weapon = 'sword')");
    this.client.emit('hero.weapon.set', {
      'weapon': 'sword'
    });
  }

  // kafka handler with a validation pipe
  @EventPattern('hero.weapon.set')
  @UsePipes(ValidationPipe)
  handleHeroSetEvent(@Payload() message: SetHeroWeaponDto) {
    console.log(`Handling ${JSON.stringify(message)}`);
  }
}
