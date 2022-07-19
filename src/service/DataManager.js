class DataManager {
    getData() {
        return JSON.parse(localStorage.getItem('leetcode-memo'));
    }

    saveData(isNew, item, data) {
        if (isNew) {
            data.push(item);
        } else if (!isNew) {
            data = data.map(t => {
                let temp = Object.assign({}, t);
                if (temp.id === item.id) {
                    temp.title = item.title;
                    temp.link = item.link;
                    temp.difficulty = item.difficulty;
                    temp.timeSpent = item.timeSpent;
                    temp.category = item.category;
                    temp.note = item.note;
                    temp.personalDifficulty = item.personalDifficulty;
                    temp.isFavourite = item.isFavourite;
                }
                return temp;
            })
        }
        return this.setLocalStorage(data);
    }

    setLocalStorage(data) {
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
        
        return this.setLocalStorage(data.filter(item => item.id != id));
    }
}

export default new DataManager();