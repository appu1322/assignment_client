import HttpService from "../http";
import { IContactResponse, IContactsResponse } from "../../interfaces";

const ContactService = () => {
    const { httpRequest } = HttpService();
    const addContact = async (payload: object): Promise<IContactResponse> => new Promise((resolve, reject) => {
        httpRequest<IContactResponse>(
            "POST",
            `contacts`,
            payload
        )
            .then(resolve)
            .catch(reject);
    });

    const getContacts = async (search: object): Promise<IContactsResponse> => new Promise((resolve, reject) => {
        httpRequest<IContactsResponse>(
            "GET",
            `contacts/list`,
            {},
            search
        )
            .then(resolve)
            .catch(reject);
    });

    const getContact = async (query: object): Promise<IContactResponse> => new Promise((resolve, reject) => {
        httpRequest<IContactResponse>(
            "GET",
            `contacts`,
            {},
            query
        )
            .then(resolve)
            .catch(reject);
    });

    const updateContact = async (payload: object): Promise<IContactResponse> => new Promise((resolve, reject) => {
        httpRequest<IContactResponse>(
            "PUT",
            `contacts`,
            payload,
        )
            .then(resolve)
            .catch(reject);
    });

    const deleteContacts = async (payload: object): Promise<IContactResponse> => new Promise((resolve, reject) => {
        httpRequest<IContactResponse>(
            "DELETE",
            `contacts`,
            payload
        )
            .then(resolve)
            .catch(reject);
    });


    return { addContact, getContact, getContacts, updateContact, deleteContacts };
};

export { ContactService };
