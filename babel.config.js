module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components/",
            "@hooks": "./src/hooks/",
          },
        },
      ],
    ],
  };
};
