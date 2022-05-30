# Fora_App

## Requirements
- Install the [Expo CLI](https://docs.expo.io/get-started/installation/)

## Setup & run locally
### 1. Create new project
Sign up to Supabase - https://app.supabase.io and create a new project. Wait for your database to start.

### 2. Get the URL and Key
Go to the Project Settings (the cog icon), open the API tab, and find your API URL and anon key, you'll need these in the next step.

Create a .env file with the following
```bash
# Update these with your Supabase details from your project settings > API
REACT_NATIVE_SUPABASE_URL=https://your-project.supabase.co
REACT_NATIVE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMzI2MTI0MCwiZXhwIjoxOTE4ODM3MjQwfQ.PjJY_7ZYozWqoMH4R0XqyBHYo8en5Mfd5iL8hZOh4Ic
```
Set `REACT_NATIVE_SUPABASE_URL` and `REACT_NATIVE_SUPABASE_ANON_KEY`.

### 3. Install the dependencies & run the project:

Install the dependencies:

```bash
npm i
```

Run the project:

```bash
npm start
```





