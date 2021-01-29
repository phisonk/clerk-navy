import colors from 'colors';
import _ from 'lodash';
import {Environment} from './environment';

export enum LoggerType{
    Debug,
    Info,
    Warn,
    Error
}

export default class logger{
    static cColors = colors;
    public static error(msg: string): void {
        // TODO Kwan: what if message is not a string?
        console.error(logger.cColors.red(`[ERR] ${msg}`));
      }
      public static warn(msg: string): void {
        console.warn(logger.cColors.yellow(`[WRN] ${msg}`));
      }
      public static info(msg: string): void {
        console.info(logger.cColors.cyan(`[INFO] ${msg}`));
      }
      public static log(msg: string): void {
        const num = Environment.getCaiVoiceBotLoggerType();
        if (num <= LoggerType.Debug) {
          console.log(logger.cColors.white(`[LOG] ${msg}`));
        }
      }
}