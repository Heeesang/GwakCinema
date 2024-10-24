export const formatTitle = (title: string) => {
    return title
      .replace(/!HS/g, "")
      .replace(/!HE/g, "")
      .replace(/^\s+|\s+$/g, "")
      .replace(/ +/g, " ")
      .toLowerCase();
  };