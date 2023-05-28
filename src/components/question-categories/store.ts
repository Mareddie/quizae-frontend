import {atom} from "jotai";
import * as yup from "yup";

export type ModalVariant = 'create'|'update';

export const QuestionCategorySchema = yup.object().shape({
    id: yup.string().uuid().optional(),
    name: yup.string().required(),
    priority: yup.number().moreThan(0).integer().nullable().optional(),
});

export const variantAtom = atom<ModalVariant>('create');
export const showModalAtom = atom<boolean>(false);
export const selectedCategoryAtom = atom<object|undefined>(undefined);
export const createUpdateError = atom<string|undefined>(undefined);
export const successMessage = atom<string|undefined>(undefined);
