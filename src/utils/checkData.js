//A helper utility to check the data given is valid

//The general function
const check = (checkType, inputToCheck) => {
    const convertType = (checkType) => {
        if (isNaN(checkType)) {
            switch (checkType.toLowerCase()) {
                case 'username': return 1;
                case 'password': return 2;
                case 'uuid': return 3;
                case 'email': return 4;
                case 'name': return 5;
                case 'phonenumber': return 6;
                case 'number': return 7;
                case 'price': return 8;
                case 'rating': return 9;
                case 'image': return 10;
                case 'date': return 11;
                case 'bookingstatus': return 12;
                case 'comodityname': return 13;
                default: return 0;
            }
        }
        return checkType;
    }

    let type = convertType(checkType);
    let regex;

    switch (type) {
        case 1:
            regex = /^[a-z]{1,}[\w]+$/i; //username
            break;
        case 2:
            regex = /^(?=.*\d)[\w\d$#%@&*!()^+=-|\\:;"',.?/`~±§]{2,}$/i; //password
            break;
        case 3:
            regex = /^[\w]{8}(-[\w]{4}){3}-[\w]{12}$/i; //uuid
            break;
        case 4:
            regex = /^[\w\S\.]+@[\w\S\.]+\.([a-z]{2,})$/i; //email
            break;
        case 5:
            regex = /^[a-z]{2,}(\s[a-z]{1,}){0,4}$/i; //name
            break;
        case 6:
            regex = /^\+?[\d\s]{0,4}\(?\d{1,}\)?\s*[\d\s]*[\s]*-?[\s]*[-\d\s]{4,}$/i; //phonenumber
            break;
        case 7:
            regex = /^\d+$/i; //number
            break;
        case 8:
            regex = /^\d+\.[\d]{1,2}$/i; //price
            break;
        case 9:
            regex = /^[0-5]{1}$/i; //rating 0-5
            break;
        case 10:
            regex = /^(https:\/\/)[^/]+.*(.jpg|.jpeg|.gif|.png)$/i; //https secure image: jpg,jpeg,gif,png
            break;
        case 11:
            regex = /^(2[0-9]{3})-(0[1-9]|1[1-2])-(0[1-9]|(1|2)[0-9]|3[0-1])T([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]).[0-9]{3}Z$/i;    //2023-03-10T18:00:00.000Z
            break;
        case 12:
            regex = /^(canceled|confirmed|pending)$/i;    //bookingstatusses
            break;
        case 13:
            regex = /^[a-z\d]{2,}(\s[a-z\d]{1,}){0,4}$/i; //comodityname
            break;
        default:
            regex = /.*/i // returns everything
            break;
    }

    return regex.test(inputToCheck)
};

export default check;