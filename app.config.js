// app.config.js

module.exports = ({ config }) => {
  // Adiciona o package name para a build Android
  if (config.android) {
    config.android.package = "com.gusta9s.aps";
  }

  // Adiciona o projectId do EAS
  config.extra = {
    ...config.extra,
    eas: {
      "projectId": "d982efaa-b3be-43a9-b526-e1162efb139b" 
    }
  };

  // Retorna a configuração final
  return config;
};