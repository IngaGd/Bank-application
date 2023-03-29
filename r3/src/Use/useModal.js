import { useState } from "react";

//is modalu nieko nepaimam, pradzioj turi buti nuliniai, del to per parametrus nieko neperduodam
export const useModal = _ => {

    const [editModal, setEditModal] = useState(null);

    return [editModal, setEditModal];
}