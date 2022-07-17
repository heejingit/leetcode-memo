class DataManager {
    getData() {
        return JSON.parse(localStorage.getItem('leetcode-memo'));
    }

    saveData(data) {
        return localStorage.setItem("leetcode-memo", JSON.stringify(data));
    }

    deleteData() {
        return localStorage.removeItem('leetcode-memo');
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
        let data = this.getData();
        if (data.length == 1) return this.deleteData();
        
        return this.saveData(data.filter(item => item.id != id));
    }
}

export default new DataManager();