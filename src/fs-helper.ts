import * as fs from 'fs'
import {readFileSync} from 'fs'

export function directoryExistsSync(path: string, required?: boolean): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }
  try {
    const stats: fs.Stats = fs.statSync(path)
    if (stats.isDirectory()) {
      return true
    } else if (!required) {
      return false
    }

    throw new Error(`Directory '${path}' does not exist`)
  } catch (error) {
    if (error.code === 'ENOENT') {
      if (!required) {
        return false
      }

      throw new Error(`Directory '${path}' does not exist`)
    }

    throw new Error(`Encountered an error when checking whether path '${path}' exists: ${error.message}`)
  }
}

export function existsSync(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    fs.statSync(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    }

    throw new Error(`Encountered an error when checking whether path '${path}' exists: ${error.message}`)
  }

  return true
}

export function fileExistsSync(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    const stats = fs.statSync(path)
    if (!stats.isDirectory()) {
      return true
    }

    return false
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false
    }

    throw new Error(`Encountered an error when checking whether path '${path}' exists: ${error.message}`)
  }
}

export function loadFileSync(path: string): string {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }
  try {
    if (fileExistsSync(path)) {
      return readFileSync(path, 'utf8')
    }
  } catch (error) {
    throw new Error(`Encountered an error when reading file '${path}': ${error.message}`)
  }
  throw new Error(`Encountered an error when reading file '${path}': file not there`)
}
