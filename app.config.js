module.exports = {
  apps: [
    {
      name: "MODERATION",
      namespace: "kapsent",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Kapsent_Botlar/Botlar/Moderation"
    },
    {
      name: "GUARDI",
      namespace: "kapsent",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Kapsent_Botlar/Botlar/Guard_I"
    },
    {
      name: "GUARDII",
      namespace: "kapsent",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Kapsent_Botlar/Botlar/Guard_II"
    },
    {
      name: "GUARDIII",
      namespace: "kapsent",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Kapsent_Botlar/Botlar/Guard_III"
    },
    {
      name: "GUARDIV",
      namespace: "kapsent",
      script: 'main.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      cwd: "./Kapsent_Botlar/Botlar/Guard_IV"
    }
  ]
};