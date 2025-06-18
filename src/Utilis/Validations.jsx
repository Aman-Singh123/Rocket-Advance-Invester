export const loginValidation = (userDetails, setError) => {
    const { password, email } = userDetails;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    // Initialize errors with empty values
    const errors = { name: "", email: "" };
    if (
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
    ) {

        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email";
        }

        if (!passwordRegex.test(password)) {
            errors.password = "Password must have at least one letter, one digit, and be at least 8 characters long";
        }
        setError(errors);
        return false;
    } else {
        return true;
    }
};

export const registerValidation = (userDetails, setError) => {
    const { name, password, email } = userDetails;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    // Initialize errors with empty values
    const errors = { name: "", email: "", password: "" };
    if (
        !nameRegex.test(name) ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
    ) {
        if (!nameRegex.test(name)) {
            errors.name = "Please enter a valid name";
        }

        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email";
        }

        if (!passwordRegex.test(password)) {
            errors.password = "Password must have at least one letter, one digit, and be at least 8 characters long";
        }
        setError(errors);
        return false;
    } else {
        return true;
    }
};