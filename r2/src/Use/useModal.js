import { useState } from "react";

//is modalu nieko nepaimam, pradzioj turi buti nuliniai, del to per parametrus nieko neperduodam
export const useModal = _ => {

    const [deleteModal, setDeleteModal] = useState(null);
    const [editModal, setEditModal] = useState(null);

    return [deleteModal, setDeleteModal, editModal, setEditModal];
}