import React from 'react'
import { useImmer } from 'use-immer';

export type FormState = {
    formObject: object,
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void,
}

const useForm = (formObjectState: object): FormState => {
    const [formObject, setFormObject] = useImmer(formObjectState);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormObject(draft => {
            // @ts-ignore
            draft[name] = value;
        });
    }

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('user', formObject);
    }

    return {
        formObject,
        onChangeInput,
        onSubmitForm,
    }
}

export default useForm
