const getUniqueErrorMessage = (err) => {
    let output;
    try {
        let fieldName = err.message.substring(
            err.message.lastIndexOf('.$') + 2,
            err.message.lastIndexOf('_1')
        );
        output = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} existe déjà`;
    } catch (ex) {
        output = 'Le champ unique existe déjà';
    }
    return output;
};

const getErrorMessage = (err) => {
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = 'Une erreur s\'est produite';
        }
    } else if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            } else {
                message = 'Le champ requis est manquant';
            }
        }
    }
    return message;
};

export default { getErrorMessage };
