const config = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || "",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
    stripePublishableKey : process.env.STRIPE_PUBLISHIABLE_KEY || "",
}

export default config