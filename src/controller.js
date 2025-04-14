import asyncHandler from "./utils/asyncHandler.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import fs from "fs/promises";

const inputPath = "./data/input.json";
const samplePath = "./data/sample.json";

const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const readJSON = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    throw new ApiError(500, "Failed to read JSON file");
  }
};

// controllers start from here

export const getAllData = asyncHandler(async (_, res, next) => {
  const data = await readJSON(inputPath);
  const randomData = getRandomItems(data, 1000);
  res.json(new ApiResponse(200, randomData));
});

export const getFixedData = asyncHandler(async (_, res, next) => {
  const inputData = await readJSON(inputPath);
  const sampleData = await readJSON(samplePath);

  const combined = getRandomItems(inputData, 80).concat(sampleData);
  const shuffledItems = getRandomItems(combined, combined.length);

  const randomPositions = getRandomItems(
    Array.from({ length: 1000 }, (_, i) => i + 1),
    100
  );

  const result = shuffledItems.map((item, index) => ({
    _id: item._id,
    position: randomPositions[index],
  }));

  res.json(new ApiResponse(200, result));
});

export const getDataById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "ID is required");
  }

  const data = await readJSON(inputPath);
  const item = data.find((item) => item._id === id);
  if (!item) {
    throw new ApiError(404, "Entity not found");
  }
  res.json(new ApiResponse(200, item));
});
