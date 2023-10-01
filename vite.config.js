import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.REACT_APP_GOOGLE_PLACES_API_KEY": JSON.stringify(
      process.env.REACT_APP_GOOGLE_PLACES_API_KEY
    ),
  },
});
