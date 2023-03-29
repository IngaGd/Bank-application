import { useState } from "react";

export const useFile = _ => {

    const [file, setFile] = useState();

    const fileReader = file => {
        //failo skaitymas uztrunka, del to reikia asinchroninio laukimo
        return new Promise((resolve, reject) => {//laukiam ir bus paresolvinta tada, kai nuskaitys, jei bus klaodu -reject
            const reader = new FileReader();
            reader.readAsDataURL(file) //sakom readeriui eiti skaityti
            reader.onload = _ => resolve(reader.result) //jei nuskaite, tegul grazina
            reader.onerror = error => reject(error);
        });
    }

    //nuskaitom faila ir keiciam state
    const readFile = e => {
        fileReader(e.target.files[0]) //nuskaitom
            .then(f => setFile(f)) //setinam
            .catch(_ => {
                //error
            })
    }

    return [file, readFile];
}