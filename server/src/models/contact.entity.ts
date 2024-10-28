import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: "" })
  imageUrl: string

  @Column()
  email: string

  @Column()
  phoneNumber1: string

  @Column({ nullable: true })
  phoneNumber2: string

  @Column()
  address: string

  @Column()
  color: string

  @Column()
  colorIcon: string

  @Column({ default: false })
  isDeleted: boolean
}
