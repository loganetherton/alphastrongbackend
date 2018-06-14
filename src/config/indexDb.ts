/**
 * Initiate the creation of indexes on database tables upon initial startup. Keep indexes up to date in production
 * should they change before deployments
 * @param schema Mongoose schema
 * @param indexes Array of indexes to create
 */
export function createIndexes(schema: any, indexes: any) {
  for (const index of indexes) {
    schema.index(index[0], index.length > 1 ? index[1] : null);
  }
}
