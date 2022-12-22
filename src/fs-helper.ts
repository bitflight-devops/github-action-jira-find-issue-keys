import ActionError from './action-error';
import { JiraConfig } from './types';
import { logger } from '@broadshield/github-actions-core-typed-inputs';
import * as fs from 'graceful-fs';
import * as jsyaml from 'js-yaml';
import _ from 'lodash';
import { err, ok, Result } from 'neverthrow';
import * as path from 'node:path';

const cliConfigPath = `${process.env.HOME ?? '.'}/.jira.d/config.yml`;
const configPath = `${process.env.HOME ?? '.'}/jira/config.yml`;
const filepathError = 'filePath must not be empty';
function isError(error: any): error is NodeJS.ErrnoException {
  return _.isError(error);
}
export function mkdir(filepath: string): Result<boolean, ActionError> {
  if (!filepath) {
    return err(new ActionError(`mkdir`, filepathError));
  }

  try {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    return ok(true);
  } catch (error) {
    return err(new ActionError(`Encountered an error when creating directory '${filepath}'`, error));
  }
}
export function directoryExistsSync(filePath: string, required?: boolean): Result<boolean, ActionError> {
  if (!filePath) {
    return err(new ActionError('directoryExistsSync', filepathError));
  }
  try {
    const stats: fs.Stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      return ok(true);
    }
    if (stats.isFile()) {
      return err(new ActionError('directoryExistsSync', `'${filePath}' is a file, expecting a directory`));
    }
    if (!required) {
      return ok(false);
    }

    return mkdir(path.dirname(filePath)).andThen(() => directoryExistsSync(filePath, false));
  } catch (error) {
    if (isError(error) && error.code === 'ENOENT' && !required) {
      return ok(false);
    }

    return err(new ActionError('directoryExistsSync', `Directory '${filePath}' does not exist`));
  }
}
export function isFile(filePath: string): Result<boolean, ActionError> {
  if (!filePath) {
    return err(new ActionError(`isFile`, filepathError));
  }
  try {
    const stats = fs.statSync(filePath);
    return ok(stats.isFile());
  } catch (error) {
    return err(new ActionError(`isFile`, error));
  }
}
export function existsSync(filePath: string): Result<boolean, ActionError> {
  if (!filePath) {
    return err(new ActionError(`existsSync`, filepathError));
  }

  try {
    const stats: fs.Stats = fs.statSync(filePath);
    return ok(stats.isFile() || stats.isDirectory());
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return ok(false);
    }

    return err(
      new ActionError(`Encountered an error when checking whether path '${filePath}' exists: ${error.message}`),
    );
  }
}
export function dirIsEmpty(dirPath: string): Result<boolean, ActionError> {
  try {
    const isEmpty = fs.readdirSync(dirPath).length === 0;
    return ok(isEmpty);
  } catch (error) {
    return err(new ActionError(`dirIsEmpty`, error));
  }
}
export function removeEmptyDir(dirPath: string): Result<boolean, ActionError> {
  try {
    const files = fs.readdirSync(dirPath);
    if (files.length === 0) {
      // directory appears to be empty
      try {
        fs.rmdirSync(dirPath, { maxRetries: 3, recursive: true });
      } catch (error) {
        return err(new ActionError(`Failed to remove empty directory '${dirPath}'`, error));
      }
    }
  } catch (error) {
    return err(new ActionError(`Error when reading directory '${dirPath}'`, error));
  }

  return ok(true);
}

export function fileExistsSync(filePath: string): Result<boolean, ActionError> {
  if (!filePath) {
    return err(new ActionError(`fileExistsSync`, filepathError));
  }

  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      return ok(true);
    }
    if (stats.isDirectory()) {
      return dirIsEmpty(filePath).andThen((isEmpty) => {
        if (isEmpty) {
          logger.error(`Path '${filePath}' is an empty directory, but a config file was expected, removing directory`);
          return removeEmptyDir(filePath).andThen(() => ok(false));
        }
        logger.error(`Path '${filePath}' is a directory, but a file was expected`);
        return ok(false);
      });
    }
    return ok(false);
  } catch (error) {
    if (isError(error) && error.code === 'ENOENT') {
      return ok(false);
    }

    return err(new ActionError(`Encountered an error when checking whether path '${filePath}' exists`, error));
  }
}

export function loadFileSync(filePath: string): Result<string, ActionError> {
  return fileExistsSync(filePath).andThen((exists) => {
    return exists ? ok(fs.readFileSync(filePath, 'utf8')) : ok(''); // Not Existing is fine, just pass empty string
  });
}

export function readJiraConfig(): JiraConfig {
  let config: JiraConfig = {};
  config = loadFileSync(configPath).match<JiraConfig>(
    (content) => {
      const configFromFile = jsyaml.load(content) as JiraConfig;
      config.baseUrl = configFromFile?.baseUrl;
      config.token = configFromFile?.token;
      config.email = configFromFile?.email;
      return config;
    },
    () => {
      return config;
    },
  );

  return loadFileSync(configPath).match<JiraConfig>(
    (content) => {
      const cliConfigFromFile = jsyaml.load(content) as JiraConfig;
      if (!config?.baseUrl) {
        config.baseUrl = cliConfigFromFile?.baseUrl;
      }
      if (!config?.token) {
        config.token = cliConfigFromFile?.token;
      }
      if (!config?.email) {
        config.email = cliConfigFromFile?.email;
      }
      return config;
    },
    () => {
      return config;
    },
  );
}
export function writeKey(result: string[]): void {
  if (result.length === 0) {
    return;
  }

  const firstIssue = result[0];
  for (const issue of result) {
    logger.debug(`Detected issueKey: ${issue}`);
  }
  mkdir(path.dirname(configPath))
    .mapErr((error) => error.logError())
    .unwrapOr(true);

  loadFileSync(configPath).match(
    (content) => {
      try {
        const existingConfig = jsyaml.load(content) as JiraConfig;
        const extendedConfig = { ...existingConfig, issue: result };
        fs.writeFileSync(configPath, jsyaml.dump(extendedConfig));
        logger.debug(`Saving ${firstIssue} to ${configPath}`);
      } catch (error) {
        new ActionError(`Failed to write to ${configPath}`, error).logError();
      }
    },
    (error) => {
      error.logError();
    },
  );

  mkdir(path.dirname(cliConfigPath))
    .mapErr((error) => error.logError())
    .unwrapOr(true);
  loadFileSync(cliConfigPath).match(
    (content) => {
      try {
        const existingConfig = jsyaml.load(content) as JiraConfig;

        const extendedConfig = { ...existingConfig, issue: result };
        fs.writeFileSync(cliConfigPath, jsyaml.dump(extendedConfig));
        logger.debug(`Saving first issue ${firstIssue} to ${cliConfigPath}`);
      } catch (error) {
        new ActionError(`Failed to write to ${cliConfigPath}`, error).logError();
      }
    },
    (error) => {
      error.logError();
    },
  );
}

// // GitHub workspace
// let githubWorkspacePath = process.env.GITHUB_WORKSPACE;
// if (!githubWorkspacePath) {
//   if (process.env.CI) {
//     return err(new ActionError('GITHUB_WORKSPACE not defined'));
//   } else {
//     githubWorkspacePath = process.cwd();
//   }
// }
// githubWorkspacePath = path.resolve(githubWorkspacePath);
// logger.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`);
// return fsHelper.directoryExistsSync(githubWorkspacePath, true);
