# Multilingual FAQ Management API

## Overview
This project is a backend application for managing FAQs with multilingual support. It is built using **Node.js, Express, MongoDB, and Redis** and supports translations in **Hindi and Bengali**. The API allows users to store, retrieve, and manage FAQs with automatic translations and caching for performance optimization.

## Features
- **Multilingual FAQ storage** (English, Hindi, Bengali)
- **Automatic translation** using Google Translate API
- **WYSIWYG Editor support** for formatted answers
- **RESTful API** for CRUD operations
- **Caching with Redis** to improve performance
- **Admin Panel Support**
- **Dockerized deployment** for easy setup
- **Unit tests** using Mocha & Chai

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Caching:** Redis
- **Translation Service:** Google Translate API (@vitalets/google-translate-api)
- **Testing:** Mocha, Chai
- **Deployment:** Docker, Docker Compose

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- Redis
- Docker (optional for containerized deployment)

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/YOGANAND2003/BharatFD_Backend
   cd BharatFD_Backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure your environment variables:
   ```ini
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/faqs
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=
   REDIS_PASSWORD=
   ```

4. Start the MongoDB and Redis servers (if not using Docker).

5. Run the application:
   ```sh
   npm start or node app.js
   ```

## API Endpoints

### 1. Get all FAQs
```http
GET /api/faqs
```
#### Query Parameters:
- `lang` (optional) - Language selection (`en`, `hi`, `bn`)
#### Example:
```sh
curl http://localhost:5000/api/faqs?lang=hi
```

### 2. Create a new FAQ
```http
POST /api/faqs
```
#### Request Body:
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a runtime environment."
}
```
#### Example:
```sh
curl -X POST http://localhost:5000/api/faqs \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Node.js?", "answer": "Node.js is a runtime environment."}'
```

## Caching with Redis
- FAQs are cached for **15 minutes**.
- If the requested language is available in cache, data is returned from Redis.
- If not available, FAQs are fetched from MongoDB, translated, and then cached.

## Running Tests
```sh
npm test
```
Tests cover:
- Creating a new FAQ
- Fetching FAQs in different languages
- Ensuring proper translations

## Deployment with Docker

### Run with Docker Compose
```sh
docker-compose up --build
```
This will start the API, MongoDB, and Redis in containers.

## Git & Version Control
- Follow **conventional commit messages**:
  ```
  feat: Add multilingual FAQ model
  fix: Improve translation caching
  docs: Update README with API examples
  ```
- Use **atomic commits** with clear messages.

## Contribution Guidelines
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "feat: Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a **Pull Request**.

## License
This project is open-source and available under the MIT License.

---

### Author
**Your Name**  
GitHub: [YourGitHubProfile](https://github.com/YOGANAND2003)

