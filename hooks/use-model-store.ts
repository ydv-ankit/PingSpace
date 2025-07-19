import { Server } from "@/prisma/lib/generated/prisma";
import { create } from "zustand";

export type ModelType = "createServer" | "invite" | "editServer" | "members";

interface ModelData {
  server?: Server;
}

interface ModelStore {
  type: ModelType | null;
  isOpen: boolean;
  data: ModelData;
  onOpen: (type: ModelType, data?: ModelData) => void;
  onClose: () => void;
}

export const useModel = create<ModelStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
