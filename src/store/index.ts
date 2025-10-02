import { atom } from "nanostores";

export type ModalType = "CLOSE_MODAL" | "INVOICE_MODAL";

export const $modalType = atom<ModalType>("CLOSE_MODAL");

export const setModalType = (type: ModalType) => {
  $modalType.set(type);
};
