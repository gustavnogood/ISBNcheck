import React, { useState } from "react";

class IsbnValidator {
    constructor() {}

    validate(isbn: string): boolean {
        const cleanedIsbn = isbn.replace(/-/g, "");

        if (cleanedIsbn.length === 10) {
            return this.validateIsbn10(cleanedIsbn);
        } else if (cleanedIsbn.length === 13) {
            return this.validateIsbn13(cleanedIsbn);
        } else {
            return false;
        }
    }

    validateIsbn10(isbn: string): boolean {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(isbn[i]) * (10 - i);
        }

        const lastDigit = isbn.length >= 10 && isbn[9].toUpperCase() === 'X' ? 10 : parseInt(isbn[9]);
        sum += lastDigit;

        return sum % 11 === 0;
    }

    validateIsbn13(isbn: string): boolean {
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            const digit = parseInt(isbn[i]);
            sum += (i % 2 === 0 ? digit : digit * 3);
        }

        const lastDigit = parseInt(isbn[12]);
        return (10 - (sum % 10)) % 10 === lastDigit;
    }

    getValidationMessage(isbn: string): string {
        const isValid = this.validate(isbn);

        if (isValid) {
            return "Valid ISBN";
        } else {
            return "Invalid ISBN";
        }
    }
}

const IsbnValidationComponent = () => {
    const [isbn, setIsbn] = useState("");

    const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsbn(event.target.value);
    };

    const isbnValidator = new IsbnValidator();

    const isValidIsbn10 = isbnValidator.validateIsbn10(isbn);
    const isValidIsbn13 = isbnValidator.validateIsbn13(isbn);
    const validationMessage = isbnValidator.getValidationMessage(isbn);

    return (
        <div>
            <input type="text" value={isbn} onChange={handleIsbnChange} />
            {isValidIsbn10 && <p>ISBN 10 is valid</p>}
            {isValidIsbn13 && <p>ISBN 13 is valid</p>}
            {!isValidIsbn10 && !isValidIsbn13 && <p>{validationMessage}</p>}
        </div>
    );
};

export default IsbnValidationComponent;
