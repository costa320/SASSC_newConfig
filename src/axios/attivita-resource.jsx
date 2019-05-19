import {Axios_Post, Axios_Get, Axios_Patch, Axios_Delete} from './modelAxios.jsx';

export function attivita_createAttivita(dati) {
    return new Promise((res, reg) => {
        /* chiamata al server in post*/
        /* let queryString = `?page=${selectedPage}&pageSize=${pageSize}`; */
        let queryString = ``;
        let data = {
            queryString: queryString,
            dati: dati
        }
        Axios_Post('/createAttivita', data).then((success) => {
            res(success);
        }).catch(
        // Log the rejection reason
        (error) => {
            console.log(error);
            reg(error);
        });
    })
}
export function attivita_findAttivitaListByProgettoId(id) {
    return new Promise((res, reg) => {
        /* chiamata al server in post*/
        /* let queryString = `?page=${selectedPage}&pageSize=${pageSize}`; */
        let queryString = `/findAttivitaListByProgettoId?idProgetto=${id}`;
        let data = {
            queryString: queryString,
            dati: {}
        }
        Axios_Post('/findAttivitaListByProgettoId', data).then((success) => {
            res(success);
        }).catch(
        // Log the rejection reason
        (error) => {
            console.log(error);
            reg(error);
        });
    })
}

export function attivita_ModifyExcistingAttivita(idAttivitaDaModificare, dati) {
    return new Promise((res, reg) => {
        /* chiamata al server in post*/
        /* let queryString = `?page=${selectedPage}&pageSize=${pageSize}`; */
        let queryString = `/${idAttivitaDaModificare}`;
        let data = {
            queryString: queryString,
            dati: dati
        }
        Axios_Post('/putAttivita', data).then((success) => {
            res(success);
        }).catch(
        // Log the rejection reason
        (error) => {
            console.log(error);
            reg(error);
        });
    })
}

export function deleteAttivita(id) {
    return new Promise((res, reg) => {
        /* chiamata al server in post*/
        /* let queryString = `?page=${selectedPage}&pageSize=${pageSize}`; */
        let queryString = `/${id}`;
        let data = {
            queryString: queryString,
            dati: {}
        }
        Axios_Post('/deleteAttivita', data).then((success) => {
            res(success);
        }).catch(
        // Log the rejection reason
        (error) => {
            console.log(error);
            reg(error);
        });
    })
}
