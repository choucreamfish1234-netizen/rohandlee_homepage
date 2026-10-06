const PAGE_SIZE = 1000
const MAX_ROWS = 100_000

type RangeableQuery<T> = {
  range(from: number, to: number): PromiseLike<{ data: T[] | null; error: { message: string } | null }>
}

// Supabase caps every select at 1,000 rows, so aggregate queries must page through results.
// The query must have a stable order (e.g. .order('id')) or pages can overlap.
export async function fetchAllRows<T>(makeQuery: () => RangeableQuery<T>): Promise<T[]> {
  const rows: T[] = []
  for (let from = 0; from < MAX_ROWS; from += PAGE_SIZE) {
    const { data, error } = await makeQuery().range(from, from + PAGE_SIZE - 1)
    if (error) throw new Error(error.message)
    if (!data || data.length === 0) break
    rows.push(...data)
    if (data.length < PAGE_SIZE) break
  }
  return rows
}
