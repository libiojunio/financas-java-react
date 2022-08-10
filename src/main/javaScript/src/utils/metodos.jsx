export const formatarArrayDeStrings = (campos) => {
  let camposFormatados = '';
  campos.forEach((campo, index) => {
    if (campos.length === 1) {
      camposFormatados = `'${campo}'`;
    }
    else {
      if (index + 1 === campos.length) {
        camposFormatados += ` e '${campo}'`;
      }
      else if (index + 1 === campos.length - 1) {
        camposFormatados += `'${campo}'`;
      }
      else {
        camposFormatados += `'${campo}, '`;
      }
    }
  });
  return camposFormatados;
};



