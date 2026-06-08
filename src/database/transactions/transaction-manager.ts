export interface TransactionManager<TContext = unknown> {
  run<T>(callback: (context: TContext) => Promise<T>): Promise<T>;
}

export class NoopTransactionManager implements TransactionManager {
  async run<T>(callback: () => Promise<T>): Promise<T> {
    return await callback();
  }
}
