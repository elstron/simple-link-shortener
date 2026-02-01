
/**
 * Generates a cryptographically secure random password.
 * 
 * @param length - The desired length of the password (default: 12)
 * @returns A randomly generated password containing uppercase, lowercase, digits, and special characters
 */
export function securePassword(length: number = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*()_+';
    const allChars = uppercase + lowercase + digits + special;
    
    let password = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += allChars[array[i] % allChars.length];
    }
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasDigit) {
        return securePassword(length);
    }

    return password;
}
