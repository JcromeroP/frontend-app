export const validateForm = (formData, setErrors) => {
    let formErrors = {};
    let valid = true;

    if (!formData.firstName) {
        formErrors.firstName = "El nombre es requerido.";
        valid = false;
    }
    if (!formData.firstLastName) {
        formErrors.firstLastName = "El apellido es requerido.";
        valid = false;
    }
    if (!formData.documentNumber) {
        formErrors.documentNumber = "El número de documento es requerido.";
        valid = false;
    }
    if (!formData.password) {
        formErrors.password = "La contraseña es requerida.";
        valid = false;
    }
    if (!formData.email) {
        formErrors.email = "El correo electrónico es requerido.";
        valid = false;
    }

    setErrors(formErrors);
    return valid;
};