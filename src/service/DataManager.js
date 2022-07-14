class DataManager {
    getData() {
        return JSON.parse(localStorage.getItem('leetcode-memo'));
    }

    saveData(data) {
        return localStorage.setItem("leetcode-memo", JSON.stringify(data));
    }
}

export default new DataManager();