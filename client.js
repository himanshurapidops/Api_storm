import fs from "fs/promises";
import axios from "axios";

const API_URL = "http://localhost:3000";
const OUTPUT_FILE = "./data/output.json";

async function fetchJSON(endpoint) {
  try {
    const res = await axios.get(`${API_URL}${endpoint}`);
    return res.data.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

async function main() {
  const allData = await fetchJSON("/data/all");
  const fixedData = await fetchJSON("/data/fixed");

  if (!allData || !fixedData) {
    console.error("Failed to load initial data");
    return;
  }

  const allMap = new Map(allData.map((item) => [item._id, item]));
  const mergedFixed = [];

  for (const item of fixedData) {
    ///pos id
    const existing = allMap.get(item._id);
    if (existing) {
      mergedFixed.push({ ...item, name: existing.name });
    } else {
      const fetched = await fetchJSON(`/data/_id/${item._id}`);
      if (fetched) {
        mergedFixed.push({ ...item, name: fetched.name });
      } else {
        console.warn(`Skipping missing item with ID: ${item._id}`);
      }
    }
  }

  for (const item of mergedFixed) {
    allMap.delete(item._id);
  }

  const sortedOutputLength = allMap.size + mergedFixed.length;

  const sortedOutput = new Array(sortedOutputLength);

  for (const item of mergedFixed) {
    sortedOutput[item.position - 1] = item;
  }

  for (let i = 0; i < sortedOutput.length; i++) {
    if (!sortedOutput[i]) {
      sortedOutput[i] = allMap.values().next().value;
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(sortedOutput, null, 2));
  console.log(`Merged output saved to ${OUTPUT_FILE}`);
}

main();
