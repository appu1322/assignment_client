export interface IResponse {
    message: string;
    success: boolean;
}

export interface IErrorResponse {
    data: {
        message: string;
        success: boolean;
    }
}

export interface IPagination {
    page: number;
    limit: number;
    totalPages: number;
    totalRecords?: number;
}

interface PhoneSchema {
    dialCode: string;
    iso2: string;
    country: string;
    number: string;
}

interface Contact {
    email: string;
    mobileNumber: PhoneSchema;
}

export interface IContact {
    _id: string;
    firstName: string;
    gender: 'MALE' | 'FEMALE' | 'TRANSGENDER';
    contact: Contact;
    isDeleted: boolean;

    //extra fields for form
    email?: string;
    phone?: string;
}

export interface IContactRow {
    id: number;
    _id: string;
    firstName: string;
    gender: string;
    email: string;
    phone: string;
}

export interface IContactState {
    deleteWarning: boolean;
    _jobPosition: string;
    pagination: IPagination;
    filters: {
        search: string;
    },
    selectAll: string[],
    multiDeleteWarning: boolean,
    updateDetail: {
        name: string;
        value: string;
        _id: string;
    }
}


export interface IContactsResponse extends IResponse {
    data: IContact[];
    meta: {
        page: number;
        limit: number;
        totalPages: number;
        totalRecords: number;
    }
}

export interface IContactResponse extends IResponse {
    data?: IContact;
}