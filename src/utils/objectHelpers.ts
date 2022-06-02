export const updateObjectInArray = (
  items: any[],
  item_ID: number,
  objPropName: string,
  newObjProps: any
): any[] => {
  return items.map((i: any) => i[objPropName] === item_ID ? {...i, ...newObjProps} : i);
};
