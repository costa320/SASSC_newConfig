import axios from 'axios';

export function Axios_Get(url) {
    let promise = new Promise((res, reg) => {
        axios
            .get(url)
            .then(function (response) {
                /*                 console.log(response); */
                res(response);
            })
            .catch(function (error) {
                console.log(error);
                reg(error);
            });
    });
    return promise;
}

export function Axios_Post(url, formData) {

    let promise = new Promise((res, reg) => {
        axios
            .post(url, formData)
            .then(function (response) {
                /*                 console.log(response); */
                res(response);
            })
            .catch(function (error) {
                console.log(error);
                reg(error);
            });
    });
    return promise;
}

export function Axios_Post_FileUploader(url_, formData) {

/*     let formData = new FormData();
    formData.append('file', data.file);

    for (var value of formData.values()) {
        console.log(value);
    } */

    let promise = new Promise((res, reg) => {
        axios({
            method: 'post',
            url: url_,
            headers: {
                'cache-control': 'no-cache',

                'content-type': 'multipart/form-data'
            },
                data: formData
            })
            .then(function (response) {
                /*                 console.log(response); */
                res(response);
            })
            .catch(function (error) {
                console.log(error);
                reg(error);
            });
    });
    return promise;
}

export function Axios_Delete(url) {
    let promise = new Promise((res, reg) => {
        axios
            .delete(url)
            .then(function (response) {
                /*                 console.log(response); */
                res(response);
            })
            .catch(function (error) {
                console.log(error);
                reg(error);
            });
    });
    return promise;
}

export function Axios_Patch(url, dati) {
    let promise = new Promise((res, reg) => {
        axios
            .post(url, dati )
            .then(function (response) {
                /*                 console.log(response); */
                res(response);
            })
            .catch(function (error) {
                console.log(error);
                reg(error);
            });
    });
    return promise;
}

export function Axios_Put(url, dati) {
    let promise = new Promise((res, reg) => {
        axios
            .put(url, dati)
            .then(function (response) {
                /*                 console.log(response); */
                res(response);
            })
            .catch(function (error) {
                console.log(error);
                reg(error);
            });
    });
    return promise;
}
