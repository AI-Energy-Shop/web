module.exports = {
    apps: [
      {
        name: "aienergyshop", // Name of your app
        script: "npm",
        args: "start", // Use the `start` script defined in your package.json
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  