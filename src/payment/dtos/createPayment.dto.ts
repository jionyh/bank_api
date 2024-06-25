import { IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreatePaymentDto{
@IsNumber()
account_id:number

@IsNumber()
@IsPositive({ message: "Payment amount can't be Negative" })
amount:number

@IsString()
description:string

imageUrl?:string
}
