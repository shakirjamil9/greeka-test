import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryDto } from './dto/query-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { TaskPriority } from './enums/task-priority.enum';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: Task,
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const newTask = await this.tasksService.create(createTaskDto);
    return {
      message: 'Task created successfully',
      data: newTask,
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of tasks',
    type: Task,
    isArray: true,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number for pagination',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit number of tasks per page',
    default: 10,
  })
  @ApiQuery({
    name: 'status',
    enum: TaskStatus,
    required: false,
    description: 'Filter tasks by status',
  })
  @ApiQuery({
    name: 'priority',
    enum: TaskPriority,
    required: false,
    description: 'Filter tasks by priority',
  })
  @ApiQuery({
    name: 'isActive',
    type: Boolean,
    required: false,
    description: 'Filter tasks by active status',
  })
  async findAll(@Query() queryDto: QueryDto) {
    const { page, limit, status, priority, isActive } = queryDto;

    const { data, count } = await this.tasksService.findAll(
      page,
      limit,
      status,
      priority,
      isActive,
    );

    return {
      message: 'Tasks fetched successfully',
      data,
      count,
      totalPages: Math.ceil(count / limit),
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Task found successfully',
    type: Task,
  })
  async findOne(@Param('id') id: number) {
    const task = await this.tasksService.findOne(id);
    return {
      message: 'Task fetched successfully',
      data: task,
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: Task,
  })
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);

    return {
      message: 'Task updated successfully',
      data: updatedTask,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  async remove(@Param('id') id: number) {
    const deletedTask = await this.tasksService.remove(id);
    return {
      message: 'Task deleted successfully',
    };
  }
}
