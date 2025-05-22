// This is a mock implementation for demonstration purposes
// In a real application, you would implement actual authentication logic

import { env } from "./env"

const BACKEND_URL = env.BACKEND_URL

/**
 * Sends a magic link with OTP to the provided email
 */
export async function sendMagicLink(email: string): Promise<{ success: boolean }> {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/validation-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        if (!response.ok) {
            return { success: false }
        }
        const res = await response.json()
        return { success: res?.data?.otp_sent }
    } catch (error) {
        console.error({error})
        // Si hay un error, devolvemos false
        return { success: false }
    }
}

/**
 * Verifies the OTP provided by the user
 */
export async function verifyOtp(email: string, otp: string): Promise<{ success: boolean, access_token?: string, user?: unknown }> {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token: otp })
        })
        if (!response.ok) {
            return { success: false }
        }
        const res = await response.json()
        return {
            success: !!res?.data?.access_token,
            access_token: res?.data?.access_token,
            user: res?.data?.user
        }
    } catch (error) {
        console.error({error})
        return { success: false }
    }
}

/**
 * Resends the OTP to the provided email
 */
export async function resendOtp(email: string): Promise<{ success: boolean }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('reenviando otp',{email})

    // In a real implementation, this would:
    // 1. Generate a new secure OTP
    // 2. Update the OTP and expiration time in your database
    // 3. Send a new email with the OTP to the user

    return { success: true }
}
