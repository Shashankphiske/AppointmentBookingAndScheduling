class validationUtilsClass {
    validateMail = (email : string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)) return true;
        return false;
    }

    validatePassword = (password : string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if(passwordRegex.test(password)) return true;
        return false;
    }
}

export { validationUtilsClass }