import { useState } from "react";

export function useFormErrors() {
    const [errors, setErrors] = useState({});

    function setFieldError(field, message) {
        setErrors({
            [field]: message });
    }

    function clearErrors() {
        setErrors({});
    }

    return {
        errors,
        setFieldError,
        clearErrors,
    };
}