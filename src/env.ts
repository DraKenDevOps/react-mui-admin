const env = {
  MODE: import.meta.env.MODE,
  REST_API_URL: import.meta.env.VITE_APP_REST_API_URL as string,
  REST_API_BASE_PATH: import.meta.env.VITE_APP_REST_API_BASE_PATH as string,
  REST_API_VERSION: import.meta.env.VITE_APP_REST_API_VERSION as string,
  MQTT_HOST: import.meta.env.VITE_APP_MQTT_HOST as string,
  MQTT_PORT: import.meta.env.VITE_APP_MQTT_PORT as string,
  MQTT_PROTOCOL: import.meta.env.VITE_APP_MQTT_PROTOCOL as string,
  MQTT_USER: import.meta.env.VITE_APP_MQTT_USER as string,
  MQTT_PASSWORD: import.meta.env.VITE_APP_MQTT_PASSWORD as string,
  MQTT_PATH: import.meta.env.VITE_APP_MQTT_PATH as string,
  MQTT_TOPIC: import.meta.env.VITE_APP_MQTT_TOPIC as string,
  LIMIT_FILE_SIZE: Number(import.meta.env.VITE_APP_LIMIT_FILE_SIZE) || 10,
}

export default env
