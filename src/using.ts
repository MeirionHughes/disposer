import { IDisposable } from "./_disposable";

export async function using<T extends IDisposable>(resource: T, func: (resource: T) => Promise<void> | void) {
  try {
    await func(resource);
  } finally {
    await resource.dispose();
  }
}