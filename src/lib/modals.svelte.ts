import ImageFullscreenModal from "./components/ImageFullscreenModal.svelte";
import ProjectModal from "./components/ProjectModal.svelte";
import SkillModal from "./components/SkillModal.svelte";

export const ModalComponents = {
  ProjectModal,
  SkillModal,
  ImageFullscreenModal,
};

type ModalInstance = {
  id: string;
  type: keyof typeof ModalComponents;
  data: any;
  resolve: (value: any) => void;
};

export function createModals() {
  let modals = $state<ModalInstance[]>([]);

  return {
    get modals() {
      return modals;
    },
    set modals(v) {
      modals = v;
    },
  };
}

export let modals = createModals();

export function openModal(
  type: keyof typeof ModalComponents,
  data: any = null
) {
  const id = crypto.randomUUID();
  return new Promise<any>((resolve) => {
    modals.modals = [...modals.modals, { id, type, data, resolve }];
  });
}

export function closeModal(id: string, data: any = null) {
  modals.modals.forEach((m) => {
    const mIndex = modals.modals.findIndex((m) => m.id === id);
    if (mIndex !== -1) {
      modals.modals[mIndex].resolve(data);
      modals.modals = modals.modals.filter((m) => m.id !== id);
    }
  });
}
