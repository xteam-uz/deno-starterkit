export type ScheduledTask = { name: string; cron: string; run: () => Promise<void> };

export class SchedulerRegistry {
  private tasks: ScheduledTask[] = [];
  register(task: ScheduledTask) { this.tasks.push(task); }
  list() { return [...this.tasks]; }
}
