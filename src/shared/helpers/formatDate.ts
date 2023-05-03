const formatDate = (dateString: number) => {
  const date = new Date(Date.UTC(1900, 0, dateString - 1));
  return date.toLocaleDateString('ru-RU');
};

export { formatDate };
