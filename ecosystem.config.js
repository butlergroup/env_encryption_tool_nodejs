module.exports = {
  apps : [
      {
          name: 'env_encryption_tool_nodejs_server',
          script: 'start.js',
          error_file: 'env_encryption_tool_nodejs_server_err.log',
          out_file: 'env_encryption_tool_nodejs_server_out.log', 
          log_date_format: 'YYYY-MM-DD HH:mm:ss' 
      }
  ]
};
