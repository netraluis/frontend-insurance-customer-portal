type EnvVars = {
    BACKEND_URL: string
    // OTRA_API_KEY: string
  }
  
  const DEFAULTS: Record<keyof EnvVars, string> = {
    BACKEND_URL: "https://backend-insurance-customer-portal.onrender.com/v1",
    // OTRA_API_KEY: "",
  }
  
  function getEnvVars(): EnvVars {
    const env = {} as EnvVars
  
    (Object.keys(DEFAULTS) as Array<keyof EnvVars>).forEach((key) => {
      const envValue = process.env[`NEXT_PUBLIC_${key}`]
      env[key] = envValue || DEFAULTS[key]
      if (!env[key]) {
        throw new Error(`Missing environment variable: NEXT_PUBLIC_${key}`)
      }
    })
  
    return env
  }
  export const env = getEnvVars()