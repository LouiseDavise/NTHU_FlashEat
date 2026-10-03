export function dateKey(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export function currentStreak(done: string[]): number {
  const set = new Set(done);
  let offset = set.has(dateKey(daysAgo(0))) ? 0 : 1;
  let count = 0;
  while (set.has(dateKey(daysAgo(offset)))) {
    count += 1;
    offset += 1;
  }
  return count;
}

export function bestStreak(done: string[]): number {
  const sorted = [...new Set(done)].sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const key of sorted) {
    const [y, m, d] = key.split('-').map(Number);
    const cur = new Date(y, m - 1, d);
    const gap = prev ? Math.round((cur.getTime() - prev.getTime()) / 86400000) : 0;
    run = prev && gap === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = cur;
  }
  return best;
}
