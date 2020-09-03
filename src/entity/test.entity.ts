import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Test {
  @PrimaryGeneratedColumn('increment', {
    comment: '项目索引唯一 id',
    unsigned: true,
  })
  id: number

  @Column('varchar', {
    nullable: true,
    comment: '名称',
    length: 2048,
  })
  name: string
}
