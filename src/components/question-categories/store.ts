import {atom} from "jotai/index";
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
