import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { MockClerkController } from './mock-clerk-controller';
import { Environment } from '../helpers/environment';
 
export class MockClerkServer extends Server {
    
    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }
 
    private setupControllers(): void {
        if(Environment.getMockableStatus()){
            super.addControllers([new MockClerkController()]);
        }
    }
 
    public start(): void {
        if(Environment.getMockableStatus()){
            const port = process.env.MOCK_CLERK_PORT || 4401;
            this.app.listen(port, () => {
                Logger.Info(`MockClerkServer listening on port: ${port}`);
            })
        }
    }
}