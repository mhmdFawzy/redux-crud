export const uploadImg = (e, setValue) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    setValue('ItemImgUrl', e.target.result);
  };
  reader.readAsDataURL(e.target.files[0]);
};
