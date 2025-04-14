import fs from "fs/promises";
import { randomUUID } from "crypto";

const generateData = () => {
  const agencies = [];
  for (let i = 0; i < 2000; i++) {
    agencies.push({
      _id: randomUUID(),
      name: `rapidops-${Math.floor(Math.random() * 100000)}`,
    });
  }
  return agencies;
};

(async () => {
  const data = generateData();
  await fs.writeFile("./data/input.json", JSON.stringify(data, null, 2));
  console.log("✅ input.json generated");
})();
