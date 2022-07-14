class DataManager {
    getData() {
        return JSON.parse(localStorage.getItem('leetcode-memo'));
    }

    saveData() {

    }
}

export default new DataManager();