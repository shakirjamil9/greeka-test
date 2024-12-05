import {
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Name of the task',
    example: 'Complete project',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Due date of the task',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    description: 'Current status of the task',
    example: 'pending',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({
    description: 'Priority of the task',
    example: 'high',
    enum: TaskPriority,
    default: TaskPriority.NORMAL,
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    description: 'Indicates whether the task is active or not',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
