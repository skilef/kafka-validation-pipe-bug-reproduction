import { IsString } from "class-validator";

export class SetHeroWeaponDto {
    @IsString()
    weapon: string
}