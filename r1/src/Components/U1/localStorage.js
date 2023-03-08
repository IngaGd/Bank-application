import { v4 as uuidv4 } from 'uuid';

// irasymas i duomenu baze
const write = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

//skaitymas:

export const read = key => {
    const data = localStorage.getItem(key);
    if (null === data) {
        return [];
    }
    return JSON.parse(data);
}

export const create = (key, data) => {
    const allData = read(key); //nuskaitom is localstorage
    data.id = uuidv4();//papildom atsiustus duomenis unikaliu identifikatorium id
    allData.push(data); // i nuskaitytus duomenis pridedam atsiusta
    const sortedData = allData.sort((a, b) => (a.surname > b.surname) ? 1 : -1);
    write(key, sortedData); // ir vel viska irasome i localStorage
}

export const destroy = (key, id) => {
    const allData = read(key); // nuskaitom
    const deleteData = allData.filter(d => id !== d.id);
    write(key, deleteData);
}

export const edit = (key, data, id) => {
    const allData = read(key);
    const editedData = allData.map(d => id === d.id ? { ...d, ...data, id: id } : { ...d });
    write(key, editedData);
}