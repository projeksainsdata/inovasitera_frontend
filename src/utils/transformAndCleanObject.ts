type NestedObject = {
  [key: string]: string | number | boolean | NestedObject;
};

export function transformAndCleanObject(
  input: Record<string, unknown>
): NestedObject {
  const result: NestedObject = {};
  const keysToDelete: string[] = [];

  for (const [key, value] of Object.entries(input)) {
    if (key.includes(".")) {
      const keys = key.split(".");
      let current: NestedObject = result;

      for (let i = 0; i < keys.length - 1; i++) {
        // Ensure `current[keys[i]]` is treated as a `NestedObject`
        if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
          current[keys[i]] = {};
        }
        current = current[keys[i]] as NestedObject;
      }

      // Assign the final value
      current[keys[keys.length - 1]] = value as string | number | boolean;
      keysToDelete.push(key);
    } else {
      // Assign non-nested value directly to the result
      result[key] = value as string | number | boolean;
    }
  }

  // Remove the nested fields from the original object
  for (const key of keysToDelete) {
    delete input[key];
  }

  // Merge the transformed nested structure back into the original object
  Object.assign(input, result);

  return input as NestedObject;
}
