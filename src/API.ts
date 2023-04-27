const FirebaseAPI = {
  fetchData: async (period: string) =>
    fetch(`http://localhost:3000/entries/${period}.json`),
};

export { FirebaseAPI };
