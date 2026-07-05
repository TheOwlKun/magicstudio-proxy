module.exports = {
    apps: [{
        name: "magicstudio-proxy",
        script: "./src/server.js",
        instances: 1,
        exec_mode: "fork",
        env: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 4000
        },
        watch: false,
        max_memory_restart: "1G",
        error_file: "logs/err.log",
        out_file: "logs/out.log",
        time: true
    }]
};
