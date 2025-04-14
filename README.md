# Express Data API

A simple Express.js API that serves data from JSON files.

## Features

- Random data sampling
- Fixed dataset generation
- Record lookup by ID
- Error handling

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/express-data-api.git
cd express-data-api

# Install dependencies
npm install

# Start server
npm start
```

Server runs at `http://localhost:3000`

## API Endpoints

- `GET /data/all` - Get random sample (up to 1000 items)
- `GET /data/fixed` - Get combined dataset with randomized positions
- `GET /data/_id/:id` - Get specific item by ID

## Project Structure

```
├── data/               # JSON data files
├── utils/              # Helper utilities
├── controller.js       # API logic
├── index.js            # Server entry point
└── package.json
```
