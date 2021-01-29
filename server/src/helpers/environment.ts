import _ from 'lodash';
import { LoggerType } from './logger';
export class Environment {
    constructor(){

    }
    public static getCaiVoiceBotLoggerType(): LoggerType{
        if(_.isEqual(process.env.CLERK_LOGGER_TYPE?.toLowerCase(),'debug')){
            return LoggerType.Debug;
        }
        return LoggerType.Info;
    }
    public static getMockableStatus(): boolean{
        if(_.isEqual(process.env.MOCK,'true')){
            return true;
        }else{
            return false;
        }
    }


}