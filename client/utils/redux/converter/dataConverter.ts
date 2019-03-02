export const convertToClient = (data: any): any => {
  if (data instanceof Array) {
    return data.map(convertToClient);
  }

  if (typeof data === "object") {
    const result: any = {};
    Object.keys(data).map((key: any) => {
      result[key] = convertToClient(data[key]);
    });

    return result;
  }

  return data;
};
