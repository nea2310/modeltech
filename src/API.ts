const API = {
  fetchDataFromMock: async (period: string) =>
    fetch(`http://localhost:3000/entries/${period}.json`),

  fetchDataFromFile: async (period: string) => fetch(`/data/${period}.xlsx`),
};

export { API };
