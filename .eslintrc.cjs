module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",

    // Ignorar erros relacionados a variáveis não utilizadas
    "no-unused-vars": "off",

    // Ignorar erros relacionados a variáveis não utilizadas no ESLint
    "@typescript-eslint/no-unused-vars": "off",

    // Ignorar erros relacionados a propriedades desconhecidas em objetos literais
    "@typescript-eslint/no-unused-vars": "off",

    // Ignorar erros relacionados a tipos desconhecidos ou implícitos
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Ignorar erros relacionados a "any" implícito
    "@typescript-eslint/no-implicit-any-catch": "off",

    // Ignorar erros relacionados a "any" implícito em funções
    "@typescript-eslint/no-implicit-any": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
