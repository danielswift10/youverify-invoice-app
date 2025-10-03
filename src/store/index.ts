import { atom } from "nanostores";

export type ModalType = "CLOSE_MODAL" | "INVOICE_MODAL";

export const $modalType = atom<ModalType>("CLOSE_MODAL");

export const $openSidebar = atom<boolean>(false);

export const setModalType = (type: ModalType) => {
  $modalType.set(type);
};


export const setOpenSidebar = (type: boolean) => {
  $openSidebar.set(type);
};
