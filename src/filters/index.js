export function getSex(data){
    switch (data) {
      case 'man':
        return '男';
      case 'woman':
        return '女';
      default:
        return data;
    }
  };

