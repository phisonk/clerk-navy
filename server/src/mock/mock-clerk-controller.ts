import { StatusCodes } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
 
@Controller('api/mock/')
export class MockClerkController {
 
    @Get(':id')
    private get(req: Request, res: Response) {
        Logger.Info(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: 'get_called',
        });
    }
}