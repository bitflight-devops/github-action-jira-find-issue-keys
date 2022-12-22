import { logger } from '@broadshield/github-actions-core-typed-inputs';
import ansiColors from 'ansi-colors';
import endsWith from 'lodash/endsWith';
import includes from 'lodash/includes';
import isError from 'lodash/isError';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import replace from 'lodash/replace';
import split from 'lodash/split';
import startsWith from 'lodash/startsWith';

const kIsNodeError = Symbol('kIsNodeError');
export type LogLevel = 'debug' | 'info' | 'warning' | 'notice' | 'error';
export type LogLevels = { [key in LogLevel]: boolean };
export type additionalErrorArgumentType =
  | NodeJS.ErrnoException
  | Error
  | string
  | object
  | undefined
  | null
  | number
  | unknown;
interface JsonHighlightInterface {
  [index: string]: ansiColors.StyleFunction;
}

/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 * @author Joseph JDBar Barron
 * @link https://dev.to/jdbar
 */
export function instanceOfNodeError<T extends new (...arguments_: any) => Error>(
  value: Error,
  errorType: T,
): value is InstanceType<T> & NodeJS.ErrnoException {
  return value instanceof errorType;
}
export function isNodeError(error: any): error is NodeJS.ErrnoException {
  return isError(error);
}
export default class ActionError extends Error {
  static errors: string[] = [];

  static style = ansiColors.create();

  static from(error: Error | unknown): ActionError {
    if (error instanceof ActionError) {
      return error;
    }
    return new ActionError(`Unhandled Error:`, error);
  }

  constructor(message: string, ...arguments_: additionalErrorArgumentType[]) {
    super(message);
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ActionError.prototype);
    ActionError.errors.push(message);
    this.parseExtraArgs(...arguments_);
  }

  parseExtraArgs(...arguments_: additionalErrorArgumentType[]): void {
    if (arguments_.length === 0) {
      return;
    }
    if (!this.stack) {
      this.stack = '';
    }
    for (const argument of arguments_) {
      if (isNodeError(argument)) {
        let errorString = '';

        if (kIsNodeError in argument) {
          const error = argument;
          errorString = `${error.name} [${error.code}]: ${error.message}`;
        } else {
          const error = argument;
          errorString = error.toString();
        }
        this.stack += ActionError.prettyString({
          message: errorString,
          stack: argument.stack ? split(argument.stack, '\n') : null,
        });
      } else if (isString(argument)) {
        this.stack += `\n${argument}`;
      } else if (isObject(argument)) {
        this.stack += `\n${JSON.stringify(argument, null, 2)}`;
      } else if (isNumber(argument)) {
        this.stack += `\n${argument}`;
      } else if (argument === undefined) {
        this.stack += `\nundefined`;
      }
    }
  }

  getError(): string {
    return `${this.getErrorMessage()}\n${this.getErrorStack()}`;
  }

  logError(): void {
    this.logErrorMessage();
    this.logErrorStack();
  }

  getErrorMessage(): string {
    return `${this.message}`;
  }

  static getErrorMessagesArray(): string[] {
    return ActionError.errors;
  }

  getErrorStack(): string {
    return this.stack || '';
  }

  logErrorStack(): void {
    if (this.stack) {
      logger.error(this.stack);
    }
  }

  logErrorMessage(): void {
    logger.error(`⛔️ ${ActionError.style.red(this.getErrorMessage())}`);
  }

  static logErrorMessagesArray(): void {
    for (const error of ActionError.errors) {
      logger.error(`⛔️ ${ActionError.style.red(error)}`);
    }
  }

  toString(): string {
    return this.getError();
  }

  static prettyString(providedJson: string | object | number): string {
    const jsonHighlight = {
      number: ActionError.style.yellow,
      string: ActionError.style.green,
      boolean: ActionError.style.cyanBright,
      null: ActionError.style.bold.cyanBright,
      key: ActionError.style.bold.cyan,
    } as JsonHighlightInterface;
    let json: string = JSON.stringify(providedJson, undefined, 2);
    json = replace(json, /&/g, '&amp;');
    json = replace(json, /</g, '&lt;');
    json = replace(json, />/g, '&gt;');
    return replace(
      json,
      /("(\\u[\dA-Za-z]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?)/g,
      (match) => {
        let typeKey = 'number';
        if (startsWith(match, '"')) {
          typeKey = endsWith(match, ':') ? 'key' : 'string';
        } else if (/true|false/.test(match)) {
          typeKey = 'boolean';
        } else if (includes(match, 'null')) {
          typeKey = 'null';
        }
        return jsonHighlight[typeKey](match);
      },
    );
  }
}
