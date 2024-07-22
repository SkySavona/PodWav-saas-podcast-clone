# Podwav: SaaS Podcast Clone

## Project Overview

**Podwav** is an innovative podcast platform that leverages the power of artificial intelligence to create podcasts. Users can enter information into an AI generator, which then produces a high-quality podcast, making the process of podcast creation seamless and efficient.

## Features

- **AI-Generated Podcasts**: Input information and let the AI handle the rest.
- **User Authentication**: Secure login and user management powered by Clerk.
- **Customizable UI**: Tailwind CSS for a flexible and responsive design.

## Technologies Used

- **Next.js**: Framework for server-side rendered React applications.
- **React Three Fiber**: Integration of 3D animations.
- **Tailwind CSS**: Utility-first CSS framework.
- **Clerk**: Authentication and user management.
- **Convex**: Backend logic and database management.
- **EmailJS**: Automated email handling.
- **TypeScript**: Typed JavaScript for better code quality.
- **ESLint**: Code quality and consistency tool.

## Project Structure

.
├── .vscode
├── app
│ ├── (auth)
│ ├── (root)
│ ├── providers
│ │ ├── AudioProvider.tsx
│ │ └── ConvexClerkProvider.tsx
│ ├── globals.css
│ ├── layout.tsx
├── components
├── constants
├── convex
│ ├── _generated
│ ├── auth.config.ts
│ ├── files.ts
│ ├── http.ts
│ ├── openai.ts
│ ├── podcasts.ts
│ ├── schema.ts
│ ├── tasks.ts
│ └── users.ts
├── lib
├── public
├── types
├── .eslintrc.json
├── .gitignore
├── components.json
├── layout.js
├── middleware.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── sampleData.json
├── tailwind.config.ts
└── tsconfig.json


## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/podwav.git
    ```
2. Navigate to the project directory:
    ```sh
    cd podwav
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Project

1. Start the development server:
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Build the project:
    ```sh
    npm run build
    ```
    or
    ```sh
    yarn build
    ```
2. Start the production server:
    ```sh
    npm start
    ```
    or
    ```sh
    yarn start
    ```

## Contributing

Please, no contributions.


