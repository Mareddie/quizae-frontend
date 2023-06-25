import React from 'react'
import {useImmer} from 'use-immer';

type FormState<T extends Object> = {
    formObject: T,
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void,
}

const useForm = <T extends Object>(formObjectState: T): FormState<T> => {
    const [formObject, setFormObject] = useImmer<T>(formObjectState);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormObject((draft) => {
            if (! formObjectState.hasOwnProperty(name)) {
                throw new Error(`Form Input ${name} does not have corresponding property in a given object.`);
            }

            // @ts-ignore For some weird fucking reason I cannot make TS to see the index is valid.
            draft[name] = value;
        });
    }

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return {
        formObject,
        onChangeInput,
        onSubmitForm,
    }
}

export default useForm
