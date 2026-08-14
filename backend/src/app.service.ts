import { DataSource } from 'typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { successResponse } from './common/http/response.util';

@Injectable()
export class AppService implements OnModuleInit {

  private readonly logger = new Logger(AppService.name);

  constructor(private readonly DataSource: DataSource) {}


  async onModuleInit() {
    try {
      await this.DataSource.query('SELECT 1');
      this.logger.log('DataSource has been initialized successfully.');
    } catch (error) {
      this.logger.error('Error occurred while initializing DataSource', error);
    }
  }

  getRootPayload(){
      return successResponse('Student LMS API is running successfully',{
        version: '1.0.0',
        message: 'Welcome to the Student LMS API',
        status: 'success',
        timestamp: new Date().toISOString(),
      });
  }

  getHealthPayload() {
    return successResponse('Student LMS API is healthy', {
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
}
