     const PROXY_CONFIG = [
       {
         context: [
           "/api" // Match the API path
         ],
         target: "https://localhost:7167", // Your backend URL
         secure: false, // Set to true if your backend is using HTTPS
         changeOrigin: true, // Allows the proxy to change the origin
         logLevel: "debug"
       }
     ];
     module.exports = PROXY_CONFIG;