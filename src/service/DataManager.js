class DataManager {
    getData() {
        return JSON.parse(localStorage.getItem('leetcode-memo'));
    }

    saveData(data) {
        return localStorage.setItem("leetcode-memo", JSON.stringify(data));
    }

    setFavourite(id, status) {
        if (!id) return;
        return this.saveData(this.getData().map(item => {
            let temp = Object.assign({}, item);
            if (temp.id === id) {
                temp.isFavourite = status;
            }
            return temp;
        }));
    }

    delete(id) {
        if (!id) return;
        console.log(id);
        return this.saveData(this.getData().map((item, i) => {
            let temp = Object.assign({}, item);
            if (temp.id === id) {
                delete temp[i];
            }
            return temp;
        }));
    }
}

export default new DataManager();